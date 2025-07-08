// pages/HomePage.jsx
import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedPGs from '../components/FeaturedPGs';
import HowItWorks from '../components/HowItWorks';

const HomePage = () => {
  return (
    <main className="bg-white text-gray-800">
      <HeroSection />
      
      <FeaturedPGs />
      <HowItWorks />
    </main>
  );
};

export default HomePage;
