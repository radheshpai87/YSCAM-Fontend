import React, { useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { motion, AnimatePresence } from 'framer-motion';
import useDocumentMetadata from '../hooks/useDocumentMetadata';
import { keepAliveService } from '../utils/keepAliveService';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  // Apply SEO optimizations based on current route
  useDocumentMetadata();
  
  // Start the keep-alive service when the app loads
  useEffect(() => {
    // Start the service when the user is actively using the app
    keepAliveService.start();
    
    // Clean up by stopping the service when the component unmounts
    return () => {
      keepAliveService.stop();
    };
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />
      <AnimatePresence mode="wait">
        <motion.main 
          className="flex-grow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
};