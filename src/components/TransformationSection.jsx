import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';
import './TransformationSection.css';

// --- Components ---

const CountUp = ({ to, prefix = '', suffix = '' }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: false, margin: "-20px" });
    const spring = useSpring(0, { stiffness: 50, damping: 20 });
    const rounded = useTransform(spring, (latest) => Math.floor(latest));

    useEffect(() => {
        if (inView) {
            spring.set(to);
        } else {
            spring.jump(0);
        }
    }, [inView, spring, to]);

    const [displayValue, setDisplayValue] = useState(prefix + "0" + suffix);

    useEffect(() => {
        return rounded.on("change", (latest) => {
            setDisplayValue(prefix + latest.toLocaleString() + suffix);
        });
    }, [rounded, prefix, suffix]);

    return <span ref={ref}>{displayValue}</span>;
};

const TransformationCard = ({ title, subtitle, icon, before, after, chartData, color, delay }) => {
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: false, margin: "-50px" });

    return (
        <motion.div
            ref={cardRef}
            className="trans-card"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: delay }}
        >
            <div className="trans-card__header">
                <div className={`trans-card__icon-box trans-card__icon-box--${color}`}>
                    {icon}
                </div>
                <div className="trans-card__titles">
                    <h3 className="trans-card__title">{title}</h3>
                    <p className="trans-card__subtitle">{subtitle}</p>
                </div>
            </div>

            <div className="trans-card__comparison">
                <div className="trans-card__metric trans-card__metric--before">
                    <span className="trans-card__label">BEFORE</span>
                    <span className="trans-card__value">{before}</span>
                </div>

                <div className="trans-card__arrow">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </div>

                <div className={`trans-card__metric trans-card__metric--after trans-card__metric--${color}`}>
                    <span className="trans-card__label">AFTER</span>
                    <span className="trans-card__value">
                        {typeof after === 'number' ? (
                            <CountUp to={after} />
                        ) : (
                            after
                        )}
                    </span>
                </div>
            </div>

            <div className="trans-card__chart">
                <ResponsiveContainer width="100%" height={60}>
                    {isInView && (
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={`var(--color-${color})`} stopOpacity={0.3} />
                                    <stop offset="95%" stopColor={`var(--color-${color})`} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke={`var(--color-${color})`}
                                fillOpacity={1}
                                fill={`url(#gradient-${color})`}
                                strokeWidth={2}
                                isAnimationActive={true}
                                animationDuration={2000}
                            />
                        </AreaChart>
                    )}
                </ResponsiveContainer>
                <div className={`trans-card__badge trans-card__badge--${color}`}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                        <polyline points="17 6 23 6 23 12"></polyline>
                    </svg>
                    <span>Growth</span>
                </div>
            </div>
        </motion.div>
    );
};

const TransformationSection = () => {
    // Mock Data for Charts
    const trafficData = [
        { value: 200 }, { value: 300 }, { value: 250 }, { value: 600 }, { value: 900 }, { value: 1200 }, { value: 1500 }
    ];
    const rankingData = [
        { value: 10 }, { value: 8 }, { value: 12 }, { value: 5 }, { value: 3 }, { value: 2 }, { value: 1 }
    ]; // Inverted visual logic usually for ranks, but area chart goes up implies 'better' for this visual
    const mapsData = [
        { value: 0 }, { value: 0 }, { value: 1 }, { value: 1 }, { value: 2 }, { value: 3 }, { value: 3 }
    ];
    const inquiryData = [
        { value: 5 }, { value: 8 }, { value: 15 }, { value: 22 }, { value: 30 }, { value: 35 }, { value: 40 }
    ];

    return (
        <section className="transformation-section">
            <div className="container">
                <div className="transformation-header">
                    <span className="transformation-pill">Real Results</span>
                    <h2 className="transformation-title">
                        Before & After <span className="gradient-text">Transformation</span>
                    </h2>
                    <p className="transformation-subtitle">
                        Typical results from dental practices we've helped scale using our proprietary SEO frameworks.
                    </p>
                </div>

                <div className="transformation-grid">
                    {/* Card 1: Google Rankings */}
                    <TransformationCard
                        title="Google Rankings"
                        subtitle="For key dental keywords in Chicago"
                        color="blue"
                        delay={0.1}
                        icon={
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        }
                        before="Page 5+"
                        after="Page 1"
                        chartData={rankingData.map(d => ({ value: 10 - d.value }))} /* Visual fix: rising graph for better rank */
                    />

                    {/* Card 2: Organic Traffic */}
                    <TransformationCard
                        title="Organic Traffic"
                        subtitle="Monthly website visitors"
                        color="purple"
                        delay={0.2}
                        icon={
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                                <polyline points="17 6 23 6 23 12"></polyline>
                            </svg>
                        }
                        before="200/mo"
                        after="1,500/mo"
                        chartData={trafficData}
                    />

                    {/* Card 3: Maps Visibility */}
                    <TransformationCard
                        title="Maps Visibility"
                        subtitle="Appearing in Google Maps top 3"
                        color="indigo"
                        delay={0.3}
                        icon={
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                        }
                        before="Not visible"
                        after="3-Pack"
                        chartData={mapsData}
                    />

                    {/* Card 4: Patient Inquiries */}
                    <TransformationCard
                        title="Patient Inquiries"
                        subtitle="Monthly contact form submissions"
                        color="green"
                        delay={0.4}
                        icon={
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>
                        }
                        before="5/mo"
                        after="40/mo"
                        chartData={inquiryData}
                    />
                </div>


            </div>
        </section>
    );
};

export default TransformationSection;
