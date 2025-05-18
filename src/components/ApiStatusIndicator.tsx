import React, { useState, useEffect } from 'react';
import { Zap, AlertTriangle, Clock } from 'lucide-react';
import { checkApiStatus, APIStatus } from '../utils/renderWakeup';

interface ApiStatusIndicatorProps {
  className?: string;
  compact?: boolean;
}

/**
 * Component that displays a small indicator showing the current API status
 */
const ApiStatusIndicator: React.FC<ApiStatusIndicatorProps> = ({ className = '', compact = false }) => {
  const [status, setStatus] = useState<APIStatus | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  
  // Check API status periodically
  useEffect(() => {
    // Function to check status
    const checkStatus = async () => {
      if (isChecking) return;
      
      setIsChecking(true);
      try {
        const apiStatus = await checkApiStatus();
        setStatus(apiStatus);
      } catch {
        setStatus({
          isAwake: false,
          responseTimeMs: -1,
          message: 'Unable to connect to API'
        });
      } finally {
        setIsChecking(false);
      }
    };
    
    // Initial check
    checkStatus();
    
    // Set up interval to check every minute
    const intervalId = window.setInterval(checkStatus, 60000);
    
    return () => {
      window.clearInterval(intervalId);
    };
  }, [isChecking]);
  
  // If we don't have status yet, show loading
  if (!status) {
    return compact ? (
      <div className={`animate-pulse ${className}`}>
        <Clock className="h-4 w-4" />
      </div>
    ) : (
      <div className={`flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 ${className}`}>
        <Clock className="h-3 w-3" />
        <span className="animate-pulse">Checking...</span>
      </div>
    );
  }
  
  // For compact mode (icon only)
  if (compact) {
    return (
      <div 
        className={`relative group ${className}`}
      >
        {status.isAwake ? (
          status.responseTimeMs < 1000 ? (
            <Zap className="h-4 w-4 text-green-500" />
          ) : (
            <Zap className="h-4 w-4 text-amber-500" />
          )
        ) : (
          <AlertTriangle className="h-4 w-4 text-red-500" />
        )}
        
        {/* Custom tooltip */}
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
          {status.message}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
        </div>
      </div>
    );
  }
  
  // Full version with text
  return (
    <div className={`flex items-center gap-1.5 text-xs ${className}`}>
      {status.isAwake ? (
        status.responseTimeMs < 1000 ? (
          <>
            <Zap className="h-3 w-3 text-green-500" />
            <span className="text-green-600 dark:text-green-400">API Ready</span>
          </>
        ) : (
          <>
            <Zap className="h-3 w-3 text-amber-500" />
            <span className="text-amber-600 dark:text-amber-400">API Warming</span>
          </>
        )
      ) : (
        <>
          <AlertTriangle className="h-3 w-3 text-red-500" />
          <span className="text-red-600 dark:text-red-400">API Cold</span>
        </>
      )}
    </div>
  );
};

export default ApiStatusIndicator;
