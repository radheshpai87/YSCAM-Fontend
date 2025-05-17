// Mock API Server for development and testing
import { createServer, Model } from "miragejs";

export function setupMockServer() {
  return createServer({
    models: {
      analysis: Model,
    },

    routes() {
      this.namespace = "api";
      this.timing = 1000; // Add a 1s delay to simulate network latency

      // Text analysis endpoint - handles both text and base64 content
      this.post("/detect", (_, request) => {
        const attrs = JSON.parse(request.requestBody);
        
        // Handle both text message and file_content (base64)
        let message = '';
        
        if (attrs.message) {
          message = attrs.message;
        } else if (attrs.file_content) {
          // This would handle base64 encoded file content
          message = "Document content extracted for analysis...";
        }
        
        const lowerMessage = message.toLowerCase();
        
        // Pattern-based classification logic to simulate ML model behavior
        let classification = "legitimate";
        let confidence = 0.65;
        let confidence_percentage = "65.00%";
        
        // Check for common scam patterns
        if (
          lowerMessage.includes('payment') && lowerMessage.includes('registration') ||
          lowerMessage.includes('fee') && lowerMessage.includes('card') ||
          lowerMessage.includes('upfront payment') ||
          lowerMessage.includes('pay') && lowerMessage.includes('fee') ||
          lowerMessage.includes('bank details') || 
          lowerMessage.includes('urgent transfer') || 
          lowerMessage.includes('money') && lowerMessage.includes('transfer') ||
          // Adding patterns from the previous "suspicious" category to the scam category
          (lowerMessage.includes('fee') && lowerMessage.length < 100) || 
          (lowerMessage.includes('payment') && lowerMessage.includes('urgent')) ||
          (lowerMessage.includes('password') && lowerMessage.includes('send')) ||
          (lowerMessage.includes('account') && lowerMessage.includes('verification'))
        ) {
          classification = "scam";
          confidence = 0.85;
          confidence_percentage = "85.00%";
        }
        
        // Special case for the example in documentation
        if (lowerMessage.includes('amazon') && lowerMessage.includes('registration') && lowerMessage.includes('id card')) {
          classification = "scam";
          confidence = 0.85;
          confidence_percentage = "85.00%";
        }
        
        // Pattern detection logic for scam identification
        const hasRegistrationFee = 
          lowerMessage.includes('registration fee') || 
          lowerMessage.includes('pay for registration') ||
          (lowerMessage.includes('pay') && lowerMessage.includes('registration'));
        
        const hasCardPayment = 
          lowerMessage.includes('card') && 
          (lowerMessage.includes('payment') || lowerMessage.includes('pay') || lowerMessage.includes('fee'));
        
        // Legitimate indicators
        const hasHiring = lowerMessage.includes('hiring');
        const hasId = lowerMessage.includes('id');
        const hasPay = lowerMessage.includes('pay');
         
        // Determine high risk signals
        const high_risk_signals = [
          "Job offers requiring payment for registration, assessment, or application are almost always scams",
          "Requesting specific payment amounts in job or loan messages is a red flag"
        ];
        
        // Determine explanations
        const explanations = [
          `This message was classified as a scam primarily because it contains suspicious terms like: ${hasCardPayment ? 'card' : ''} ${hasRegistrationFee ? 'registration' : ''}`.trim(),
          "Requesting upfront payment or registration fees is a common tactic in job and loan scams."
        ];
        
        // Build important features
        const important_features = [];
        
        if (hasHiring) {
          important_features.push({
            "indicator_type": "Legitimate indicator",
            "term": "hiring",
            "weight": 0.3208340208123215
          });
        }
        
        if (hasId) {
          important_features.push({
            "indicator_type": "Legitimate indicator",
            "term": "id",
            "weight": 0.3142709352832255
          });
        }
        
        if (hasCardPayment) {
          important_features.push({
            "indicator_type": "Scam indicator",
            "term": "card",
            "weight": 0.2840945404446778
          });
        }
        
        if (hasRegistrationFee) {
          important_features.push({
            "indicator_type": "Scam indicator",
            "term": "registration",
            "weight": 0.2652312738924919
          });
        }
        
        if (hasPay) {
          important_features.push({
            "indicator_type": "Legitimate indicator",
            "term": "pay",
            "weight": 0.12725082281677924
          });
        }
        
        // Enhanced response format with highlighted words and more detailed analysis
        
        // Calculate message_length if it exists
        const message_length = message.length;
        
        // Return response in the format provided in the example
        return {
          classification,
          confidence,
          confidence_percentage,
          explanations,
          high_risk_signals,
          important_features,
          message,
          message_length,
          prediction: classification, // Use classification (scam/legitimate) for prediction
          highlighted_text: {
            // This provides the message with highlighted suspicious words for UI display
            original_text: message,
            highlighted_terms: important_features.map(feature => feature.term)
          }
        };
      });
      
      // File upload analysis endpoint
      this.post("/file/upload", () => {
        // Get the actual file name from the request if possible
        let fileName = "default-file.pdf";
        
        // In a real implementation, we would extract the file name from the request
        // For this mock, we'll check if there's a filename in the session storage
        const storedFileName = sessionStorage.getItem('uploadedFileName') || '';
        if (storedFileName) {
          fileName = storedFileName.toLowerCase();
        }
        
        // Determine if the document is a scam based on file name patterns
        // This ensures consistent results for the same file
        const isScam = fileName.includes("scam") || 
                       fileName.includes("fake") || 
                       fileName.includes("fraud") ||
                       fileName.includes("suspicious") ||
                       /\d{6,}/.test(fileName); // Files with 6+ consecutive digits are often suspicious
        
        // For PDF uploads, we're using "scam" or "real" directly as classifications
        const prediction = isScam ? "scam" : "real";
        const classification = prediction; // Match classification to prediction
        const confidence = isScam ? 0.85 : 0.645; // Different confidence scores for each class
        const confidence_percentage = isScam ? "85.00%" : "64.51%";
        
        // Different features based on whether it's a scam or legitimate
        const important_features = isScam ? [
            ["payment", 0.75],
            ["transfer", 0.65],
            ["urgent", 0.55],
            ["fee", 0.45],
            ["verify", 0.35]
          ] : [
            ["offer", -0.51],
            ["required", 0.49],
            ["year", -0.25],
            ["please", -0.23],
            ["may", -0.17]
          ];
          
        // Different explanations based on classification
        const explanations = isScam ? [
          "This document was classified as a potential scam based on suspicious content patterns",
          "The document contains payment requests and urgency indicators typical of scam offers"
        ] : [
          "This document was classified as legitimate based on content patterns",
          "The document contains standard job offer language with no suspicious payment requests"
        ];
        
        // High risk signals only present for scams
        const high_risk_signals = isScam ? [
          "Document requires upfront payment before services",
          "Contains urgency language to pressure quick decisions",
          "Uses non-standard payment methods"
        ] : [];
        
        return {
          classification,
          confidence,
          confidence_percentage,
          explanations,
          high_risk_signals,
          // Format important_features as arrays of [term, weight] instead of objects
          important_features,
          message: "Document content extracted for analysis...",
          message_length: 10496,
          file_processed: "483954680-Google-Letter-offer-Nancharaiah.pdf",
          file_type: "pdf",
          document_analysis: {
            suspicious_patterns: []
          },
          prediction: prediction // Using the dynamic prediction value
        };
      });

      // Pass any unhandled requests through to the actual API server
      this.passthrough();
    },
  });
}
