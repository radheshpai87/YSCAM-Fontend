// API Services for document and text analysis
import axios from 'axios';
import { DocumentAnalysisResult } from '../interfaces';

// Connect to the real ML model API using environment variables if available
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://yscam-api.onrender.com';

// Axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000, // 15 seconds timeout
  headers: {
    'Content-Type': 'application/json'
  }
});

// Error handler helper
const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    // Handle Axios errors
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return error.response.data?.message || `Error ${error.response.status}: ${error.response.statusText}`;
    } else if (error.request) {
      // The request was made but no response was received
      return 'No response received from server. Please check your internet connection.';
    } else {
      // Something happened in setting up the request
      return `Error setting up request: ${error.message}`;
    }
  }
  // Handle non-Axios errors
  return error instanceof Error ? error.message : 'Unknown error occurred';
};

// Text analysis API
export const analyzeText = async (message: string): Promise<DocumentAnalysisResult> => {
  try {
    const response = await apiClient.post('/detect', { message });
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

// Document analysis API
export const analyzeDocument = async (file: File): Promise<DocumentAnalysisResult> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await apiClient.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// API to get scam examples
export const getScamExamples = async (): Promise<any[]> => {
  try {
    const response = await apiClient.get('/examples');
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};
