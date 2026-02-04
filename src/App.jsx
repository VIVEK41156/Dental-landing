import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Lazy load components for performance
const LandingPage = lazy(() => import('./components/LandingPage'));
const ThankYou = lazy(() => import('./components/ThankYou'));

// Loading fallback
const PageLoader = () => (
  <div style={{
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f8fafc'
  }}>
    <div className="spinner" style={{
      width: '40px',
      height: '40px',
      border: '4px solid #e2e8f0',
      borderTopColor: '#0f172a',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }}></div>
    <style>{`
      @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    `}</style>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/thank-you" element={<ThankYou />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
