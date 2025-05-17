import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, AlertTriangle, Menu, X, BookOpen, MessageSquare, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHoveringLogo, setIsHoveringLogo] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { name: 'Home', path: '/', icon: null },
    { name: 'Verify', path: '/verify', icon: <AlertTriangle className="h-4 w-4 mr-1" /> },
    { name: 'Resources', path: '/resources', icon: <BookOpen className="h-4 w-4 mr-1" /> },
    { name: 'Feedback', path: '/feedback', icon: <MessageSquare className="h-4 w-4 mr-1" /> },
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        staggerChildren: 0.1
      }
    }
  };

  const linkVariants = {
    closed: { x: -20, opacity: 0 },
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.3
      }
    })
  };

  const logoVariants = {
    normal: { scale: 1 },
    hover: { scale: 1.05, rotate: -5 },
    tap: { scale: 0.95 }
  };

  const shieldVariants = {
    normal: { rotate: 0 },
    hover: { rotate: 15 }
  };

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-md' 
          : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onHoverStart={() => setIsHoveringLogo(true)}
          onHoverEnd={() => setIsHoveringLogo(false)}
        >
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              variants={shieldVariants}
              animate={isHoveringLogo ? "hover" : "normal"}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Shield className="h-8 w-8 text-blue-600" />
            </motion.div>
            <motion.div
              variants={logoVariants}
              whileHover="hover"
              whileTap="tap"
              className="flex flex-col"
            >
              <span className="text-xl font-bold text-gray-900 dark:text-white">Y<span className="text-blue-600 dark:text-blue-400">SCAM</span></span>
              <span className="text-xs text-gray-500 dark:text-gray-400 -mt-1">Scam Protection</span>
            </motion.div>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={link.path}
                className={`flex items-center px-3 py-2 text-sm font-medium transition-all rounded-lg ${
                  location.pathname === link.path 
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30' 
                    : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            </motion.div>
          ))}
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/verify" 
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-500 dark:to-blue-400 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-500 transition-all shadow-sm hover:shadow-md"
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              <span>Check for Scams</span>
            </Link>
          </motion.div>
          
          {/* Theme toggle button */}
          <motion.button
            className="ml-4 p-2 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            onClick={toggleTheme}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </motion.button>
        </nav>

        <div className="flex items-center space-x-2">
          {/* Theme toggle button for mobile */}
          <motion.button
            className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors md:hidden"
            onClick={toggleTheme}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button 
            className="md:hidden p-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={toggleMenu}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm overflow-hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <div className="container mx-auto px-4 py-2 pb-4 flex flex-col space-y-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  custom={i}
                  variants={linkVariants}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to={link.path}
                    className={`flex items-center px-4 py-3 text-base font-medium transition-colors rounded-lg ${
                      location.pathname === link.path 
                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30' 
                        : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.icon}
                    <span className="ml-2">{link.name}</span>
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                variants={linkVariants}
                custom={navLinks.length}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="pt-2"
              >
                <Link 
                  to="/verify" 
                  className="flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-500 dark:to-blue-400 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-500 transition-all shadow-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  <span className="font-medium">Check for Scams</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};