import React, { useState, useEffect } from 'react';
import './StickySidebar.css';
import whatsappIcon from '../assets/whatsapp-icon.png';

const StickySidebar = ({ onContactClick }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        let timeoutId;

        const handleScroll = () => {
            // Hide immediately on scroll
            setIsVisible(false);

            // Clear existing timeout
            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            // Show after 300ms of no scrolling
            timeoutId = setTimeout(() => {
                setIsVisible(true);
            }, 300);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, []);

    return (
        <div className={`sticky-sidebar ${isVisible ? 'visible' : 'hidden'}`}>
            {/* WhatsApp Icon Image */}
            <a
                href="https://wa.me/16303789785"
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
