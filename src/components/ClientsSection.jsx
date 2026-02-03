import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Stethoscope, Gem, Smile, Activity, Component } from 'lucide-react';
import './ClientsSection.css';

gsap.registerPlugin(ScrollTrigger);

const clients = [
    {
        id: 1,
        title: "General Dentists",
        icon: Stethoscope,
        color: "linear-gradient(135deg, #3b82f6, #2563eb)",
        desc: "Comprehensive family care"
    },
    {
        id: 2,
        title: "Cosmetic Dentists",
        icon: Gem,
        color: "linear-gradient(135deg, #ec4899, #be185d)",
        desc: "Smile makeovers & veneers"
    },
    {
        id: 3,
        title: "Pediatric Dentists",
        icon: Smile,
        color: "linear-gradient(135deg, #f59e0b, #d97706)",
        desc: "Child-friendly practices"
    },
    {
        id: 4,
        title: "Orthodontists",
        icon: Component, // Abstract for braces
        color: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
        desc: "Aligners & braces"
    },
    {
        id: 5,
        title: "Implant & Emergency",
        icon: Activity,
        color: "linear-gradient(135deg, #ef4444, #dc2626)",
        desc: "Urgent care & surgery"
    }
];

const ClientsSection = () => {
    const sectionRef = useRef(null);
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        const container = scrollContainerRef.current;

        // Note: We need a wrapper to pin, and move the internal container
        // Calculated width: (Card Width + Gap) * Count
        // But simpler: just move X percent based on content

        // For horizontal scroll to work with Pinning, we need to know how far to move
        // We'll move the container to the left by (totalWidth - viewportWidth)

        const totalWidth = container.scrollWidth;
        const viewportWidth = window.innerWidth;
        const xMovement = -(totalWidth - viewportWidth + 100); // +100 for padding

        // Only enable if content overflows (desktop typically)
        if (window.innerWidth > 768) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    pin: true,
                    scrub: 1,
                    start: "top top",
                    end: "+=2000", // Scroll distance to complete animation
                    anticipatePin: 1
                }
            });

            tl.to(container, {
                x: xMovement,
                ease: "none"
            });

            // 3D Tilt Effect on cards as they move
            gsap.utils.toArray('.client-card').forEach((card, i) => {
                gsap.fromTo(card,
                    { rotateY: -15, opacity: 0.8 },
                    {
                        rotateY: 0,
                        opacity: 1,
                        scrollTrigger: {
                            trigger: card,
                            containerAnimation: tl, // Link to horizontal scroll
                            start: "left center",
                            toggleActions: "play reverse play reverse"
                        }
                    }
                )
            });
        }

    }, []);

    return (
        <section className="clients-section" ref={sectionRef}>
            <div className="clients-header-wrapper">
                <h2 className="clients-title">Who We <span className="highlight-text">Work With</span></h2>
                <p className="clients-subtitle">Solo practices and multi-location dental groups are welcome.</p>
            </div>

            <div className="horizontal-scroll-wrapper" ref={scrollContainerRef}>
                {clients.map((client) => (
                    <div key={client.id} className="client-card">
                        <div className="client-card-inner" style={{ background: client.color }}>
                            <div className="client-icon-box">
                                <client.icon size={48} color="white" strokeWidth={1.5} />
                            </div>
                            <h3 className="client-name">{client.title}</h3>
                            <p className="client-desc">{client.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Mobile Scroll Hint */}
            <div className="mobile-scroll-hint">
                <span>Try horizontal scroll →</span>
            </div>
        </section>
    );
};

export default ClientsSection;
