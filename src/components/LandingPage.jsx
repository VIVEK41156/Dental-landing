import { useEffect, useState, Suspense, lazy } from 'react';
import Header from './Header';
import Hero from './Hero';
import StatsStripe from './StatsStripe';
import WhyChooseUs from './WhyChooseUs';
import TrustSection from './TrustSection';
import StickySidebar from './StickySidebar';
import ContactPopup from './ContactPopup';
import Footer from './Footer';

// Lazy load heavy sections below the fold
const Services = lazy(() => import('./Services'));
const ProcessFlow = lazy(() => import('./ProcessFlow'));
const ClientsRing = lazy(() => import('./ClientsRing'));
const TransformationSection = lazy(() => import('./TransformationSection'));
const ReviewsSection = lazy(() => import('./ReviewsSection'));

// Section Loader
const SectionLoader = () => <div style={{ height: '200px' }} />;

function LandingPage() {
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

            <section id="home">
                <Hero onContactClick={handleOpenContactPopup} />
            </section>

            <StatsStripe />

            <section id="why-choose-us">
                <WhyChooseUs />
            </section>

            <Suspense fallback={<SectionLoader />}>
                <section id="our-services">
                    <Services />
                </section>
            </Suspense>

            <TrustSection />

            <Suspense fallback={<SectionLoader />}>
                <section id="our-seo">
                    <ProcessFlow />
                </section>
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
                <ClientsRing />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
                <TransformationSection />
            </Suspense>

            <StickySidebar onContactClick={handleOpenContactPopup} />

            <Suspense fallback={<SectionLoader />}>
                <ReviewsSection />
            </Suspense>

            <ContactPopup
                isOpen={isContactPopupOpen}
                onClose={handleCloseContactPopup}
            />

            <Footer />
        </div>
    );
}

export default LandingPage;
