import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook for dynamically updating document metadata based on current route
 * This improves SEO by providing route-specific meta tags
 */
const useDocumentMetadata = () => {
  const location = useLocation();

  useEffect(() => {
    // Base values
    let title = 'YSCAM - Scam Detection & Verification Platform';
    let description = 'Free AI-powered tool to instantly verify if a message or document is a scam. Protect yourself against job and loan fraud.';
    let canonicalPath = '';

    // Update metadata based on current path
    switch (location.pathname) {
      case '/':
        title = 'YSCAM - Protect Yourself from Online Scams & Fraud';
        canonicalPath = '';
        break;
      case '/verify':
        title = 'Message & Document Verification | YSCAM';
        description = 'Upload suspicious messages or documents for instant AI-powered scam analysis. Get detailed results and safety recommendations.';
        canonicalPath = 'verify';
        break;
      case '/results':
        title = 'Analysis Results | YSCAM';
        description = 'Detailed scam analysis results with risk assessment, key indicators, and recommended actions.';
        canonicalPath = 'results';
        break;
      case '/resources':
        title = 'Scam Prevention Resources | YSCAM';
        description = 'Educational resources and guides to help you identify and avoid common online scams and protect yourself.';
        canonicalPath = 'resources';
        break;
      case '/feedback':
        title = 'Provide Feedback | YSCAM';
        description = 'Help us improve our scam detection platform by sharing your experience and suggestions.';
        canonicalPath = 'feedback';
        break;
      default:
        canonicalPath = location.pathname.replace(/^\//, '');
        break;
    }

    // Update document title
    document.title = title;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    // Update canonical URL
    let canonicalUrl = document.querySelector('link[rel="canonical"]');
    if (canonicalUrl) {
      canonicalUrl.setAttribute('href', `https://yscam-fontend.vercel.app/${canonicalPath}`);
    }

    // Update Open Graph and Twitter meta tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogUrl = document.querySelector('meta[property="og:url"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    const twitterUrl = document.querySelector('meta[name="twitter:url"]');
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');

    if (ogTitle) ogTitle.setAttribute('content', title);
    if (ogUrl) ogUrl.setAttribute('content', `https://yscam-fontend.vercel.app/${canonicalPath}`);
    if (ogDescription) ogDescription.setAttribute('content', description);
    if (twitterTitle) twitterTitle.setAttribute('content', title);
    if (twitterUrl) twitterUrl.setAttribute('content', `https://yscam-fontend.vercel.app/${canonicalPath}`);
    if (twitterDescription) twitterDescription.setAttribute('content', description);

  }, [location.pathname]);
};

export default useDocumentMetadata;
