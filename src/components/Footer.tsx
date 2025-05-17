import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Twitter, Facebook, Instagram, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-6 w-6 text-blue-400" />
              <span className="text-lg font-bold text-white">Y<span className="text-blue-400">SCAM</span></span>
            </div>
            <p className="text-sm">
              Protecting vulnerable populations from falling victim to scams by providing instant verification and educational resources.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link to="/verify" className="hover:text-blue-400 transition-colors">Verify Offers</Link></li>
              <li><Link to="/resources" className="hover:text-blue-400 transition-colors">Resources</Link></li>
              <li><Link to="/feedback" className="hover:text-blue-400 transition-colors">Feedback</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/resources" className="hover:text-blue-400 transition-colors">Common Scams</Link></li>
              <li><Link to="/resources" className="hover:text-blue-400 transition-colors">Protection Tips</Link></li>
              <li><Link to="/resources" className="hover:text-blue-400 transition-colors">Legitimate Job Sites</Link></li>
              <li><Link to="/resources" className="hover:text-blue-400 transition-colors">Safe Lending Options</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors" aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <p className="text-sm">
              Contact us: <a href="mailto:info@Yscam.org" className="text-blue-400 hover:underline">info@Yscam.org</a>
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} YSCAM. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <Link to="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};