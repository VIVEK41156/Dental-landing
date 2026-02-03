import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ContactPopup.css';

/**
 * ContactPopup Component
 * Professional 3D animated popup form with bento grid layout
 * Features: Power Automate integration, UTM tracking, service dropdown
 */
const ContactPopup = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        agreedToTerms: false,
        utm_source: '',
        utm_medium: '',
        utm_campaign: '',
        utm_term: '',
        utm_content: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
    const [utmSource, setUtmSource] = useState('');

    // Service options
    const serviceOptions = [
        'Local SEO for Dentists',
        'On-Page SEO Optimization',
        'Dental Content Marketing',
        'Technical SEO',
        'Trust & Authority Building'
    ];

    // Capture UTM source from URL or browser info
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);

        // Get browser info
        const browserInfo = {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language,
            referrer: document.referrer || 'direct'
        };

        // Store browser info for form submission
        setFormData(prev => ({
            ...prev,
            utm_source: urlParams.get('utm_source') || 'direct',
            utm_medium: urlParams.get('utm_medium') || '',
            utm_campaign: urlParams.get('utm_campaign') || '',
            utm_term: urlParams.get('utm_term') || '',
            utm_content: urlParams.get('utm_content') || '',
            browserInfo: JSON.stringify(browserInfo)
        }));

        setUtmSource(urlParams.get('utm_source') || 'direct');
    }, []);

    // Close popup on Escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    // Prevent body scroll when popup is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            // Power Automate webhook URL (placeholder - user will update later)
            // Power Automate webhook URL
            const webhookUrl = 'https://default08423cbb15b24cc9a5a6b7b2701a47.2b.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/5a33e7f9a71e4e7a90c513c74b564157/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Yqhd34Oka_pOrg1AT2DPj5vzFV0IZ3lPBh9N37YIZAM';

            // Prepare submission data
            const submissionData = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                service: formData.service,
                agreedToTerms: formData.agreedToTerms,
                utm_source: formData.utm_source,
                utm_medium: formData.utm_medium,
                utm_campaign: formData.utm_campaign,
                utm_term: formData.utm_term,
                utm_content: formData.utm_content,
                browserInfo: formData.browserInfo,
                timestamp: new Date().toISOString(),
                source: 'Dental Landing Page - Contact Form'
            };

            // Submit to Power Automate
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submissionData)
            });

            if (response.ok) {
                setSubmitStatus('success');
                // Reset form after 2 seconds
                setTimeout(() => {
                    setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        service: '',
                        agreedToTerms: false,
                        utm_source: utmSource, // Keep original source
                        utm_medium: formData.utm_medium,
                        utm_campaign: formData.utm_campaign,
                        browserInfo: formData.browserInfo
                    });
                    setSubmitStatus(null);
                    onClose();
                }, 2000);
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Backdrop click handler
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="contact-popup-backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={handleBackdropClick}
                >
                    <motion.div
                        className="contact-popup"
                        initial={{
                            opacity: 0,
                            scale: 0.8,
                            rotateX: -15,
                            y: 100
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            rotateX: 0,
                            y: 0
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.8,
                            rotateX: 15,
                            y: -100
                        }}
                        transition={{
                            duration: 0.5,
                            ease: [0.34, 1.56, 0.64, 1]
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            className="contact-popup__close"
                            onClick={onClose}
                            aria-label="Close popup"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>

                        {/* Header */}
                        <div className="contact-popup__header">
                            <h2 className="contact-popup__title gradient-text">Get In Touch</h2>
                            <p className="contact-popup__subtitle">
                                Fill the form below to grow your dental practice
                            </p>
                        </div>

                        {/* Form */}
                        <form className="contact-popup__form" onSubmit={handleSubmit}>
                            {/* Bento Grid Layout - Optimized for No Scroll */}
                            <div className="contact-popup__grid">
                                {/* Name Field - Full Width */}
                                <div className="contact-popup__field contact-popup__field--full">
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="contact-popup__input"
                                        placeholder="Your Name *"
                                        required
                                    />
                                </div>

                                {/* Email Field - Half Width */}
                                <div className="contact-popup__field contact-popup__field--half">
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="contact-popup__input"
                                        placeholder="Email Address *"
                                        required
                                    />
                                </div>

                                {/* Phone Field - Half Width */}
                                <div className="contact-popup__field contact-popup__field--half">
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="contact-popup__input"
                                        placeholder="Phone Number *"
                                        required
                                    />
                                </div>

                                {/* Service Dropdown - Full Width */}
                                <div className="contact-popup__field contact-popup__field--full">
                                    <div className="contact-popup__select-wrapper">
                                        <select
                                            id="service"
                                            name="service"
                                            value={formData.service}
                                            onChange={handleChange}
                                            className="contact-popup__select"
                                            required
                                        >
                                            <option value="">Select Service Interested In *</option>
                                            {serviceOptions.map((service) => (
                                                <option key={service} value={service}>
                                                    {service}
                                                </option>
                                            ))}
                                        </select>
                                        <svg className="contact-popup__select-icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* UTM Info - Hidden from UI but kept in state */}
                            <input type="hidden" name="utmSource" value={formData.utmSource} />

                            {/* Terms & Conditions Checkbox */}
                            <div className="terms-checkbox-wrapper" css-layer="contact-popup">
                                <label className="terms-label">
                                    <input
                                        type="checkbox"
                                        name="agreedToTerms"
                                        checked={formData.agreedToTerms}
                                        onChange={handleChange}
                                        required
                                        className="terms-input"
                                    />
                                    <span>
                                        I agree to the <a href="#" className="terms-link">Terms</a> and <a href="#" className="terms-link">Privacy Policy</a>.
                                    </span>
                                </label>
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                className={`contact-popup__submit ${isSubmitting ? 'contact-popup__submit--loading' : ''}`}
                                disabled={isSubmitting}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="contact-popup__spinner"></span>
                                        Sending...
                                    </>
                                ) : submitStatus === 'success' ? (
                                    <>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Done!
                                    </>
                                ) : submitStatus === 'error' ? (
                                    'Error - Retry'
                                ) : (
                                    'Send Message'
                                )}
                            </motion.button>

                            {/* Status Messages - Compact */}
                            {submitStatus === 'success' && (
                                <motion.div
                                    className="contact-popup__message contact-popup__message--success"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                >
                                    We'll contact you shortly!
                                </motion.div>
                            )}

                            {submitStatus === 'error' && (
                                <motion.div
                                    className="contact-popup__message contact-popup__message--error"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                >
                                    Something went wrong. Please try again.
                                </motion.div>
                            )}
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ContactPopup;
