/**
 * Utility to "wake up" the Render API service from cold start
 * 
 * This script makes a simple ping to the API server which triggers
 * Render to wake up the service before the user needs to use it.
 */

import axios from 'axios';

// API URL from environment, same as in api.ts
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://yscam-api.onrender.com';

/**
 * Status information about the API service
 */
export interface APIStatus {
  isAwake: boolean;
  responseTimeMs: number;
  message: string;
}

/**
 * Attempts to wake up the Render service to minimize cold start latency for users
 * @param callback Optional callback for progress updates
 * @returns Promise with API status information
 */
export async function wakeupRenderService(
  callback?: (status: string, progress: number) => void
): Promise<APIStatus> {
  try {
    if (callback) callback('Attempting to wake up API service...', 10);
    
    const startTime = Date.now();
    
    // Make a simple request to wake up the service
    await axios.get(`${API_BASE_URL}/`, { 
      timeout: 20000 // 20 seconds
    });
    
    const responseTime = Date.now() - startTime;
    
    if (callback) callback('API service is now awake!', 100);
    
    return {
      isAwake: true,
      responseTimeMs: responseTime,
      message: responseTime < 2000 
        ? 'API is awake and responding quickly.'
        : 'API is now awake but was in cold start mode. It should respond faster for subsequent requests.'
    };
  } catch {
    if (callback) callback('Failed to wake up API service', 0);
    
    return {
      isAwake: false,
      responseTimeMs: -1,
      message: 'Unable to wake up the API service. It may be temporarily unavailable.'
    };
  }
}

/**
 * Checks if the API service is currently awake without attempting to wake it
 */
export async function checkApiStatus(): Promise<APIStatus> {
  try {
    const startTime = Date.now();
    
    // Simple HEAD request to check status without waking it up fully
    await axios.head(`${API_BASE_URL}/`, { 
      timeout: 5000 // Short timeout for quick status check
    });
    
    const responseTime = Date.now() - startTime;
    
    return {
      isAwake: true,
      responseTimeMs: responseTime,
      message: responseTime < 500 
        ? 'API is awake and fully operational.'
        : 'API is operational but may be in warm-up mode.'
    };
  } catch {
    return {
      isAwake: false,
      responseTimeMs: -1,
      message: 'API appears to be in cold start mode or unavailable.'
    };
  }
}
