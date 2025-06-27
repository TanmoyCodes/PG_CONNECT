import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ onLoginClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Left: Logo */}
        <a href="/" className="text-2xl font-bold text-red-600">LPUStays</a>

        {/* Right: Nav Links + Login */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-600 hover:text-red-600">Home</Link>
          <Link to="/listings" className="text-gray-600 hover:text-red-600">Listings</Link>
          <Link to="/about" className="text-gray-600 hover:text-red-600">About Us</Link>
          <Link to="/contact" className="text-gray-600 hover:text-red-600">Contact</Link>

          <button
            onClick={onLoginClick}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
          >
            Login
          </button>
        </div>

        {/* Mobile: Hamburger */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <i className="fas fa-bars text-gray-600 text-xl"></i>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="md:hidden bg-white border-t">
  <Link to="/" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Home</Link>
  <Link to="/listings" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Listings</Link>
  <Link to="/about" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">About Us</Link>
  <Link to="/contact" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Contact</Link>
</div>
          <div className="px-6 py-3">
            <button
              onClick={() => {
                onLoginClick();
                setIsMenuOpen(false);
              }}
              className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Login
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
