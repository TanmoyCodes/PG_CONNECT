import React from 'react';
import SearchBar from './SearchBar';

const HeroSection = () => (
  <section className="relative h-[90vh] flex items-center justify-center text-white overflow-hidden">
    {/* Background Image */}
    <img
      src="https://assets.architecturaldigest.in/photos/600822f8111eef0df0a1c613/16:9/w_2560%2Cc_limit/interior-design-this-apartment-in-mumbai-offers-a-stunning-view-of-marine-drive11-1366x768.jpg"  // ← change this to your image path
      alt="Hero Background"
      className="absolute inset-0 w-full h-full object-cover"
    />

    {/* Dark Overlay */}
    <div className="absolute inset-0 bg-black/60"></div>

    {/* Foreground Content */}
    <div className="relative z-10 text-center mx-4">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">Find Your Perfect PG, Hassle-Free</h1>
      <p className="text-lg md:text-xl mb-8">Connecting you to the best PGs without any middleman hassle.</p>
      <SearchBar />
    </div>
  </section>
);

export default HeroSection;
