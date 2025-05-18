// API Services for document and text analysis
import axios from 'axios';
import { DocumentAnalysisResult } from '../interfaces';

// Connect to the real ML model API using environment variables if available
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://yscam-api.onrender.com';

// Axios instance with config optimized for Render's free tier cold starts
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 180000, // 3 minute timeout for extreme cold start cases
  headers: {
    'Content-Type': 'application/json'
  }
});

// Event callbacks for API operations
type ProgressCallbacks = {
  onRetry?: (attempt: number, delay: number) => void;
  onTimeout?: () => void;
  onProgress?: (stage: string, progress: number) => void;
};

// Helper function for retry logic with improved waiting designed for Render's free tier
const retryOperation = async <T>(
  operation: () => Promise<T>,
  maxRetries: number = 8, // More retries for cold starts
  initialDelay: number = 8000, // Longer initial delay (8 seconds)
  retryCondition?: (error: unknown) => boolean,
  callbacks?: ProgressCallbacks
): Promise<T> => {
  let lastError: unknown;
  let delay = initialDelay;
  
  // For tracking total wait time
  const startTime = Date.now();
  const maxWaitTime = 150000; // 2.5 minutes max wait
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      // Update progress if callback provided
      if (callbacks?.onProgress) {
        callbacks.onProgress('connecting', Math.min(50 + attempt * 5, 90));
      }
      
      // Attempt the operation
      const result = await operation();
      
      // If successful, return the result
      return result;
    } catch (error) {
      lastError = error;
      
      // Check if we've waited too long overall
      if (Date.now() - startTime > maxWaitTime) {
        if (callbacks?.onTimeout) {
          callbacks.onTimeout();
        }
        throw new Error("Server response timeout. The API server may be experiencing high load or a cold start. Please try again in a few minutes.");
      }
      
      // Check if we should retry based on error
      if (retryCondition && !retryCondition(error)) {
        break;
      }
      
      // Don't wait on the last attempt
      if (attempt < maxRetries) {
        // Notify about retry if callback provided
        if (callbacks?.onRetry) {
          callbacks.onRetry(attempt, delay/1000);
        }
        
        console.log(`Attempt ${attempt} failed, retrying in ${delay/1000} seconds...`);
        
        // Wait with progress updates
        const waitStartTime = Date.now();
        const waitDuration = delay;
        
        await new Promise<void>((resolve) => {
          const progressInterval = setInterval(() => {
            const elapsed = Date.now() - waitStartTime;
            const progress = Math.min((elapsed / waitDuration) * 100, 100);
            
            if (callbacks?.onProgress) {
              callbacks.onProgress('waiting', Math.floor(progress));
            }
            
            if (elapsed >= waitDuration) {
              clearInterval(progressInterval);
              resolve();
            }
          }, 200);
        });
        
        // Exponential backoff with longer waits for cold start
        // But cap at 20 seconds to avoid extreme waits
        delay = Math.min(delay * 1.5, 20000);
      }
    }
  }
  
  throw lastError;
};

// Error handler helper with improved messages for Render's cold start
const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    // Handle Axios errors
    if (error.response) {
      // The request was made and the server responded with a status code outside 2xx range
      if (error.response.status === 503) {
        return "The service is temporarily unavailable. The server is likely in cold start mode - please try again in 30-60 seconds.";
      } else if (error.response.status === 504) {
        return "The server gateway timed out. This happens during cold starts - please wait a moment and try again.";
      }
      return error.response.data?.message || `Error ${error.response.status}: ${error.response.statusText}`;
    } else if (error.request) {
      // The request was made but no response was received
      if (error.code === 'ECONNABORTED') {
        return 'The server took too long to respond. This is normal for the first request after server idle time. Please try again.';
      }
      return 'Server is starting up. This might take 30-60 seconds on Render\'s free tier. Please be patient or try again.';
    } else {
      // Something happened in setting up the request
      return `Error setting up request: ${error.message}`;
    }
  }
  // Handle non-Axios errors
  return error instanceof Error ? error.message : 'Unknown error occurred';
};

// Shared event bus for API status updates
type ProgressCallback = (stage: string, message: string, progress: number) => void;
let progressCallback: ProgressCallback | null = null;

// Register a callback for API progress updates
export const registerProgressCallback = (callback: ProgressCallback) => {
  progressCallback = callback;
};

// Unregister the callback
export const unregisterProgressCallback = () => {
  progressCallback = null;
};

// Text analysis API with improved waiting for Render's cold start
export const analyzeText = async (message: string): Promise<DocumentAnalysisResult> => {
  try {
    // Use enhanced retry logic with progress reporting
    const response = await retryOperation(
      async () => await apiClient.post('/detect', { message }),
      6, // Increased max retries for cold start
      8000, // Longer initial delay (8 seconds)
      (error) => axios.isAxiosError(error) && (!error.response || error.response.status >= 500),
      {
        onRetry: (attempt, delay) => {
          const message = `Server is waking up (attempt ${attempt}). Waiting ${delay} seconds...`;
          if (progressCallback) progressCallback('waiting', message, 30 + attempt * 10);
        },
        onTimeout: () => {
          if (progressCallback) progressCallback('timeout', 'Server is taking unusually long to respond.', 95);
        },
        onProgress: (stage, progress) => {
          const message = stage === 'connecting' 
            ? 'Connecting to analysis server...' 
            : 'Waiting for server to process request...';
          if (progressCallback) progressCallback(stage, message, progress);
        }
      }
    );
    
    console.log('API Response for text analysis:', response.data);
    
    // If the API doesn't return a prediction field but has classification, use that
    if (!response.data.prediction && response.data.classification) {
      response.data.prediction = response.data.classification;
    }
    
    return response.data;
  } catch (error) {
    console.error('API Error in analyzeText:', error);
    throw new Error(handleApiError(error));
  }
};

// Document analysis API with improved waiting for Render's cold start
export const analyzeDocument = async (file: File): Promise<DocumentAnalysisResult> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    // Use enhanced retry logic with progress reporting
    const response = await retryOperation(
      async () => await apiClient.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        // Extend timeout for file uploads
        timeout: 240000 // 4 minutes for larger files
      }),
      6, // Increased max retries
      10000, // Even longer initial delay (10 seconds) for file uploads
      (error) => axios.isAxiosError(error) && (!error.response || error.response.status >= 500),
      {
        onRetry: (attempt, delay) => {
          const message = `Still uploading file (attempt ${attempt})... Server may be in cold start mode. Waiting ${delay} seconds...`;
          if (progressCallback) progressCallback('uploading', message, 40 + attempt * 8);
        },
        onTimeout: () => {
          if (progressCallback) progressCallback('timeout', 'File upload is taking unusually long. The server may be experiencing high load.', 95);
        },
        onProgress: (stage, progress) => {
          let message = 'Uploading document...';
          if (stage === 'connecting') message = 'Connecting to document analysis server...';
          else if (stage === 'waiting') message = 'Waiting for server to process document...';
          
          if (progressCallback) progressCallback(stage, message, progress);
        }
      }
    );
    
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// API to get scam examples with improved waiting
export const getScamExamples = async (): Promise<Record<string, unknown>[]> => {
  try {
    // Use enhanced retry logic
    const response = await retryOperation(
      async () => await apiClient.get('/examples'),
      5, // Increased max retries
      5000, // Longer initial delay
      (error) => axios.isAxiosError(error) && (!error.response || error.response.status >= 500),
      {
        onRetry: (attempt, delay) => {
          const message = `Loading examples (attempt ${attempt})... Waiting ${delay} seconds...`;
          if (progressCallback) progressCallback('loading', message, 40 + attempt * 10);
        }
      }
    );
    
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Check if the server is responsive with detailed feedback
export const checkServerStatus = async (): Promise<{isReady: boolean; coldStartEstimate?: number}> => {
  const startTime = Date.now();
  
  try {
    // Signal that we're checking server status
    if (progressCallback) {
      progressCallback('checking', 'Checking if analysis server is awake...', 10);
    }
    
    // Use a simple health check endpoint with a shorter timeout
    await apiClient.get('/', { timeout: 8000 });
    
    // Calculate response time
    const responseTime = Date.now() - startTime;
    
    // If response was quick, server is likely already running
    const isWarm = responseTime < 2000;
    
    if (progressCallback) {
      if (isWarm) {
        progressCallback('ready', 'Server is ready and running.', 100);
      } else {
        progressCallback('warming', 'Server is starting up but responding slowly.', 40);
      }
    }
    
    return { 
      isReady: true,
      // If response took longer than 2 seconds, estimate a cold start delay
      coldStartEstimate: isWarm ? 0 : Math.round(responseTime * 1.5 / 1000)
    };
  } catch (error) {
    console.warn('API server is in cold start mode:', error);
    
    if (progressCallback) {
      progressCallback('cold', 'Server appears to be in cold start mode. This may take up to a minute.', 20);
    }
    
    return { 
      isReady: false,
      coldStartEstimate: 45 // Estimate 45 seconds for a cold start
    };
  }
};
