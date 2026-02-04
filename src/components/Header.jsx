import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Header.css';

/**
 * Header Component
 * Professional navigation header with logo and menu items
 * Features: Sticky header, mobile menu, scroll effects, 3D animations
 */
const Header = ({ onContactClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Menu items configuration
  const menuItems = [
    { name: 'Home', href: '#home' },
    { name: 'Our Services', href: '#our-services' },
    { name: 'Our SEO', href: '#our-seo' },
    { name: 'Why Choose Us', href: '#why-choose-us' },
    { name: 'Contact Us', href: '#contact-us' }
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Determine active section
      const sections = ['home', 'our-services', 'our-seo', 'why-choose-us'];

      // Default to home if at top
      if (window.scrollY < 100) {
        setActiveSection('home');
        return;
      }

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if section is roughly in the middle of viewport or taking up most of it
          if (rect.top <= 300 && rect.bottom >= 300) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.header')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Handle menu item click
  const handleMenuClick = (href) => {
    setIsMobileMenuOpen(false);
    // Smooth scroll with offset
    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <motion.header
      className={`header ${isScrolled ? 'header--scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="header__container container">
        {/* Logo */}
        <motion.div
          className="header__logo"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <a href="#home">
            <img
              src="https://digitmarketus.com/wp-content/uploads/2025/08/cropped-Digit-Marketus-Logo-scaled-1.png"
              alt="Digit Marketus Logo"
              className="header__logo-img"
            />
          </a>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="header__nav">
          <ul className="header__menu">
            {menuItems.map((item, index) => (
              <motion.li
                key={item.name}
                className="header__menu-item"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <a
                  href={item.href}
                  className={`header__menu-link 
                    ${item.name === 'Contact Us' ? 'header__menu-link--highlight' : ''}
                    ${item.name !== 'Contact Us' && activeSection === item.href.replace('#', '') ? 'header__menu-link--active' : ''}
                  `}
                  onClick={(e) => {
                    e.preventDefault();
                    if (item.name === 'Contact Us') {
                      onContactClick();
                    } else {
                      handleMenuClick(item.href);
                    }
                  }}
                >
                  {item.name}
                </a>
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={`header__mobile-toggle ${isMobileMenuOpen ? 'header__mobile-toggle--active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span className="header__mobile-toggle-line"></span>
          <span className="header__mobile-toggle-line"></span>
          <span className="header__mobile-toggle-line"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="header__mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="header__mobile-nav">
              <ul className="header__mobile-list">
                {menuItems.map((item, index) => (
                  <motion.li
                    key={item.name}
                    className="header__mobile-item"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                  >
                    <a
                      href={item.href}
                      className={`header__mobile-link ${item.name === 'Contact Us' ? 'header__mobile-link--highlight' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        if (item.name === 'Contact Us') {
                          setIsMobileMenuOpen(false);
                          onContactClick();
                        } else {
                          handleMenuClick(item.href);
                        }
                      }}
                    >
                      {item.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div >
        )}
      </AnimatePresence >
    </motion.header >
  );
};

export default Header;
