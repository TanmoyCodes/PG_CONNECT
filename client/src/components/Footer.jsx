import React from 'react';
import { Link } from 'react-router';

const Footer = () => (
  <footer className="bg-gray-800 text-white py-10">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-bold mb-4">PG Hunter</h3>
          <p className="text-gray-400">
            Your trusted partner in finding the perfect accommodation for students and professionals.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <ul>
            <li className="mb-2">
              <Link to='/' className="hover:text-red-500">Home</Link>
            </li>
            <li className="mb-2">
              <Link to='/listings' className="hover:text-red-500">Listings</Link>
            </li>
            
            <li className="mb-2">
              <Link to='/' className="hover:text-red-500">Terms & Conditions</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">Contact Us</h3>
          <p className="text-gray-400 mb-2">
            <i className="fas fa-envelope mr-2" /> contact.pghunter@gmail.com
          </p>
          <p className="text-gray-400">
            <i className="fas fa-phone mr-2" /> +91 97747 28561
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-facebook-f text-xl" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-twitter text-xl" />
            </a>
            <a href="https://www.instagram.com/pg_wale_bhaiya?igsh=MTd4M2Y2aDJ0bmhtaw==" className="text-gray-400 hover:text-white">
              <i className="fab fa-instagram text-xl" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500">
        &copy; 2025 PGHunter. All Rights Reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
