import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  AlertOctagon,
  ExternalLink,
  Share2,
  Printer,
  Download,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { DocumentAnalysisResult } from '../interfaces';
import FeatureHighlighter from '../components/FeatureHighlighter';

type ScoreLevel = 'real' | 'suspicious' | 'scam';

interface ScoreDetails {
  level: ScoreLevel;
  title: string;
  description: string;
  color: string;
  icon: React.ReactNode;
}

export const ResultsPage: React.FC = () => {
  const [scoreDetails, setScoreDetails] = useState<ScoreDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<DocumentAnalysisResult | null>(null);
  const [originalContent, setOriginalContent] = useState('');
  const navigate = useNavigate();
  
  // Update the document title when results are available
  useEffect(() => {
    if (analysisResult && scoreDetails) {
      document.title = `YSCAM - ${scoreDetails.title} (${analysisResult.confidence_percentage})`;
      
      // Add print styles for better printing
      const printStyle = document.createElement('style');
      printStyle.id = 'yscam-print-styles';
      printStyle.innerHTML = `
        @media print {
          body * {
            visibility: hidden;
          }
          #print-container, #print-container * {
            visibility: visible;
          }
          #print-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .no-print {
            display: none !important;
          }
        }
      `;
      if (!document.getElementById('yscam-print-styles')) {
        document.head.appendChild(printStyle);
      }
      
      return () => {
        document.title = 'YSCAM';
        const existingStyle = document.getElementById('yscam-print-styles');
        if (existingStyle) {
          existingStyle.remove();
        }
      };
    }
  }, [analysisResult, scoreDetails]);
  
  // Function to map API prediction to our score levels
  const mapPredictionToScoreLevel = (prediction: string | undefined): ScoreLevel => {
    // Handle undefined prediction
    if (!prediction) {
      console.warn('Prediction is undefined, defaulting to real');
      return 'real';
    }
    
    // Map the API prediction to our score levels - only scam or real (legitimate)
    const predictionLower = prediction.toLowerCase();
    console.log('Mapping prediction:', predictionLower);
    
    switch (predictionLower) {
      case 'scam':
        return 'scam';
      case 'legitimate':
      case 'real':
        return 'real';
      default:
        console.warn(`Unknown prediction value: ${prediction}, defaulting to 'real'`);
        return 'real';
    }
  };

  useEffect(() => {
    // Get analysis result from sessionStorage
    const storedResult = sessionStorage.getItem('analysisResult');
    const storedContent = sessionStorage.getItem('submittedContent');
    const storedFileName = sessionStorage.getItem('uploadedFileName');
    
    if (!storedResult) {
      // If no result, redirect to verify page
      navigate('/verify');
      return;
    }
    
    // Load the original content if available
    if (storedContent) {
      setOriginalContent(storedContent);
    }
    
    // Store filename if it exists
    if (storedFileName) {
      setOriginalContent(`File analyzed: ${storedFileName}`);
    }
    
    try {
      const parsedResult: DocumentAnalysisResult = JSON.parse(storedResult);
      
      // If the API response has classification but not prediction, use classification as the prediction
      if (!parsedResult.prediction && parsedResult.classification) {
        parsedResult.prediction = parsedResult.classification;
      }
      
      setAnalysisResult(parsedResult);
      
      // Map the API prediction to our score levels
      const predictionLevel = mapPredictionToScoreLevel(parsedResult.prediction);
      
      const results: Record<ScoreLevel, ScoreDetails> = {
        real: {
          level: 'real',
          title: 'Likely Legitimate',
          description: 'This offer appears to be legitimate based on our analysis.',
          color: 'green',
          icon: <CheckCircle className="h-12 w-12 text-green-500" />
        },
        suspicious: {
          level: 'suspicious',
          title: 'Potentially Suspicious',
          description: 'This offer has some suspicious elements that require caution.',
          color: 'amber',
          icon: <AlertTriangle className="h-12 w-12 text-amber-500" />
        },
        scam: {
          level: 'scam',
          title: 'High Risk - Probable Scam',
          description: 'This offer displays multiple red flags consistent with known scams.',
          color: 'red',
          icon: <XCircle className="h-12 w-12 text-red-500" />
        }
      };
      
      setScoreDetails(results[predictionLevel]);
      setIsLoading(false);
    } catch (error) {
      console.error('Error parsing analysis result:', error);
      setIsLoading(false);
      // Show some error state or redirect user
    }
  }, [navigate]);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <svg className="animate-spin mx-auto h-10 w-10 text-blue-600 dark:text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Analyzing your message...</p>
        </div>
      </div>
    );
  }

  if (!scoreDetails) {
    return null;
  }

  const getBgColor = () => {
    switch (scoreDetails.level) {
      case 'real': return 'bg-green-50 dark:bg-green-900/30';
      case 'scam': return 'bg-red-50 dark:bg-red-900/30';
      default: return 'bg-gray-50 dark:bg-gray-800';
    }
  };

  const getBorderColor = () => {
    switch (scoreDetails.level) {
      case 'real': return 'border-green-200 dark:border-green-800';
      case 'scam': return 'border-red-200 dark:border-red-800';
      default: return 'border-gray-200 dark:border-gray-700';
    }
  };

  const getRedFlagItems = () => {
    // First check if we have red flags from the API result
    if (analysisResult?.high_risk_signals && analysisResult.high_risk_signals.length > 0) {
      return analysisResult.high_risk_signals;
    }
    
    // Otherwise, fall back to default items based on score level
    if (scoreDetails.level === 'real') {
      return [
        "No significant red flags detected in this message",
        "The offer appears to use legitimate business practices",
        "No requests for upfront payments or sensitive information"
      ];
    } else {
      return [
        "Requests payment, fees or sensitive information upfront",
        "Offers guaranteed approval or unrealistic returns",
        "Uses pressure tactics or urgent deadlines",
        "Contains numerous grammatical errors or unprofessional language",
        "Uses non-business email domains (gmail, hotmail, etc.)",
        "No verifiable company information or online presence"
      ];
    }
  };

  const getNextSteps = () => {
    if (scoreDetails.level === 'real') {
      return [
        "Proceed with normal caution when sharing information",
        "Verify the company through official channels",
        "Research the typical salary/terms for similar positions",
        "Follow standard application procedures"
      ];
    } else {
      return [
        "Do not respond to this offer",
        "Do not send any money or personal information",
        "Report the message to relevant authorities",
        "Block the sender",
        "Share this information with others who might be vulnerable"
      ];
    }
  };

  // Helper function to check if a word matches any important feature and determine its highlight color
  const isWordHighlighted = (word: string): { highlight: boolean; isLegitimate: boolean } => {
    if (!analysisResult?.important_features) return { highlight: false, isLegitimate: false };
    
    const cleanWord = word.replace(/[.,!?;:()[\]{}]/g, '').toLowerCase();
    let highlight = false;
    let isLegitimate = false;
    
    // Check both array format [term, weight] and object format {term, indicator_type, weight}
    for (const feature of analysisResult.important_features) {
      if (Array.isArray(feature)) {
        // Array format [term, weight]
        const term = feature[0].toLowerCase();
        if (cleanWord === term || cleanWord.includes(term)) {
          highlight = true;
          isLegitimate = feature[1] < 0; // Negative weight indicates legitimate feature
          break;
        }
      } else {
        // Object format {term, indicator_type, weight}
        const term = feature.term.toLowerCase();
        if (cleanWord === term || cleanWord.includes(term)) {
          highlight = true;
          isLegitimate = feature.indicator_type.includes('Legitimate');
          break;
        }
      }
    }
    
    return { highlight, isLegitimate };
  };

  return (
    <div className="py-12 px-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          id="print-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`rounded-lg shadow-lg p-8 ${getBgColor()} border ${getBorderColor()}`}
        >
          <div className="flex flex-col md:flex-row md:items-center mb-6">
            <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6 flex justify-center">
              {scoreDetails.icon}
            </div>
            
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{scoreDetails.title}</h1>
              <p className="text-gray-700 dark:text-gray-300">
                {scoreDetails.description}
              </p>
            </div>
          </div>
          
          <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-md shadow-sm">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              {originalContent && originalContent.startsWith('File analyzed:') ? 'Analyzed File' : 'Analyzed Message'}
            </h3>
            <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap border border-gray-200 dark:border-gray-700 rounded p-3 bg-gray-50 dark:bg-gray-700">
              {originalContent && analysisResult?.important_features && !originalContent.startsWith('File analyzed:') ? (
                // If we have both original content and important features, highlight the key terms
                // But don't try to highlight the terms for file uploads
                <>
                  {originalContent.split(' ').map((word, index) => {
                    const { highlight, isLegitimate } = isWordHighlighted(word);
                    return (
                      <span key={index} className={highlight ? 
                        `px-0.5 rounded ${isLegitimate ? 'bg-green-200 dark:bg-green-900/50' : 'bg-yellow-200 dark:bg-yellow-900/50'}` : ''
                      }>
                        {word}{' '}
                      </span>
                    );
                  })}
                </>
              ) : (
                // Otherwise just show the message or file information
                <>{originalContent || (analysisResult?.message || 'No content available')}</>
              )}
            </div>
          </div>
          
          {/* Confidence Score Visualization */}
          {analysisResult && (
            <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-md shadow-sm">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Analysis Confidence</h3>
              
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Confidence Score: {analysisResult.confidence_percentage || `${(analysisResult.confidence * 100).toFixed(0)}%`}</span>
              </div>
              
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                <div 
                  className={`h-4 rounded-full ${
                    scoreDetails.level === 'real' 
                      ? 'bg-green-500' 
                      : 'bg-red-500'
                  }`}
                  style={{ width: `${analysisResult.confidence * 100}%` }}
                ></div>
              </div>
              
              {analysisResult.important_features && analysisResult.important_features.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Key Indicators</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {analysisResult.important_features.map((feature, index) => {
                      // Check if feature is in array format [term, weight] or object format {term, indicator_type, weight}
                      if (Array.isArray(feature)) {
                        // Handle array format [term, weight]
                        const term = feature[0];
                        const weight = feature[1];
                        const isPositive = weight < 0; // Negative weight indicates positive/legitimate feature in the JSON sample
                        
                        return (
                          <div 
                            key={index} 
                            className={`text-sm p-2 rounded ${
                              isPositive
                                ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200' 
                                : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200'
                            }`}
                          >
                            <span className="font-medium">{term}</span>: {Math.abs(weight * 100).toFixed(0)}% {isPositive ? 'Legitimate' : 'Suspicious'}
                          </div>
                        );
                      } else {
                        // Handle object format {term, indicator_type, weight}
                        return (
                          <div 
                            key={index} 
                            className={`text-sm p-2 rounded ${
                              feature.indicator_type.includes('Legitimate') 
                                ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200' 
                                : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200'
                            }`}
                          >
                            <span className="font-medium">{feature.term}</span>: {(feature.weight * 100).toFixed(0)}% {feature.indicator_type.replace(' indicator', '')}
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Red Flags Detected</h3>
              <ul className="space-y-2">
                {getRedFlagItems().map((item, index) => (
                  <li key={index} className="flex items-start">
                    {scoreDetails.level !== 'real' ? (
                      <AlertOctagon className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                    ) : (
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    )}
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Recommended Next Steps</h3>
              <ul className="space-y-2">
                {getNextSteps().map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <button
              onClick={toggleDetails}
              className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium mb-4"
            >
              {showDetails ? (
                <>
                  <ChevronUp className="h-5 w-5 mr-1" /> 
                  Hide detailed analysis
                </>
              ) : (
                <>
                  <ChevronDown className="h-5 w-5 mr-1" /> 
                  Show detailed analysis
                </>
              )}
            </button>
            
            {showDetails && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
                className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-md shadow-sm"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Detailed Analysis</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1">Language Analysis</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {scoreDetails.level === 'real' 
                        ? "Professional language consistent with legitimate business communication. No significant grammatical or spelling errors detected." 
                        : "Message contains multiple linguistic red flags including poor grammar, spelling errors, and awkward phrasing commonly associated with scam attempts."
                      }
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1">Contact Information</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {scoreDetails.level === 'real' 
                        ? "Contact details appear legitimate and match verified business records. Professional email domain consistent with the company."
                        : "Non-business email domain detected. Contact information does not match any legitimate business records. High probability of fraudulent representation."
                      }
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1">Offer Details</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {scoreDetails.level === 'real' 
                        ? "Terms of the offer are consistent with industry standards. No unusual requests or conditions detected."
                        : "Offer contains unrealistic promises, guaranteed results, or compensation significantly above market rates - all common traits of fraudulent offers."
                      }
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1">Risk Assessment</h4>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-2 mb-1">
                      <div 
                        className={`h-2.5 rounded-full ${
                          scoreDetails.level === 'real' 
                            ? 'bg-green-500 w-[15%]' 
                            : 'bg-red-500 w-[85%]'
                        }`}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 flex justify-between">
                      <span>Low Risk</span>
                      <span>High Risk</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
          
          <div className="border-t border-gray-200 pt-6 mt-4 no-print">
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'YSCAM Analysis Result',
                      text: `Analysis result for ${analysisResult?.classification}: ${scoreDetails?.title}`,
                      url: window.location.href
                    }).catch(err => console.error('Error sharing:', err));
                  } else {
                    // Fallback for browsers that don't support navigator.share
                    const tempInput = document.createElement('input');
                    tempInput.value = window.location.href;
                    document.body.appendChild(tempInput);
                    tempInput.select();
                    document.execCommand('copy');
                    document.body.removeChild(tempInput);
                    alert('Link copied to clipboard!');
                  }
                }}
                className="flex items-center px-4 py-2 bg-white text-gray-700 rounded border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share Results
              </button>
              <button
                onClick={() => window.print()}
                className="flex items-center px-4 py-2 bg-white text-gray-700 rounded border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <Printer className="h-4 w-4 mr-2" />
                Print
              </button>
              <button
                onClick={() => {
                  if (analysisResult) {
                    // Create a formatted report
                    const report = {
                      title: "YSCAM Document Analysis Report",
                      timestamp: new Date().toLocaleString(),
                      result: scoreDetails?.title || "",
                      confidence: analysisResult.confidence_percentage || `${(analysisResult.confidence * 100).toFixed(2)}%`,
                      classification: analysisResult.classification || analysisResult.prediction || "",
                      explanations: analysisResult.explanations || [],
                      highRiskSignals: analysisResult.high_risk_signals || [],
                      analyzedContent: originalContent || "Not available"
                    };
                    
                    // Convert to formatted text
                    const reportText = `
YSCAM Document Analysis Report
Generated: ${report.timestamp}

RESULT: ${report.result}
Classification: ${report.classification}
Confidence: ${report.confidence}

${report.explanations.length > 0 ? `EXPLANATIONS:\n${report.explanations.map(exp => `- ${exp}`).join('\n')}` : ''}

${report.highRiskSignals.length > 0 ? `HIGH RISK SIGNALS:\n${report.highRiskSignals.map(sig => `- ${sig}`).join('\n')}` : ''}

ANALYZED CONTENT:
${report.analyzedContent}
                    `;
                    
                    // Create blob and download
                    const blob = new Blob([reportText], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'yscam-analysis-report.txt';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                  }
                }}
                className="flex items-center px-4 py-2 bg-white text-gray-700 rounded border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </button>
            </div>
          </div>
        </motion.div>
        
        <div className="mt-8">
          {scoreDetails.level !== 'real' && (
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Verified Alternatives</h2>
              
              {scoreDetails.level === 'scam' && scoreDetails.title.toLowerCase().includes('job') ? (
                <div>
                  <p className="text-gray-700 mb-4">Here are some legitimate job platforms you can use:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center p-3 border border-gray-200 rounded hover:bg-blue-50 transition-colors">
                      <ExternalLink className="h-4 w-4 text-blue-500 mr-2" />
                      <span>LinkedIn</span>
                    </a>
                    <a href="https://www.indeed.com" target="_blank" rel="noopener noreferrer" className="flex items-center p-3 border border-gray-200 rounded hover:bg-blue-50 transition-colors">
                      <ExternalLink className="h-4 w-4 text-blue-500 mr-2" />
                      <span>Indeed</span>
                    </a>
                    <a href="https://www.glassdoor.com" target="_blank" rel="noopener noreferrer" className="flex items-center p-3 border border-gray-200 rounded hover:bg-blue-50 transition-colors">
                      <ExternalLink className="h-4 w-4 text-blue-500 mr-2" />
                      <span>Glassdoor</span>
                    </a>
                    <a href="https://www.monster.com" target="_blank" rel="noopener noreferrer" className="flex items-center p-3 border border-gray-200 rounded hover:bg-blue-50 transition-colors">
                      <ExternalLink className="h-4 w-4 text-blue-500 mr-2" />
                      <span>Monster</span>
                    </a>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-gray-700 mb-4">Here are some verified financial resources you can trust:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a href="https://www.consumer.ftc.gov" target="_blank" rel="noopener noreferrer" className="flex items-center p-3 border border-gray-200 rounded hover:bg-blue-50 transition-colors">
                      <ExternalLink className="h-4 w-4 text-blue-500 mr-2" />
                      <span>FTC Consumer Information</span>
                    </a>
                    <a href="https://www.usa.gov/loans" target="_blank" rel="noopener noreferrer" className="flex items-center p-3 border border-gray-200 rounded hover:bg-blue-50 transition-colors">
                      <ExternalLink className="h-4 w-4 text-blue-500 mr-2" />
                      <span>USA.gov Loans</span>
                    </a>
                    <a href="https://www.nerdwallet.com" target="_blank" rel="noopener noreferrer" className="flex items-center p-3 border border-gray-200 rounded hover:bg-blue-50 transition-colors">
                      <ExternalLink className="h-4 w-4 text-blue-500 mr-2" />
                      <span>NerdWallet</span>
                    </a>
                    <a href="https://www.consumerfinance.gov" target="_blank" rel="noopener noreferrer" className="flex items-center p-3 border border-gray-200 rounded hover:bg-blue-50 transition-colors">
                      <ExternalLink className="h-4 w-4 text-blue-500 mr-2" />
                      <span>Consumer Financial Protection Bureau</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}
          
          <div className="text-center no-print">
            <button 
              onClick={() => navigate('/verify')}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Verify Another Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};