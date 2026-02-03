import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Layout, FileText, Settings, CheckCircle } from 'lucide-react';
import './Services.css';

gsap.registerPlugin(ScrollTrigger);

const ServiceCard = ({ title, icon: Icon, items, className = "", index }) => {
    const cardRef = useRef(null);
    // Remove complex state rotation to avoid re-renders, use GSAP quickTo or performant inline styles
    // But for now, simple state is okay if items are few. Let's optimize with direct DOM manipulation.

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Update CSS variables for glow
        cardRef.current.style.setProperty("--mouse-x", `${x}px`);
        cardRef.current.style.setProperty("--mouse-y", `${y}px`);

        // Calculate rotation
        const xPct = (x / rect.width) - 0.5;
        const yPct = (y / rect.height) - 0.5;

        // Direct transform for performance
        const rotateX = -yPct * 8; // Max 4 deg tilt
        const rotateY = xPct * 8;

        // Apply transform carefully so we don't overwrite the scroll trigger transform if simultaneous? 
        // Actually, ScrollTrigger usually animates 'from' state. Once complete, we can interactive tilt.
        // To mix them, we put the tilt on an inner container OR use GSAP to set it.
        gsap.to(cardRef.current, {
            transformPerspective: 1000,
            rotationX: rotateX,
            rotationY: rotateY,
            duration: 0.1,
            ease: "power1.out"
        });
    };

    const handleMouseLeave = () => {
        gsap.to(cardRef.current, {
            rotationX: 0,
            rotationY: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.5)"
        });
    };

    return (
        <div
            className={`service-card ${className}`}
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div className="service-card__glow" />
            <div className="service-card__content">
                <div className="service-card__header">
                    <div className="service-icon-wrapper">
                        <Icon size={32} className="service-icon" />
                    </div>
                    <h3 className="service-title">{title}</h3>
                </div>

                <ul className="service-list">
                    {items.map((item, idx) => (
                        <li key={idx} className="service-item">
                            <CheckCircle size={18} className="service-check" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const Services = () => {
    const sectionRef = useRef(null);
    const gridRef = useRef(null);

    useEffect(() => {
        const grid = gridRef.current;
        const cards = grid.children;

        // Reset initial state
        gsap.set(cards, { clearProps: "all" });

        // Staggered Entrance
        // We use a simpler toggleAction to ensure it stays visible
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%", // Triggers when top of section hits 70% viewport
                end: "bottom center",
                toggleActions: "play none none reverse", // Play on entry, reverse on exit up
            }
        });

        tl.fromTo(cards,
            {
                y: 100,
                opacity: 0,
                rotateX: 45, // Dramatic starting angle
                scale: 0.8
            },
            {
                rotateX: 0, // Flattens out
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.15,
                ease: "back.out(1.5)", // Bouncy entry
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    end: "top 40%",
                    scrub: 1,
                }
            }
        );

        // 2. Continuous "Floating" Parallax as you continue scrolling
        // As you scroll past, the grid tilts slightly forward (3D z-axis move)
        gsap.to(grid, {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 40%", // after it flattened
                end: "bottom top",
                scrub: 1,
            },
            rotateX: -5, // Slight forward tilt
            z: 50, // Moves closer to camera
            ease: "none"
        });

    }, []);

    const servicesData = [
        {
            title: "Local SEO for Dentists",
            icon: MapPin,
            items: [
                "Google Business Profile",
                "Local keyword targeting",
                "NAP consistency",
                "Google Maps ranking"
            ],
            className: "service-card--accent"
        },
        {
            title: "On-Page Optimization",
            icon: Layout,
            items: [
                "Dentist-specific keywords",
                "Service page optimization",
                "Mobile & Speed optimization",
                "SEO content structure"
            ]
        },
        {
            title: "Content Marketing",
            icon: FileText,
            items: [
                "Patient education content",
                "Location dental pages",
                "Treatment focused copy",
                "Trust building articles"
            ]
        },
        {
            title: "Technical SEO",
            icon: Settings,
            items: [
                "Website SEO audit",
                "Core Web Vitals check",
                "Indexing & Crawl fix",
                "Secure site setup"
            ],
            className: "service-card--dark"
        }
    ];

    return (
        <section className="services-section" id="our-services" ref={sectionRef}>
            <div className="services-bg">
                <div className="services-blob blob-1"></div>
                <div className="services-blob blob-2"></div>
            </div>

            <div className="container">
                <div className="services__header">
                    <span className="services__subtitle">Complete Solution</span>
                    <h2 className="services__title">
                        Dental SEO Services
                    </h2>
                    <p style={{ color: '#475569', fontSize: '1.25rem', marginTop: '1rem' }}>
                        Smart strategies for sustainable growth.
                    </p>
                </div>

                <div className="services-grid-stage">
                    <div className="services-grid" ref={gridRef}>
                        {servicesData.map((service, index) => (
                            <ServiceCard
                                key={index}
                                index={index}
                                {...service}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
