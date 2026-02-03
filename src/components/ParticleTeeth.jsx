import { useMemo, useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { TextureLoader } from 'three';

const ParticleTeeth = () => {
    const pointsRef = useRef();
    // Load the new high-res image
    const texture = useLoader(TextureLoader, '/teeth-high-res.png');

    // Generate particles from the image
    const { positions, colors } = useMemo(() => {
        const img = texture.image;
        const canvas = document.createElement('canvas');
        const width = img.width;
        const height = img.height;

        // HIGH DENSITY: Sample every 2nd pixel for "boosted" detail
        const step = 2;

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.scale(1, -1); // Flip Y to match 3D space
        ctx.drawImage(img, 0, -height);
        const data = ctx.getImageData(0, 0, width, height).data;

        const pos = [];
        const cols = [];

        // Center offsets
        const cx = width / 2;
        const cy = height / 2;

        for (let y = 0; y < height; y += step) {
            for (let x = 0; x < width; x += step) {
                const i = (x + y * width) * 4;
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                const a = data[i + 3];

                if (a > 50) {
                    // Brightness = Depth info (approximate 3D shape)
                    // The brighter the pixel, the "closer" it is
                    const brightness = (r + g + b) / 765; // 0 to 1

                    const pX = (x - cx) * 0.012; // Scale down slightly
                    const pY = -(y - cy) * 0.012;

                    // BOOSTED DEPTH: Use brightness to extrude
                    // + Curve: Wrap it around a cylinder slightly for 3D realism
                    const curveOptions = (x - cx) / width; // -0.5 to 0.5
                    const cylindricalCurve = Math.cos(curveOptions * Math.PI) * 1.5;

                    // Z = Brightness extrusion + Jaw Curve
                    const pZ = (brightness * 1.5) + cylindricalCurve;

                    pos.push(pX, pY, pZ);

                    // Color: Use original for realism
                    const color = new THREE.Color(`rgb(${r},${g},${b})`);
                    cols.push(color.r, color.g, color.b);
                }
            }
        }

        return {
            positions: new Float32Array(pos),
            colors: new Float32Array(cols)
        };
    }, [texture]);

    // Animation loop
    useFrame((state) => {
        if (pointsRef.current) {
            const t = state.clock.elapsedTime;
            // Sophisticated, slow rotation
            pointsRef.current.rotation.y = Math.sin(t * 0.15) * 0.4;
            // Gentle floating
            pointsRef.current.position.y = Math.sin(t * 0.4) * 0.1;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={colors.length / 3}
                    array={colors}
                    itemSize={3}
                />
            </bufferGeometry>
            {/* Fine, opaque particles for solid, high-fidelity look */}
            <pointsMaterial
                size={0.025}
                vertexColors
                transparent={false}
                opacity={1}
                sizeAttenuation
                depthWrite={true}
            />
        </points>
    );
};

export default ParticleTeeth;
