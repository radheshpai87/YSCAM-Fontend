// Common interfaces for the application

// Document Analysis Result interface for API responses
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
  }> | Array<[string, number]>;
  classification?: string;
  confidence_percentage?: string;
  explanations?: string[];
  message?: string;
  highlighted_text?: {
    original_text: string;
    highlighted_terms: string[];
  };
}

/**
 * Interface for Scam Resource Item
 */
export interface ScamResource {
  id: string;
  title: string;
  description: string;
  url: string;
  category: 'article' | 'video' | 'guide' | 'tool' | 'report';
  tags: string[];
}

/**
 * Interface for Feedback Submission
 */
export interface FeedbackSubmission {
  email: string;
  subject: string;
  message: string;
  category: 'bug' | 'feature' | 'feedback' | 'other';
  analysis_id?: string;
}
