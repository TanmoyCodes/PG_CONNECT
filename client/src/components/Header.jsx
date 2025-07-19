import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ onLoginClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex gap-2 items-center">
          <img
            src="https://ik.imagekit.io/tanmoycodes/PGHunter.png?updatedAt=1752302407422"
            width="50"
            alt="icon"
          />
          <a
            href="/"
            className="text-2xl font-bold text-red-600"
            style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800 }}
          >
            PG Hunter
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-600 hover:text-red-600">Home</Link>
          <Link to="/listings" className="text-gray-600 hover:text-red-600">Listings</Link>
          <Link to="/about" className="text-gray-600 hover:text-red-600">About Us</Link>
          <Link
            to={`https://wa.me/919774728561?text=${encodeURIComponent('Hello admin, I want to list my PG in your website.')}`}
            className="text-gray-600 hover:text-red-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            List Your PG
          </Link>
          <Link to="/contact" className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300">
            Contact Us
          </Link>
        </div>

        {/* Hamburger Icon */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <i className="fas fa-bars text-gray-700 text-2xl"></i>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
  <div className="md:hidden bg-white shadow-inner transition-all duration-300 ease-in-out">
    <div className="flex flex-col items-center text-center py-6 space-y-4 px-6">
      <Link to="/" className="text-gray-700 hover:text-red-600 w-full" onClick={() => setIsMenuOpen(false)}>Home</Link>
      <Link to="/listings" className="text-gray-700 hover:text-red-600 w-full" onClick={() => setIsMenuOpen(false)}>Listings</Link>
      <Link to="/about" className="text-gray-700 hover:text-red-600 w-full" onClick={() => setIsMenuOpen(false)}>About Us</Link>
      <a
        href={`https://wa.me/919863258533?text=${encodeURIComponent('Hello admin, I want to list my PG in your website.')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-700 hover:text-red-600 w-full"
        onClick={() => setIsMenuOpen(false)}
      >
        List Your PG
      </a>
      
      {/* ✅ Full-width Contact Us button */}
      <Link
        to="/contact"
        className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition text-center"
        onClick={() => setIsMenuOpen(false)}
      >
        Contact Us
      </Link>
    </div>
  </div>
      )}
    </header>
  );
};

export default Header;
