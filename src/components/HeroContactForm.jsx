import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
        company: '',
        countryCode: '+1',
        phone: '',
        message: '',
        agreedToTerms: false,
        utm_source: '',
        utm_medium: '',
        utm_campaign: '',
        utm_term: '',
        utm_content: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

    useEffect(() => {
        // Capture UTM parameters from URL
        const queryParams = new URLSearchParams(window.location.search);
        setFormData(prev => ({
            ...prev,
            utm_source: queryParams.get('utm_source') || 'direct',
            utm_medium: queryParams.get('utm_medium') || '',
            utm_campaign: queryParams.get('utm_campaign') || '',
            utm_term: queryParams.get('utm_term') || '',
            utm_content: queryParams.get('utm_content') || ''
        }));
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);
        setErrorMessage('');

        try {
            const webhookUrl = 'https://default08423cbb15b24cc9a5a6b7b2701a47.2b.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/e48ba7224a61418ca63a939c1fffa818/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=uuaiFx4x8TLydB4CRIy00EM984GVe-hu7Fma7vnEthI';

            const submissionData = {
                name: formData.name,
                email: formData.email,
                company: formData.company || '',
                countryCode: formData.countryCode,
                phone: `${formData.countryCode} ${formData.phone}`, // Send full number
                message: formData.message || '',
                agreeToTerms: formData.agreedToTerms,
                utm_source: formData.utm_source || '',
                utm_medium: formData.utm_medium || '',
                utm_campaign: formData.utm_campaign || '',
                utm_term: formData.utm_term || '',
                utm_content: formData.utm_content || ''
            };

            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submissionData)
            });

            if (response.ok) {
                setSubmitStatus('success');
                setTimeout(() => {
                    navigate('/thank-you');
                }, 1000);
            } else {
                const errorText = `Server Error: ${response.status}`;
                console.error('Form submission failed:', response.status, response.statusText);
                setErrorMessage(errorText);
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            const errorText = `Network Error: ${error.message}`;
            setErrorMessage(errorText);
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
                        placeholder="Name"
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
                        placeholder="Email"
                        required
                        className="hero-form__input"
                    />
                    <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Company"
                        className="hero-form__input"
                    />
                </div>

                <div className="hero-form__row phone-row">
                    <select
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleChange}
                        className="hero-form__select country-select"
                    >
                        <option value="+1">+1</option>
                        <option value="+91">+91</option>
                        <option value="+44">+44</option>
                        <option value="+61">+61</option>
                        <option value="+81">+81</option>
                    </select>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter Phone Number"
                        required
                        className="hero-form__input"
                    />
                </div>

                <div className="hero-form__field">
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Message (Min 10 chars)"
                        rows="3"
                        minLength="10"
                        className="hero-form__textarea"
                    ></textarea>
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
                    <p className="hero-form__error" style={{ color: '#ef4444', marginTop: '10px', fontSize: '0.9rem' }}>
                        Submission failed: {errorMessage}. Please try again.
                    </p>
                )}
            </form>
        </div>
    );
};

export default HeroContactForm;
