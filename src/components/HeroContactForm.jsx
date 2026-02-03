import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './HeroContactForm.css';

/**
 * HeroContactForm Component
 * Inline contact form for Hero section
 * Reuses logic from ContactPopup but for static display
 */
const HeroContactForm = () => {
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
    const [submitStatus, setSubmitStatus] = useState(null);

    // Service options
    const serviceOptions = [
        'Local SEO for Dentists',
        'On-Page SEO Optimization',
        'Dental Content Marketing',
        'Technical SEO',
        'Trust & Authority Building'
    ];

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);

        // Get browser info
        const browserInfo = {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language,
            referrer: document.referrer || 'direct'
        };

        setFormData(prev => ({
            ...prev,
            utm_source: urlParams.get('utm_source') || 'direct',
            utm_medium: urlParams.get('utm_medium') || '',
            utm_campaign: urlParams.get('utm_campaign') || '',
            utm_term: urlParams.get('utm_term') || '',
            utm_content: urlParams.get('utm_content') || '',
            browserInfo: JSON.stringify(browserInfo)
        }));
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const webhookUrl = 'https://default08423cbb15b24cc9a5a6b7b2701a47.2b.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/5a33e7f9a71e4e7a90c513c74b564157/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Yqhd34Oka_pOrg1AT2DPj5vzFV0IZ3lPBh9N37YIZAM';

            const submissionData = {
                ...formData,
                timestamp: new Date().toISOString(),
                source: 'Dental Landing Page - Hero Form'
            };

            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submissionData)
            });

            if (response.ok) {
                setSubmitStatus('success');
                setTimeout(() => {
                    setFormData(prev => ({
                        ...prev,
                        name: '',
                        email: '',
                        phone: '',
                        service: '',
                        agreedToTerms: false
                    }));
                    setSubmitStatus(null);
                }, 3000);
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

    return (
        <div className="hero-form-card glass">
            <h3 className="hero-form__title">
                Get Your Free <span className="text-highlight">SEO Audit</span>
            </h3>

            <form className="hero-form" onSubmit={handleSubmit}>
                <div className="hero-form__field">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name *"
                        required
                        className="hero-form__input"
                    />
                </div>

                <div className="hero-form__row">
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email *"
                        required
                        className="hero-form__input"
                    />
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone *"
                        required
                        className="hero-form__input"
                    />
                </div>

                <div className="hero-form__field">
                    <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        required
                        className="hero-form__select"
                    >
                        <option value="">Select Service Interested In *</option>
                        {serviceOptions.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                </div>

                <label className="hero-form__terms">
                    <input
                        type="checkbox"
                        name="agreedToTerms"
                        checked={formData.agreedToTerms}
                        onChange={handleChange}
                        required
                    />
                    <span>I agree to Terms & Privacy Policy</span>
                </label>

                <motion.button
                    type="submit"
                    className="btn btn-primary hero-form__submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    {isSubmitting ? 'Sending...' : submitStatus === 'success' ? 'Sent Successfully!' : 'Get Free Audit Now'}
                </motion.button>

                {submitStatus === 'error' && (
                    <p className="hero-form__error">Submission failed. Please try again.</p>
                )}
            </form>
        </div>
    );
};

export default HeroContactForm;
