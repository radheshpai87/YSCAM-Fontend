import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload, FileText, AlertCircle, Info, CheckCircle, XCircle } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { analyzeText, analyzeDocument } from '../services/api';

// Define interfaces for API response
export interface DocumentAnalysisResult {
  prediction: string;
  confidence: number;
  message_length?: number;
  high_risk_signals: string[];
  file_processed?: string;
  file_type?: string;
  document_analysis?: {
    suspicious_patterns: string[];
  };
  important_features?: Array<{
    term: string;
    indicator_type: string;
    weight: number;
  }>;
  classification?: string;
  confidence_percentage?: string;
  explanations?: string[];
  message?: string;
}

export const VerifyPage: React.FC = () => {
  const [messageText, setMessageText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<DocumentAnalysisResult | null>(null);
  const [analysisStatus, setAnalysisStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const navigate = useNavigate();

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    // Store the file for later upload when the form is submitted
    if (acceptedFiles.length > 0) {
      const uploadedFile = acceptedFiles[0];
      setFile(uploadedFile);
      setMessageText(`File selected: ${uploadedFile.name} (${(uploadedFile.size / 1024).toFixed(2)} KB)`);
      setError('');
      // Reset previous analysis results
      setAnalysisResult(null);
      setAnalysisStatus('idle');
      
      // Store the original filename for reference
      sessionStorage.setItem('uploadedFileName', uploadedFile.name);
    }
  }, []);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  // Function to perform file upload
  const uploadFileForAnalysis = async (fileToUpload: File) => {
    try {
      setAnalysisStatus('loading');
      setIsLoading(true);
      
      // Use the API service function
      const result = await analyzeDocument(fileToUpload);
      
      setAnalysisResult(result);
      setAnalysisStatus('success');
      
      // Store key information for results page
      sessionStorage.setItem('analysisResult', JSON.stringify(result));
      
      // Store the filename for display on results page
      sessionStorage.setItem('uploadedFileName', fileToUpload.name);
      
      // Navigate to results page after successful analysis
      navigate('/results');
    } catch (error) {
      console.error('Error uploading file:', error);
      setError(`Error analyzing document: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setAnalysisStatus('error');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Function to submit text content
  const submitTextContent = async (text: string) => {
    try {
      setAnalysisStatus('loading');
      setIsLoading(true);
      
      // Use the API service function
      const result = await analyzeText(text);
      
      setAnalysisResult(result);
      setAnalysisStatus('success');
      
      // Store key information for results page
      sessionStorage.setItem('analysisResult', JSON.stringify(result));
      
      // Store the original message as well for reference
      sessionStorage.setItem('submittedContent', text);
      
      // Clear any previously stored file name
      sessionStorage.removeItem('uploadedFileName');
      
      // Navigate to results page after successful analysis
      navigate('/results');
    } catch (error) {
      console.error('Error analyzing text:', error);
      setError(`Error analyzing message: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setAnalysisStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous errors and results
    setError('');
    setAnalysisResult(null);
    
    // Validate input
    if (!messageText.trim() && !file) {
      setError('Please enter a message or upload a file to verify');
      return;
    }
    
    try {
      // Clear previous analysis from session storage
      sessionStorage.removeItem('analysisResult');
      sessionStorage.removeItem('submittedContent');
      sessionStorage.removeItem('uploadedFileName');
      
      if (file) {
        // If we have a file, upload it
        await uploadFileForAnalysis(file);
      } else if (messageText.trim()) {
        // Otherwise analyze the text
        await submitTextContent(messageText);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setError(`Error during analysis: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="py-12 px-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Verify an Offer</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Paste the message you received or upload a screenshot to check if it's legitimate.
          </p>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Paste the message here
              </label>
              <textarea
                id="message"
                rows={6}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder="Paste the job offer, loan details, or any suspicious message here..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
              ></textarea>
            </div>
            
            <div className="mb-6">
              <p className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Or upload a screenshot/document
              </p>
              <div 
                {...getRootProps()} 
                className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition-colors ${
                  isDragActive ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-700'
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                {isDragActive ? (
                  <p className="text-blue-600">Drop the file here...</p>
                ) : (
                  <div>
                    <p className="text-gray-700">Drag & drop a file here, or click to select a file</p>
                    <p className="text-gray-500 text-sm mt-1">Supports images and PDF (Max: 5MB)</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-md flex items-start">
              <Info className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-700 dark:text-blue-300">
                <p className="font-medium mb-1">Your privacy matters</p>
                <p>The information you submit is analyzed securely. We do not store or share your personal data.</p>
              </div>
            </div>
            
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isLoading}
                className={`px-6 py-3 rounded-md font-medium text-white ${
                  isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                } transition-colors inline-flex items-center`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <FileText className="h-5 w-5 mr-2" />
                    Verify Now
                  </>
                )}
              </button>
            </div>
          </form>
          
          {/* Analysis Result Preview */}
          {analysisStatus === 'success' && analysisResult && (
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-md border border-gray-200 dark:border-gray-600">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Analysis Complete</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Your content has been analyzed. Redirecting to detailed results...
              </p>
              
              <div className="flex items-center mb-2">
                {analysisResult.prediction === 'scam' ? (
                  <XCircle className="h-5 w-5 text-red-500 mr-2" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                )}
                
                <span className="font-medium">
                  {analysisResult.prediction === 'scam' ? 'High Risk' : 'Low Risk'}
                </span>
                
                {analysisResult.confidence_percentage && (
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                    ({analysisResult.confidence_percentage})
                  </span>
                )}
              </div>
              
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {analysisResult.high_risk_signals && analysisResult.high_risk_signals.length > 0 && (
                  <p className="mt-2">
                    <span className="font-medium">Risk signals detected:</span> {analysisResult.high_risk_signals.slice(0, 2).join(', ')}
                    {analysisResult.high_risk_signals.length > 2 && '...'}
                  </p>
                )}
              </div>
              
              <div className="mt-4">
                <button
                  onClick={() => navigate('/results')}
                  className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  View detailed results →
                </button>
              </div>
            </div>
          )}
          
          {/* Error State */}
          {analysisStatus === 'error' && (
            <div className="mt-6 p-5 bg-red-50 dark:bg-red-900/30 rounded-md border border-red-200 dark:border-red-800 shadow-sm">
              <div className="flex items-start">
                <AlertCircle className="h-6 w-6 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-base font-medium text-red-800 dark:text-red-300">Analysis Failed</h3>
                  <p className="text-sm text-red-700 dark:text-red-200 mt-2">{error}</p>
                  <div className="mt-3">
                    <button 
                      onClick={() => {
                        setAnalysisStatus('idle');
                        setError('');
                      }}
                      className="px-3 py-1.5 text-sm bg-white dark:bg-gray-800 border border-red-300 dark:border-red-700 rounded-md text-red-700 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/50 font-medium transition-colors"
                    >
                      Try again
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">What to Verify?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-md shadow p-4 border-l-4 border-blue-500">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Job Offers</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 list-disc list-inside">
                <li>Employment emails and messages</li>
                <li>Remote work opportunities</li>
                <li>Work-from-home job listings</li>
                <li>Freelance project offers</li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-md shadow p-4 border-l-4 border-blue-500">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Loan & Financial Offers</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 list-disc list-inside">
                <li>Loan approval messages</li>
                <li>Credit offers</li>
                <li>Investment opportunities</li>
                <li>Financial assistance programs</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};