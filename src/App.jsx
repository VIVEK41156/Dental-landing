import { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import StatsStripe from './components/StatsStripe';
import WhyChooseUs from './components/WhyChooseUs';
import Services from './components/Services';
import TrustSection from './components/TrustSection';
import ProcessFlow from './components/ProcessFlow';
import ClientsRing from './components/ClientsRing';
import TransformationSection from './components/TransformationSection';
import ReviewsSection from './components/ReviewsSection';
import StickySidebar from './components/StickySidebar';
import ContactPopup from './components/ContactPopup';
import Footer from './components/Footer';
import './App.css';

/**
 * Main App Component
 * Dental Landing Page Application
 */
function App() {
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);
  useEffect(() => {
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  // Open contact popup
  const handleOpenContactPopup = () => {
    setIsContactPopupOpen(true);
  };

  // Close contact popup
  const handleCloseContactPopup = () => {
    setIsContactPopupOpen(false);
  };

  return (
    <div className="app">
      <Header onContactClick={handleOpenContactPopup} />

      {/* Hero Section */}
      <section id="home">
        <Hero onContactClick={handleOpenContactPopup} />
      </section>

      {/* Stats Stripe Section */}
      <StatsStripe />

      {/* Why Choose Us Section */}
      <section id="why-choose-us">
        <WhyChooseUs />
      </section>

      {/* Services Section */}
      <section id="our-services">
        <Services />
      </section>

      {/* Trust & Authority Section */}
      <TrustSection />

      {/* Process Flow Section (Our SEO) */}
      <section id="our-seo">
        <ProcessFlow />
      </section>

      {/* Clients Ring Section (3D) */}
      <ClientsRing />

      {/* Before & After Transformation */}
      <TransformationSection />

      {/* Sticky Sidebar (Right) */}
      <StickySidebar onContactClick={handleOpenContactPopup} />

      {/* Reviews Section */}
      <ReviewsSection />

      {/* Contact Popup */}
      <ContactPopup
        isOpen={isContactPopupOpen}
        onClose={handleCloseContactPopup}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
