import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { Stethoscope, Gem, Smile, Activity, Component } from 'lucide-react';
import './ClientsRing.css';

gsap.registerPlugin(Draggable);

const clients = [
    {
        id: 1,
        title: "General Dentists",
        icon: Stethoscope,
        desc: "Comprehensive family care",
        color: "linear-gradient(135deg, #3b82f6, #2563eb)"
    },
    {
        id: 2,
        title: "Cosmetic Dentists",
        icon: Gem,
        desc: "Smile makeovers",
        color: "linear-gradient(135deg, #ec4899, #be185d)"
    },
    {
        id: 3,
        title: "Pediatric Dentists",
        icon: Smile,
        desc: "Child-friendly care",
        color: "linear-gradient(135deg, #f59e0b, #d97706)"
    },
    {
        id: 4,
        title: "Orthodontists",
        icon: Component,
        desc: "Aligners & braces",
        color: "linear-gradient(135deg, #8b5cf6, #7c3aed)"
    },
    {
        id: 5,
        title: "Implant Clinics",
        icon: Activity,
        desc: "Surgical solutions",
        color: "linear-gradient(135deg, #ef4444, #dc2626)"
    },
    // Duplicate for fuller ring appearance if needed, 
    // but with 5 items we can just spread them wider or duplicate content
    {
        id: 6,
        title: "Oral Surgeons",
        icon: Activity,
        desc: "Complex procedures",
        color: "linear-gradient(135deg, #10b981, #059669)"
    }
];

const ClientsRing = () => {
    const ringRef = useRef(null);
    const wrapRef = useRef(null);

    useEffect(() => {
        const ring = ringRef.current;
        let rotation = 0;

        // 1. Position Cards in 3D Circle
        const cards = gsap.utils.toArray('.ring-card');
        const count = cards.length;
        const radius = 400; // Distance from center
        const angleStep = 360 / count;

        cards.forEach((card, i) => {
            gsap.set(card, {
                rotationY: i * angleStep,
                translateZ: radius,
                transformOrigin: "50% 50% -400px" // Pivot point is center of ring
            });
        });

        // 2. Make it Draggable (Rotate the Ring)
        Draggable.create(document.createElement("div"), { // Proxy element
            trigger: ".ring-stage",
            type: "x",
            inertia: true,
            onDrag: function () {
                // Map x movement to rotation
                rotation += this.deltaX * 0.5;
                gsap.to(ring, { rotationY: rotation, overwrite: true, duration: 0 });
            },
            onThrowUpdate: function () {
                rotation += this.deltaX * 0.5;
                gsap.to(ring, { rotationY: rotation, overwrite: true, duration: 0 });
            }
        });

        // 3. Auto-Rotate (Slowly)
        const autoSpin = gsap.to(ring, {
            rotationY: "-=360",
            duration: 40,
            repeat: -1,
            ease: "none"
        });

        // Pause on hover/interaction
        const stage = document.querySelector('.ring-stage');
        stage.addEventListener('mousedown', () => autoSpin.pause());
        stage.addEventListener('mouseleave', () => autoSpin.play());
        stage.addEventListener('mouseup', () => autoSpin.play());

    }, []);

    return (
        <section className="clients-ring-section">
            <div className="clients-ring-header">
                <h2>Who We Work With</h2>
                <p>Drag to explore our specialized client types.</p>
            </div>

            <div className="ring-perspective">
                <div className="ring-stage" ref={wrapRef}>
                    <div className="ring-pivot" ref={ringRef}>
                        {clients.map((client) => (
                            <div key={client.id} className="ring-card">
                                <div className="ring-card-inner" style={{ background: client.color }}>
                                    <div className="ring-icon">
                                        <client.icon size={40} color="white" />
                                    </div>
                                    <h3>{client.title}</h3>
                                    <p>{client.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="ring-footer">
                <p>Solo practices and multi-location dental groups are welcome.</p>
            </div>
        </section>
    );
};

export default ClientsRing;
