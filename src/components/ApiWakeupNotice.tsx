import React, { useState, useEffect } from 'react';
import { Zap, AlertTriangle, CheckCircle } from 'lucide-react';
import { wakeupRenderService, checkApiStatus, APIStatus } from '../utils/renderWakeup';

/**
 * Component that displays the API service status and allows users to wake it up manually
 */
const ApiWakeupNotice: React.FC = () => {
  const [apiStatus, setApiStatus] = useState<APIStatus | null>(null);
  const [isWaking, setIsWaking] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  // Check API status when the component mounts
  useEffect(() => {
    const checkStatus = async () => {
      const status = await checkApiStatus();
      setApiStatus(status);
    };
    
    checkStatus();
    
    // Hide after 5 minutes to avoid distracting users
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 5 * 60 * 1000);
    
    return () => clearTimeout(timeout);
  }, []);
  
  // Handler to wake up the API
  const handleWakeup = async () => {
    setIsWaking(true);
    setStatusMessage('Waking up API service...');
    
    try {
      const status = await wakeupRenderService((message, progress) => {
        setStatusMessage(message);
        setProgress(progress);
      });
      
      setApiStatus(status);
    } catch {
      setStatusMessage('Failed to wake up API service.');
    } finally {
      setIsWaking(false);
      
      // Even if we failed, automatically hide after 10 seconds
      setTimeout(() => {
        setStatusMessage(null);
      }, 10000);
    }
  };
  
  // Don't show if the API is already awake and responsive
  if (!isVisible || (apiStatus?.isAwake && apiStatus.responseTimeMs < 500 && !statusMessage)) {
    return null;
  }
  
  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md">
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-start">
          {!apiStatus?.isAwake ? (
            <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" />
          ) : apiStatus.responseTimeMs > 1000 ? (
            <Zap className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
          ) : (
            <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
          )}
          
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white text-sm">
              {!apiStatus?.isAwake ? 
                "API Service is in Cold Start Mode" : 
                apiStatus.responseTimeMs > 1000 ?
                "API Service is Warming Up" :
                "API Service is Ready"
              }
            </h3>
            
            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
              {statusMessage || apiStatus?.message || "Checking API status..."}
            </p>
            
            {isWaking && (
              <div className="mt-2">
                <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            )}
            
            <div className="mt-3 flex items-center justify-between">
              {!isWaking && (apiStatus?.isAwake === false || (apiStatus?.responseTimeMs && apiStatus.responseTimeMs > 1000)) && (
                <button
                  onClick={handleWakeup}
                  disabled={isWaking}
                  className="text-xs px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium transition-colors"
                >
                  {isWaking ? "Waking Up..." : "Wake Up API Now"}
                </button>
              )}
              
              <button
                onClick={() => setIsVisible(false)}
                className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 ml-auto"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiWakeupNotice;
