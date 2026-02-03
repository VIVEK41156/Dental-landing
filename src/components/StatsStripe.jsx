import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import './StatsStripe.css';

gsap.registerPlugin(ScrollTrigger);

const statsData = [
    { id: 1, value: 1000, suffix: '+', label: 'SEO Projects Completed' },
    { id: 2, value: 780, suffix: '+', label: 'Websites Ranked on Page 1' },
    { id: 3, value: 95, suffix: '%', label: 'Client Satisfaction Rate' },
    { id: 4, value: 25, suffix: '+', label: 'Years of SEO Experience' },
];

const StatsStripe = () => {
    const containerRef = useRef(null);
    const itemsRef = useRef([]);

    useEffect(() => {
        const container = containerRef.current;

        // Animation for container fade in
        gsap.fromTo(container,
            { opacity: 0, y: 50 },
            {
                scrollTrigger: {
                    trigger: container,
                    start: "top 85%",
                    toggleActions: "restart none restart reverse"
                },
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out"
            }
        );

        // Animation for counting numbers
        itemsRef.current.forEach((item, index) => {
            if (!item) return;

            const numberEl = item.querySelector('.stats-stripe__number-value');
            const targetValue = statsData[index].value;

            // Create a proxy object to tween
            const proxy = { value: 0 };

            gsap.to(proxy, {
                value: targetValue,
                duration: 2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: container,
                    start: "top 85%",
                    toggleActions: "restart none restart reset"
                },
                onUpdate: () => {
                    // Update the text content with rounded value
                    if (numberEl) {
                        numberEl.textContent = Math.ceil(proxy.value);
                    }
                }
            });
        });

    }, []);

    const addToRefs = (el) => {
        if (el && !itemsRef.current.includes(el)) {
            itemsRef.current.push(el);
        }
    };

    return (
        <section className="stats-stripe" ref={containerRef}>
            <div className="container">
                <div className="stats-stripe__grid">
                    {statsData.map((stat, index) => (
                        <div
                            key={stat.id}
                            className="stats-stripe__item"
                            ref={addToRefs}
                        >
                            <div className="stats-stripe__number">
                                <span className="stats-stripe__number-value">0</span>
                                <span className="stats-stripe__number-suffix">{stat.suffix}</span>
                            </div>
                            <p className="stats-stripe__label">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsStripe;
