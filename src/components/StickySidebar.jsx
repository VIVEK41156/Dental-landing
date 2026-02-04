import React, { useState, useEffect } from 'react';
import './StickySidebar.css';
import whatsappIcon from '../assets/whatsapp-icon.png';

const StickySidebar = ({ onContactClick }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const wcuSection = document.getElementById('why-choose-us');
            if (wcuSection) {
                const triggerPoint = wcuSection.offsetTop - 100; // Trigger slightly before
                const currentScroll = window.scrollY;

                // Only show if passed the trigger point
                if (currentScroll > triggerPoint) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                }
            } else {
                // Fallback if section not found (e.g. loading)
                setIsVisible(window.scrollY > 600);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        // Initial check
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={`sticky-sidebar ${isVisible ? 'visible' : 'hidden'}`}>
            {/* WhatsApp Icon Image */}
            <a
                href="https://wa.me/918885022730"
                target="_blank"
                rel="noopener noreferrer"
                className="sidebar-icon-link"
                aria-label="Chat on WhatsApp"
            >
                <img src={whatsappIcon} alt="WhatsApp" className="whatsapp-img" />
            </a>

            {/* Enquire Now Button */}
            <button
                className="sidebar-btn enquire-btn"
                onClick={onContactClick}
                aria-label="Enquire Now"
            >
                <span>Enquire Now</span>
            </button>
        </div>
    );
};

export default StickySidebar;
