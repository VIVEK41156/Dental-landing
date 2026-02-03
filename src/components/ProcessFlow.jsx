import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, PenTool, Layout, BarChart } from 'lucide-react';
import './ProcessFlow.css';

gsap.registerPlugin(ScrollTrigger);

const ProcessFlow = () => {
    const sectionRef = useRef(null);
    const pathRef = useRef(null);

    const processSteps = [
        {
            id: "01",
            title: "Free Dental SEO Audit",
            description: "Identify ranking gaps, local visibility issues, and missed patient opportunities.",
            icon: Search,
            color: "from-pink-500 to-rose-500"
        },
        {
            id: "02",
            title: "Custom Dental SEO Strategy",
            description: "Tailored plan based on your services, competition, and location.",
            icon: PenTool,
            color: "from-purple-500 to-indigo-500"
        },
        {
            id: "03",
            title: "Implementation & Optimization",
            description: "On-page, local, content, and technical SEO execution.",
            icon: Layout,
            color: "from-blue-500 to-cyan-500"
        },
        {
            id: "04",
            title: "Monthly Tracking & Reporting",
            description: "Clear reports showing traffic, rankings, and inquiries.",
            icon: BarChart,
            color: "from-teal-400 to-emerald-500"
        }
    ];

    useEffect(() => {
        const section = sectionRef.current;
        const path = pathRef.current;
        const pathLength = path.getTotalLength();

        // Ref to store the GSAP context for cleanup
        let ctx = gsap.context(() => {
            // Set initial path state (hidden)
            gsap.set(path, {
                strokeDasharray: pathLength,
                strokeDashoffset: pathLength
            });

            // Set initial card states (hidden) - vital for the timeline 'fromTo' to work cleanly
            gsap.set(".process-card", {
                opacity: 0,
                scale: 0.8,
                y: 50
            });

            // MASTER TIMELINE - Controls everything based on scroll percentage
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top center", // Start when section hits center of viewport
                    end: "bottom bottom", // End when bottom of section hits bottom
                    scrub: 1, // Smoothly scrub the playhead based on scroll
                }
            });

            // 1. Draw the Path (The "Liquid Line")
            // This runs for the entire duration of the timeline (e.g. 0 to 10 seconds relative time)
            tl.to(path, {
                strokeDashoffset: 0,
                ease: "none",
                duration: 10
            });

            // 2. Reveal Cards at specific points along the path
            // We insert these animations at absolute times in the timeline to sync with the line passing them

            // Step 1: Left (Starts early, e.g. at 1s)
            tl.to(".card-pink", {
                opacity: 1, scale: 1, y: 0, duration: 1, ease: "back.out(1.5)"
            }, 0.5);

            // Step 2: Right (Starts around 35% down the section)
            tl.to(".card-purple", {
                opacity: 1, scale: 1, y: 0, duration: 1, ease: "back.out(1.5)"
            }, 3.5);

            // Step 3: Left (Starts around 65% down)
            tl.to(".card-blue", {
                opacity: 1, scale: 1, y: 0, duration: 1, ease: "back.out(1.5)"
            }, 6.5);

            // Step 4: Center (Starts near end, around 90%)
            tl.to(".card-teal", {
                opacity: 1, scale: 1, y: 0, duration: 1, ease: "back.out(1.5)"
            }, 9);

        }, sectionRef); // Scope to section

        return () => ctx.revert(); // Cleanup on unmount

    }, []);

    return (
        <section className="process-section" id="process-section" ref={sectionRef}>
            <div className="container relative">
                <h2 className="process-header">Our SEO <span className="gradient-text">Process</span></h2>

                <div className="process-container">
                    {/* SVG Path Background */}
                    <div className="svg-container">
                        <svg viewBox="0 0 600 1200" fill="none" preserveAspectRatio="xMidYMin meet">
                            <defs>
                                <linearGradient id="gradientFlow" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#ec4899" /> {/* Pink */}
                                    <stop offset="50%" stopColor="#8b5cf6" /> {/* Purple */}
                                    <stop offset="100%" stopColor="#3b82f6" /> {/* Blue */}
                                </linearGradient>
                                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                    <feGaussianBlur stdDeviation="5" result="blur" />
                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                </filter>
                            </defs>
                            {/* The Snake Path */}
                            <path
                                ref={pathRef}
                                d="M300,0 
                               C300,100 100,100 100,250 
                               C100,400 500,400 500,550
                               C500,700 100,700 100,850
                               C100,1000 300,1000 300,1200"
                                stroke="url(#gradientFlow)"
                                strokeWidth="12"
                                strokeLinecap="round"
                                fill="none"
                                filter="url(#glow)"
                            />
                        </svg>
                    </div>

                    {/* Cards anchored to the path */}
                    {/* Step 1: Left */}
                    <div className="process-step step-left" style={{ top: '100px' }}>
                        <div className="process-card card-pink">
                            <div className="step-number">01</div>
                            <div className="card-icon"><Search size={28} /></div>
                            <h3>Free Dental SEO Audit</h3>
                            <p>Identify ranking gaps, local visibility issues, and missed patient opportunities.</p>
                        </div>
                    </div>

                    {/* Step 2: Right */}
                    <div className="process-step step-right" style={{ top: '400px' }}>
                        <div className="process-card card-purple">
                            <div className="step-number">02</div>
                            <div className="card-icon"><PenTool size={28} /></div>
                            <h3>Custom Dental SEO Strategy</h3>
                            <p>Tailored plan based on your services, competition, and location.</p>
                        </div>
                    </div>

                    {/* Step 3: Left */}
                    <div className="process-step step-left" style={{ top: '700px' }}>
                        <div className="process-card card-blue">
                            <div className="step-number">03</div>
                            <div className="card-icon"><Layout size={28} /></div>
                            <h3>Implementation & Optimization</h3>
                            <p>On-page, local, content, and technical SEO execution.</p>
                        </div>
                    </div>

                    {/* Step 4: Center/Bottom */}
                    <div className="process-step step-center" style={{ top: '1000px' }}>
                        <div className="process-card card-teal">
                            <div className="step-number">04</div>
                            <div className="card-icon"><BarChart size={28} /></div>
                            <h3>Monthly Tracking & Reporting</h3>
                            <p>Clear reports showing traffic, rankings, and inquiries.</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ProcessFlow;
