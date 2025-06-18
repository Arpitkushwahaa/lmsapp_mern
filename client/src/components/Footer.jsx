import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Top section: Logo and main navigation */}
        <div className="md:flex md:justify-between md:items-center text-center md:text-left">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold">E-Learning</h2>
            <p className="text-gray-400">Your journey to knowledge starts here.</p>
          </div>
          <nav className="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-6">
            <Link to="/" className="text-base text-gray-300 hover:text-white">Home</Link>
            <Link to="/courses" className="text-base text-gray-300 hover:text-white">Courses</Link>
            <Link to="/my-learning" className="text-base text-gray-300 hover:text-white">My Learning</Link>
          </nav>
        </div>

        {/* Separator */}
        <div className="mt-8 border-t border-gray-800 pt-8">
          {/* Bottom section: Copyright and social links */}
          <div className="md:flex md:justify-between md:items-center text-center">
            <p className="text-base text-gray-400 mb-4 md:mb-0">&copy; {new Date().getFullYear()} E-Learning. All rights reserved.</p>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex justify-center space-x-4">
                <a href="https://facebook.com" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors duration-300">
                  <FaFacebook size={24} />
                </a>
                <a href="https://twitter.com" aria-label="Twitter" className="text-gray-400 hover:text-white transition-colors duration-300">
                  <FaTwitter size={24} />
                </a>
                <a href="https://linkedin.com" aria-label="LinkedIn" className="text-gray-400 hover:text-white transition-colors duration-300">
                  <FaLinkedin size={24} />
                </a>
                <a href="https://instagram.com" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors duration-300">
                  <FaInstagram size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
