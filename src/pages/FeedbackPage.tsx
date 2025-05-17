import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown,
  Smile,
  Frown,
  Meh,
  Send,
  CheckCircle,
  Star,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  HeartHandshake,
  Shield,
  Lightbulb,
  User
} from 'lucide-react';

type Rating = 1 | 2 | 3 | 4 | 5;
type FeedbackCategory = 'general' | 'accuracy' | 'usability' | 'resources' | 'suggestions';

interface FeedbackForm {
  category: FeedbackCategory;
  rating: Rating | null;
  message: string;
  email: string;
  wouldRecommend: boolean | null;
  name: string;
}

const categoryDetails = {
  general: {
    icon: <MessageSquare className="h-5 w-5" />,
    label: "General Feedback",
    description: "Share your overall experience with YSCAM"
  },
  accuracy: {
    icon: <Shield className="h-5 w-5" />,
    label: "Verification Accuracy",
    description: "How accurate were our scam detection results?"
  },
  usability: {
    icon: <User className="h-5 w-5" />,
    label: "Website Usability",
    description: "Feedback about the website interface and navigation"
  },
  resources: {
    icon: <Lightbulb className="h-5 w-5" />,
    label: "Educational Resources",
    description: "Thoughts on our learning materials and guides"
  },
  suggestions: {
    icon: <HeartHandshake className="h-5 w-5" />,
    label: "Feature Suggestions",
    description: "Ideas for new features or improvements"
  }
};

export const FeedbackPage: React.FC = () => {
  const [form, setForm] = useState<FeedbackForm>({
    category: 'general',
    rating: null,
    message: '',
    email: '',
    wouldRecommend: null,
    name: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [showCategoryDetails, setShowCategoryDetails] = useState(false);
  
  const handleRatingChange = (rating: Rating) => {
    setForm(prev => ({ ...prev, rating }));
    setError('');
  };
  
  const handleCategoryChange = (category: FeedbackCategory) => {
    setForm(prev => ({ ...prev, category }));
    setError('');
  };
  
  const handleRecommendChange = (value: boolean) => {
    setForm(prev => ({ ...prev, wouldRecommend: value }));
    setError('');
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = [];
    if (!form.message.trim()) validationErrors.push('Please provide feedback in the message field');
    if (!form.rating) validationErrors.push('Please select a rating');
    if (form.wouldRecommend === null) validationErrors.push('Please indicate if you would recommend YSCAM');
    
    if (validationErrors.length > 0) {
      setError(validationErrors.join(', '));
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    setError('');
    setIsSubmitting(true);
    
    // Prepare the data to be sent to Formspree
    const formData = {
      name: form.name,
      email: form.email,
      category: categoryDetails[form.category].label,
      rating: form.rating,
      message: form.message,
      wouldRecommend: form.wouldRecommend ? 'Yes' : 'No',
      _subject: `YSCAM Feedback: ${categoryDetails[form.category].label}`,
      _honeypot: "" // Spam filter
    };
    
    try {
      console.log('Submitting feedback to Formspree...');
      
      // Send the form data to Formspree using the actual form ID
      const response = await fetch('https://formspree.io/f/mldbzevp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData),
      });
      
      const responseData = await response.json();
      
      if (response.ok) {
        console.log('Feedback submitted successfully:', responseData);
        setIsSubmitting(false);
        setIsSubmitted(true);
        
        // Reset form after successful submission
        setForm({
          category: 'general',
          rating: null,
          message: '',
          email: '',
          wouldRecommend: null,
          name: ''
        });
      } else {
        const errorMessage = responseData.error || 'Failed to submit feedback';
        throw new Error(errorMessage);
      }
    } catch (err) {
      console.error('Error submitting feedback:', err);
      setError(`Failed to submit feedback: ${err instanceof Error ? err.message : 'Please try again later.'}`);
      setIsSubmitting(false);
      
      // Scroll to top to show error message
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const getRatingIcon = (rating: Rating) => {
    if (rating <= 2) return <Frown className="h-6 w-6" />;
    if (rating === 3) return <Meh className="h-6 w-6" />;
    return <Smile className="h-6 w-6" />;
  };
  
  const getRatingColor = (rating: Rating, selected: boolean) => {
    if (!selected) return 'text-gray-400';
    
    if (rating <= 2) return 'text-red-500';
    if (rating === 3) return 'text-amber-500';
    return 'text-green-500';
  };

  if (isSubmitted) {
    return (
      <div className="py-16 px-4 min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center border border-gray-100 dark:border-gray-700"
        >
          <div className="rounded-full bg-green-100 p-4 mx-auto w-fit mb-6">
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Thank You For Your Feedback!</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Your input helps us improve YSCAM to better protect everyone from scams. We appreciate you taking the time to share your thoughts.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setIsSubmitted(false)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Submit Another Response
            </button>
            <a
              href="/resources"
              className="px-6 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors flex items-center"
            >
              <Lightbulb className="h-4 w-4 mr-2" />
              Explore Resources
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-2xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-700"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mb-4">
              <MessageSquare className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Help Us Improve YSCAM</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Your feedback directly shapes our efforts to combat scams and protect users.
            </p>
          </div>
          
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg flex items-start"
              >
                <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-red-800 dark:text-red-300 mb-1">Please complete all required fields</h3>
                  <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <form onSubmit={handleSubmit} action="https://formspree.io/f/xxyyzzww" method="POST">
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Name (Optional)
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder="Enter your name"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address (Optional)
              </label>
              <input
                type="email"
                name="_replyto" 
                id="email"
                value={form.email}
                onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder="your@email.com"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                We'll only use this to follow up on your feedback if needed.
              </p>
            </div>
            
            {/* Hidden fields for Formspree */}
            <input type="hidden" name="_subject" value={`YSCAM Feedback: ${categoryDetails[form.category].label}`} />
            <input type="hidden" name="category" value={categoryDetails[form.category].label} />
            <input type="hidden" name="rating" value={form.rating?.toString() || ''} />
            <input type="hidden" name="wouldRecommend" value={form.wouldRecommend === null ? '' : form.wouldRecommend ? 'Yes' : 'No'} />
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Feedback Category
                </label>
                <button
                  type="button"
                  onClick={() => setShowCategoryDetails(!showCategoryDetails)}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center"
                >
                  {showCategoryDetails ? 'Hide details' : 'Show details'}
                  {showCategoryDetails ? (
                    <ChevronUp className="h-4 w-4 ml-1" />
                  ) : (
                    <ChevronDown className="h-4 w-4 ml-1" />
                  )}
                </button>
              </div>
              
              <AnimatePresence>
                {showCategoryDetails && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-3"
                  >
                    {Object.entries(categoryDetails).map(([key, { icon, label, description }]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => handleCategoryChange(key as FeedbackCategory)}
                        className={`text-left p-3 rounded-lg border transition-colors ${
                          form.category === key
                            ? 'border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/30'
                            : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        <div className="flex items-start">
                          <div className={`p-2 rounded-lg mr-3 ${
                            form.category === key ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                          }`}>
                            {icon}
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">{label}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div className="flex items-center p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                <div className="p-2 rounded-lg mr-3 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                  {categoryDetails[form.category].icon}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{categoryDetails[form.category].label}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{categoryDetails[form.category].description}</p>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                How would you rate your experience? <span className="text-red-500 dark:text-red-400">*</span>
              </p>
              <div className="flex justify-between">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => handleRatingChange(rating as Rating)}
                    className={`flex flex-col items-center p-2 rounded-lg transition-all ${
                      form.rating === rating ? 'bg-blue-50 dark:bg-blue-900/30 scale-105' : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className={`text-2xl font-bold mb-1 ${
                      getRatingColor(rating as Rating, form.rating === rating)
                    }`}>
                      {rating}
                    </span>
                    <span className={getRatingColor(rating as Rating, form.rating === rating)}>
                      {getRatingIcon(rating as Rating)}
                    </span>
                    {form.rating === rating && (
                      <span className="text-xs text-blue-600 dark:text-blue-400 mt-1">Selected</span>
                    )}
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1 px-2">
                <span>Very Poor</span>
                <span>Excellent</span>
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Feedback <span className="text-red-500 dark:text-red-400">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={form.message}
                onChange={(e) => setForm(prev => ({ ...prev, message: e.target.value }))}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder="Please share your thoughts, suggestions, or concerns..."
              ></textarea>
            </div>
            
            <div className="mb-8">
              <p className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Would you recommend YSCAM to others? <span className="text-red-500 dark:text-red-400">*</span>
              </p>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => handleRecommendChange(true)}
                  className={`flex-1 flex items-center justify-center px-4 py-3 rounded-lg border transition-all ${
                    form.wouldRecommend === true
                      ? 'bg-green-50 dark:bg-green-900/30 border-green-300 dark:border-green-700 text-green-700 dark:text-green-400 scale-[1.02]'
                      : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <ThumbsUp className={`h-5 w-5 mr-2 ${
                    form.wouldRecommend === true ? 'text-green-500' : 'text-gray-500'
                  }`} />
                  <span className="font-medium">Yes</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleRecommendChange(false)}
                  className={`flex-1 flex items-center justify-center px-4 py-3 rounded-lg border transition-all ${
                    form.wouldRecommend === false
                      ? 'bg-red-50 dark:bg-red-900/30 border-red-300 dark:border-red-700 text-red-700 dark:text-red-400 scale-[1.02]'
                      : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <ThumbsDown className={`h-5 w-5 mr-2 ${
                    form.wouldRecommend === false ? 'text-red-500' : 'text-gray-500'
                  }`} />
                  <span className="font-medium">No</span>
                </button>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-3 rounded-lg font-medium text-white ${
                  isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                } transition-colors inline-flex items-center justify-center`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2" />
                    Submit Feedback
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200"
        >
          <div className="flex items-start">
            <div className="bg-blue-100 p-2 rounded-lg mr-4 flex-shrink-0">
              <Star className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">How We Use Your Feedback</h3>
              <p className="text-gray-600 text-sm mb-3">
                Your honest opinions help us prioritize improvements and develop new features to better serve our community.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Improve scam detection accuracy</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Enhance user experience and interface</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Develop new educational resources</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Identify and fix issues faster</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};