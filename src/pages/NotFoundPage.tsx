import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, Home, Search } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center"
      >
        <div className="mb-6">
          <AlertTriangle className="h-20 w-20 text-amber-500 mx-auto" />
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Page Not Found</h1>
        
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/" 
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 dark:bg-blue-700 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors inline-flex items-center justify-center"
          >
            <Home className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
          
          <Link 
            to="/verify" 
            className="w-full sm:w-auto px-6 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors inline-flex items-center justify-center"
          >
            <Search className="h-5 w-5 mr-2" />
            Verify an Offer
          </Link>
        </div>
      </motion.div>
    </div>
  );
};