import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import AboutSection from './components/AboutSection';
import GallerySection from './components/GallerySection';
import ReviewsSection from './components/ReviewsSection';
import ContactSection from './components/ContactSection';
import PaymentSection from './components/PaymentSection';
import FoodMenu from './components/FoodMenu';
import HeroSection from './components/HeroSection';
import SiteQR from './components/SiteQR';

function App() {
  const [activeView, setActiveView] = React.useState('home');

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const viewParam = params.get('view');
    if (viewParam) {
      setActiveView(viewParam);
    }
  }, []);

  const renderContent = () => {
    switch (activeView) {
      case 'home':
        return (
          <>
            <HeroSection />

          </>
        );
      case 'about':
        return <main className="container mx-auto px-4 pt-4 pb-12"><AboutSection /></main>;
      case 'menu':
        return <main className="container mx-auto px-4 pt-4 pb-12"><FoodMenu /></main>;
      case 'gallery':
        return <main className="container mx-auto px-4 pt-4 pb-12"><GallerySection /></main>;
      case 'reviews':
        return <main className="container mx-auto px-4 pt-4 pb-12"><ReviewsSection /></main>;
      case 'contact':
        return <main className="container mx-auto px-4 pt-4 pb-12"><ContactSection /></main>;
      case 'payment':
        return <main className="container mx-auto px-4 pt-4 pb-12"><PaymentSection /></main>;
      default:
        return <HeroSection />;
    }
  };

  return (
    <div className="min-h-screen bg-primary text-white font-sans selection:bg-accent selection:text-primary flex flex-col">
      <Header onNavigate={setActiveView} activeView={activeView} />

      <div className="flex-grow">
        {renderContent()}
      </div>

      <Footer />

    </div>
  );
}

export default App;
