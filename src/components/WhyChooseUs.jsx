import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaTrophy, FaMapMarkedAlt, FaEye, FaCoins } from 'react-icons/fa';
import './WhyChooseUs.css';

gsap.registerPlugin(ScrollTrigger);

const WhyChooseUs = () => {
    const sectionRef = useRef(null);
    const pathRef = useRef(null);
    const mobilePathRef = useRef(null);

    // Original Why Choose Us Content
    const features = [
        {
            id: 1,
            title: "Rank High",
            desc: "For targeted keywords & service-based searches.",
            icon: FaTrophy,
            color: "from-pink-500 to-rose-500", // Process Flow Pink Theme
            borderColor: "#ec4899"
        },
        {
            id: 2,
            title: "Google Maps",
            desc: "Appear in top local results for immediate visibility.",
            icon: FaMapMarkedAlt,
            color: "from-purple-500 to-indigo-500", // Process Flow Purple Theme
            borderColor: "#8b5cf6"
        },
        {
            id: 3,
            title: "Active Visibility",
            desc: "Be seen by patients actively searching for dental care.",
            icon: FaEye,
            color: "from-blue-500 to-cyan-500", // Process Flow Blue Theme
            borderColor: "#3b82f6"
        },
        {
            id: 4,
            title: "Cost Efficient",
            desc: "Reduce long-term marketing costs with organic growth.",
            icon: FaCoins,
            color: "from-teal-400 to-emerald-500", // Process Flow Teal Theme
            borderColor: "#10b981"
        }
    ];

    useEffect(() => {
        const section = sectionRef.current;
        const path = pathRef.current;
        const mobilePath = mobilePathRef.current;
        const pathLength = path.getTotalLength();
        const mobilePathLength = mobilePath ? mobilePath.getTotalLength() : 1000;

        let ctx = gsap.context(() => {
            // Initial State: Hide Path & Cards
            gsap.set(path, { strokeDasharray: pathLength, strokeDashoffset: pathLength });
            if (mobilePath) {
                gsap.set(mobilePath, { strokeDasharray: mobilePathLength, strokeDashoffset: mobilePathLength });
            }
            gsap.set(".wcu-card", { opacity: 0, scale: 0.8, y: 50, rotationX: 45, transformOrigin: "top center" });

            // MASTER TIMELINE
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top center",
                    end: "bottom bottom",
                    scrub: 1,
                }
            });

            // 1. Draw Lines (Both Desktop & Mobile)
            tl.to([path, mobilePath], {
                strokeDashoffset: 0,
                ease: "none",
                duration: 10
            });

            // 2. Pop Cards Sequence - Synced with Line Progress
            // Line Duration = 10s
            // Card Centers approx at: 12.5%, 37.5%, 62.5%, 87.5%

            // Card 1
            tl.to(".card-1", { opacity: 1, scale: 1, y: 0, rotationX: 0, duration: 0.8, ease: "back.out(1.5)" }, 0.5);

            // Card 2
            tl.to(".card-2", { opacity: 1, scale: 1, y: 0, rotationX: 0, duration: 0.8, ease: "back.out(1.5)" }, 3.0);

            // Card 3
            tl.to(".card-3", { opacity: 1, scale: 1, y: 0, rotationX: 0, duration: 0.8, ease: "back.out(1.5)" }, 5.5);

            // Card 4
            tl.to(".card-4", { opacity: 1, scale: 1, y: 0, rotationX: 0, duration: 0.8, ease: "back.out(1.5)" }, 8.0);

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="wcu-section" ref={sectionRef}>
            <div className="wcu-container">
                <h2 className="wcu-header">Why Dentists Choose <span className="gradient-text">DigitmarketUS</span>?</h2>
                <p className="wcu-subheader">
                    Most patients search Google before booking a dentist. If your practice doesn't appear on Page 1 or in Google Maps, those patients choose another clinic.
                </p>

                {/* Horizontal Flow Container */}
                <div className="wcu-flow-track">

                    {/* SVG Line Layer - Desktop Horizontal */}
                    <div className="wcu-svg-layer desktop-svg">
                        <svg viewBox="0 0 1200 200" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="wcuGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#ec4899" />
                                    <stop offset="33%" stopColor="#8b5cf6" />
                                    <stop offset="66%" stopColor="#3b82f6" />
                                    <stop offset="100%" stopColor="#10b981" />
                                </linearGradient>
                                <linearGradient id="wcuGradientVertical" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#ec4899" />
                                    <stop offset="33%" stopColor="#8b5cf6" />
                                    <stop offset="66%" stopColor="#3b82f6" />
                                    <stop offset="100%" stopColor="#10b981" />
                                </linearGradient>
                                <filter id="wcuGlow" x="-20%" y="-20%" width="140%" height="140%">
                                    <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                                    <feComposite in="SourceGraphic" in2="coloredBlur" operator="over" />
                                    <feDropShadow dx="0" dy="5" stdDeviation="3" floodOpacity="0.3" />
                                </filter>
                            </defs>
                            {/* Horizontal Wave Path */}
                            <path
                                ref={pathRef}
                                d="M0,100 C150,40 450,160 600,100 C750,40 1050,160 1200,100"
                                stroke="url(#wcuGradient)"
                                strokeWidth="12"
                                fill="none"
                                strokeLinecap="round"
                                filter="url(#wcuGlow)"
                            />
                        </svg>
                    </div>

                    {/* SVG Line Layer - Mobile Vertical */}
                    <div className="wcu-svg-layer mobile-svg">
                        <svg viewBox="0 0 100 1200" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="wcuGradientVerticalMobile" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#ec4899" />
                                    <stop offset="33%" stopColor="#8b5cf6" />
                                    <stop offset="66%" stopColor="#3b82f6" />
                                    <stop offset="100%" stopColor="#10b981" />
                                </linearGradient>
                                <filter id="wcuGlowMobile" x="-50%" y="-20%" width="200%" height="140%">
                                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                                    <feComposite in="SourceGraphic" in2="coloredBlur" operator="over" />
                                    <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3" />
                                </filter>
                            </defs>
                            {/* Vertical Wave Path - Adjusted to start/end at card centers */}
                            <path
                                ref={mobilePathRef}
                                d="M50,150 C90,250 10,350 50,450 C90,550 10,650 50,750 C90,850 10,950 50,1050"
                                stroke="url(#wcuGradientVerticalMobile)"
                                strokeWidth="8"
                                fill="none"
                                strokeLinecap="round"
                                filter="url(#wcuGlowMobile)"
                            />
                        </svg>
                    </div>

                    {/* Cards Layer - Flex Row */}
                    <div className="wcu-cards-row">
                        {features.map((feature, index) => (
                            <div key={feature.id} className={`wcu-card card-${index + 1}`}>
                                <div className="wcu-icon-box" style={{ borderColor: feature.borderColor }}>
                                    <feature.icon className="wcu-icon" />
                                </div>
                                <h3>{feature.title}</h3>
                                <p>{feature.desc}</p>
                            </div>
                        ))}
                    </div>

                </div>

                <div className="wcu-footer-text">
                    Digitmarketus SEO Service delivers sustainable, long-term visibility compared to short term paid advertising.
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
