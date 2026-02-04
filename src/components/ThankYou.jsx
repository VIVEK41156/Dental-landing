import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const ThankYou = () => {
    return (
        <div className="app">
            <Header onContactClick={() => { }} /> {/* Pass empty handler as calling it here might not be needed */}

            <main style={{
                minHeight: '80vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                textAlign: 'center',
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
            }}>
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{ maxWidth: '600px' }}
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring' }}
                        style={{
                            width: '180px',
                            height: '180px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 2rem',
                            overflow: 'hidden',
                            border: '4px solid white',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                        }}
                    >
                        <img
                            src="/src/assets/thank-you-tooth.png"
                            alt="Success"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </motion.div>

                    <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#1e293b' }}>Thank You!</h1>
                    <p style={{ fontSize: '1.25rem', color: '#475569', marginBottom: '2rem' }}>
                        Your submission has been received. We will be in touch with your free SEO audit shortly.
                    </p>

                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <motion.button
                            className="btn btn-primary"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Back to Home
                        </motion.button>
                    </Link>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
};

export default ThankYou;
