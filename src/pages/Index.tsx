
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Chatbot from '../components/Chatbot';
import CropRecommendation from '../components/CropRecommendation';
import PestDetection from '../components/PestDetection';
import Footer from '../components/Footer';

const Index = () => {
  // Smooth scroll to section when hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const { hash } = window.location;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    // Handle hash on initial load
    handleHashChange();

    // Add event listener for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <CropRecommendation />
      <PestDetection />
      <Chatbot />
      <Footer />
    </div>
  );
};

export default Index;
