import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, Check } from 'lucide-react';
import './TrustSection.css';

gsap.registerPlugin(ScrollTrigger);

const TrustSection = () => {
    const sectionRef = useRef(null);
    const leftColRef = useRef(null);
    const rightColRef = useRef(null);

    useEffect(() => {
        const leftCol = leftColRef.current;
        const rightCol = rightColRef.current;

        // Animate Left Column (Slide In from Left)
        gsap.fromTo(leftCol,
            { x: -50, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    end: "bottom 80%",
                    toggleActions: "play none none reverse",
                },
                x: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out"
            }
        );

        // Animate Right Column (Slide In from Right)
        gsap.fromTo(rightCol,
            { x: 50, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    end: "bottom 80%",
                    toggleActions: "play none none reverse",
                },
                x: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                delay: 0.2 // Slight delay for visual separation
            }
        );

        // Stagger List Items in Right Column
        const listItems = rightCol.querySelectorAll('.trust-item');
        gsap.fromTo(listItems,
            { opacity: 0, x: 20 },
            {
                scrollTrigger: {
                    trigger: rightCol,
                    start: "top 80%",
                },
                opacity: 1,
                x: 0,
                stagger: 0.1,
                duration: 0.6,
                ease: "back.out(1.7)",
                delay: 0.5
            }
        );

    }, []);

    return (
        <section className="trust-section" ref={sectionRef}>
            <div className="container">
                <div className="trust-grid">
                    {/* Left Column: Authority Building */}
                    <div className="trust-col trust-col--left" ref={leftColRef}>
                        <div className="trust-icon-box">
                            <ShieldCheck size={48} className="trust-main-icon" />
                        </div>
                        <h2 className="trust-title">
                            Trust & Authority <br />
                            <span className="text-slate-600">Building</span>
                        </h2>
                        <ul className="authority-list">
                            <li>
                                <div className="dot"></div>
                                <span>Review strategy guidance (ethical only)</span>
                            </li>
                            <li>
                                <div className="dot"></div>
                                <span>E-E-A-T optimization for healthcare</span>
                            </li>
                            <li>
                                <div className="dot"></div>
                                <span>Local authority signals</span>
                            </li>
                        </ul>
                    </div>

                    {/* Right Column: Why Digitmarket US */}
                    <div className="trust-col trust-col--right" ref={rightColRef}>
                        <h3 className="why-us-title">Why <span>Digitmarket US</span></h3>

                        <div className="why-us-list">
                            {[
                                "Dental SEO specialists",
                                "Proven SEO best practices",
                                "No ranking or patient guarantees",
                                "HIPAA-aware content approach",
                                "Transparent reporting & KPIs"
                            ].map((item, index) => (
                                <div key={index} className="trust-item">
                                    <div className="check-circle">
                                        <Check size={16} strokeWidth={3} />
                                    </div>
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="trust-footer">
                            <p>
                                We don’t bundle ads or push shortcuts. Our focus is <strong>long-term organic growth</strong> for dental practices.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrustSection;
