import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  AlertTriangle, 
  Search, 
  FileText, 
  Video, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink,
  Shield,
  Banknote,
  Briefcase,
  Lock,
  Smartphone,
  Globe,
  ClipboardCheck,
  UserCheck,
  BarChart2,
  HelpCircle
} from 'lucide-react';

type ResourceCategory = 'all' | 'articles' | 'videos' | 'tools' | 'support';

interface Resource {
  id: number;
  title: string;
  description: string;
  category: 'articles' | 'videos' | 'tools' | 'support';
  icon: React.ReactNode;
  link: string;
  tags: string[];
  featured?: boolean;
}

export const ResourcesPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ResourceCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQs, setExpandedFAQs] = useState<number[]>([]);

  const resources: Resource[] = [
    {
      id: 1,
      title: "How to Identify Common Job Scams",
      description: "Learn the warning signs of fraudulent job postings and how to verify legitimate opportunities.",
      category: "articles",
      icon: <FileText className="h-6 w-6" />,
      link: "https://consumer.ftc.gov/articles/job-scams",
      tags: ["job scams", "employment", "verification"],
      featured: true
    },
    {
      id: 2,
      title: "Recognizing Predatory Loan Offers",
      description: "Tips to identify and avoid high-interest, predatory loan schemes targeting vulnerable individuals.",
      category: "articles",
      icon: <FileText className="h-6 w-6" />,
      link: "https://www.consumerfinance.gov/ask-cfpb/what-are-some-common-types-of-scams-en-2092/",
      tags: ["loans", "predatory lending", "financial"],
      featured: true
    },
    {
      id: 3,
      title: "Red Flags in Remote Job Scams",
      description: "A visual guide to spotting the warning signs in work-from-home and remote job opportunities.",
      category: "videos",
      icon: <Video className="h-6 w-6" />,
      link: "https://www.factsuite.com/blog/unmasking-the-underworld-of-fake-job-scams-in-india",
      tags: ["remote work", "video guide", "job scams"]
    },
    {
      id: 4,
      title: "Company Verification Tool",
      description: "Use this tool to verify if a company is registered and legitimate before accepting job offers.",
      category: "tools",
      icon: <Search className="h-6 w-6" />,
      link: "https://www.equifax.com/business/product/business-verification-solution/",
      tags: ["company verification", "background check", "tools"]
    },
    {
      id: 5,
      title: "Report a Scam to Authorities",
      description: "Connect with authorities to report scams and help protect others from similar schemes.",
      category: "support",
      icon: <AlertTriangle className="h-6 w-6" />,
      link: "https://cybercrime.gov.in/",
      tags: ["reporting", "assistance", "protection"]
    },
    {
      id: 6,
      title: "Protecting Your Personal Information",
      description: "Learn how to safeguard your personal and financial information when applying for jobs or loans.",
      category: "videos",
      icon: <Video className="h-6 w-6" />,
      link: "https://www.youtube.com/watch?v=6M8CMOq8VPo",
      tags: ["personal information", "security", "protection"]
    },
    {
      id: 7,
      title: "Loan Interest Rate Calculator",
      description: "Calculate and compare interest rates to identify potentially predatory loan offers.",
      category: "tools",
      icon: <Search className="h-6 w-6" />,
      link: "https://www.rbi.org.in/scripts/BS_ViewMasCirculardetails.aspx?id=11882",
      tags: ["calculator", "interest rates", "loans"]
    },
    {
      id: 8,
      title: "Financial Assistance Programs",
      description: "Find legitimate financial support programs and resources for various needs.",
      category: "support",
      icon: <Banknote className="h-6 w-6" />,
      link: "https://www.india.gov.in/spotlight/standup-india-scheme-women-and-scst-entrepreneurs",
      tags: ["financial aid", "government schemes", "support"]
    },
    {
      id: 9,
      title: "Online Safety Guide",
      description: "Comprehensive guide to staying safe while searching for jobs or financial help online.",
      category: "articles",
      icon: <Lock className="h-6 w-6" />,
      link: "https://www.cert-in.org.in/",
      tags: ["cyber safety", "online security", "privacy"]
    },
    {
      id: 10,
      title: "Mobile App Security Tips",
      description: "How to protect yourself when using job search or loan apps on your smartphone.",
      category: "videos",
      icon: <Smartphone className="h-6 w-6" />,
      link: "https://www.youtube.com/watch?v=UnU5Dikdr2U",
      tags: ["mobile security", "app safety", "digital literacy"]
    },
    {
      id: 11,
      title: "International Job Scams",
      description: "How to identify and avoid fraudulent overseas job offers and visa scams.",
      category: "articles",
      icon: <Globe className="h-6 w-6" />,
      link: "https://www.mea.gov.in/",
      tags: ["foreign jobs", "visa scams", "international"]
    },
    {
      id: 12,
      title: "Background Check Guide",
      description: "Step-by-step instructions for verifying employers and recruiters.",
      category: "tools",
      icon: <ClipboardCheck className="h-6 w-6" />,
      link: "https://www.nsd.gov.in/",
      tags: ["verification", "employer check", "due diligence"]
    },
    {
      id: 13,
      title: "Interview Red Flags",
      description: "Warning signs that a job interview might be part of a scam operation.",
      category: "articles",
      icon: <UserCheck className="h-6 w-6" />,
      link: "https://www.naukri.com/blog/job-scams-in-india-how-to-identify-fake-job-offers/",
      tags: ["interview tips", "scam signs", "recruitment"]
    },
    {
      id: 14,
      title: "Financial Literacy Resources",
      description: "Educational materials to improve your understanding of loans and financial products.",
      category: "articles",
      icon: <BarChart2 className="h-6 w-6" />,
      link: "https://www.rbi.org.in/scripts/FS_FinancialLiteracy.aspx",
      tags: ["financial education", "literacy", "banking"]
    },
    {
      id: 15,
      title: "Scam Victim Support",
      description: "Counseling and support services for those who have fallen victim to scams.",
      category: "support",
      icon: <HelpCircle className="h-6 w-6" />,
      link: "https://www.consumerhelpline.gov.in/",
      tags: ["victim support", "counseling", "recovery"]
    }
  ];

  const faqs = [
    {
      id: 1,
      question: "What are the most common types of job scams?",
      answer: "The most common job scams include work-from-home schemes requiring upfront payments, fake recruiters asking for personal information, reshipping scams, and fake job listings on legitimate job boards. These scams often promise high pay for minimal work, require payment for training or equipment, and request sensitive personal information early in the process."
    },
    {
      id: 2,
      question: "How can I verify if a loan offer is legitimate?",
      answer: "To verify a loan offer's legitimacy, check if the lender is registered with appropriate financial authorities, look for realistic interest rates and terms, verify the lender has a physical address and professional website, check for reviews from multiple sources, and be wary of lenders who guarantee approval without credit checks or who pressure you to act immediately."
    },
    {
      id: 3,
      question: "What should I do if I've already responded to a scam?",
      answer: "If you've responded to a scam, immediately stop all communication with the scammer. If you've shared financial information, contact your bank or credit card company to freeze accounts or place fraud alerts. Change passwords for any compromised accounts. Report the scam to authorities like the FTC or local law enforcement. Monitor your credit report for unusual activity and consider placing a credit freeze."
    },
    {
      id: 4,
      question: "Are there legitimate work-from-home job opportunities?",
      answer: "Yes, there are many legitimate work-from-home opportunities. Look for established companies with verifiable information, detailed job descriptions with specific requirements, professional application processes, and no upfront fees. Legitimate remote positions often come through established job boards, company websites, or professional networking. Research the company thoroughly and be cautious of opportunities that seem too good to be true."
    },
    {
      id: 5,
      question: "How can I protect my personal information during a job search?",
      answer: "Protect your personal information by researching companies before applying, using reputable job boards, never providing financial information in initial applications, creating a separate email for job searching, limiting personal details on public resumes, being cautious with social security numbers until you've verified the employer, and using secure, private connections when submitting applications online."
    },
    {
      id: 6,
      question: "What government resources are available for scam victims?",
      answer: "Government resources include the National Cyber Crime Reporting Portal (cybercrime.gov.in), the Consumer Helpline (consumerhelpline.gov.in), and the Reserve Bank of India's grievance redressal system. These platforms allow you to report scams, seek assistance, and access educational resources about fraud prevention."
    }
  ];

  const toggleFAQ = (id: number) => {
    setExpandedFAQs(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };

  const filteredResources = resources.filter(resource => {
    // Filter by category
    if (activeCategory !== 'all' && resource.category !== activeCategory) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        resource.title.toLowerCase().includes(query) ||
        resource.description.toLowerCase().includes(query) ||
        resource.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    return true;
  });

  const featuredResources = resources.filter(resource => resource.featured);
  const nonFeaturedResources = filteredResources.filter(resource => !resource.featured);

  const categoryIcons = {
    all: <BookOpen className="h-5 w-5" />,
    articles: <FileText className="h-5 w-5" />,
    videos: <Video className="h-5 w-5" />,
    tools: <Search className="h-5 w-5" />,
    support: <Shield className="h-5 w-5" />
  };

  const categoryColors = {
    articles: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300',
    videos: 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300',
    tools: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300',
    support: 'bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-300'
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h1 
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Fraud Prevention Resources
          </motion.h1>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Comprehensive collection of guides, tools, and support to help you recognize and avoid scams while searching for jobs or financial assistance.
          </motion.p>
        </div>
        
        {/* Search and Filter Section */}
        <div className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Search resources by title, description, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400"
              />
            </div>
            <div className="flex overflow-x-auto pb-2 scrollbar-hide">
              <div className="flex space-x-2">
                {(['all', 'articles', 'videos', 'tools', 'support'] as ResourceCategory[]).map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-lg flex items-center whitespace-nowrap transition-colors ${
                      activeCategory === category
                        ? 'bg-blue-600 dark:bg-blue-700 text-white shadow-md'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {categoryIcons[category]}
                    <span className="ml-2 capitalize">{category}</span>
                    {activeCategory === category && (
                      <span className="ml-2 text-xs bg-white/20 px-2 py-0.5 rounded-full">
                        {category === 'all' 
                          ? resources.length 
                          : resources.filter(r => r.category === category).length}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Featured Resources */}
        {activeCategory === 'all' && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <Briefcase className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" />
              Featured Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredResources.map((resource) => (
                <motion.a
                  key={resource.id}
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700 overflow-hidden"
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-6">
                    <div className="flex items-start">
                      <div className={`rounded-lg p-3 mr-4 flex-shrink-0 ${categoryColors[resource.category]}`}>
                        {resource.icon}
                      </div>
                      <div>
                        <div className="flex justify-between items-start">
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${categoryColors[resource.category]}`}>
                            {resource.category}
                          </span>
                          <ExternalLink className="h-4 w-4 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-2 mb-2">{resource.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{resource.description}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {resource.tags.map((tag, index) => (
                            <span 
                              key={index} 
                              className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        )}
        
        {/* All Resources */}
        {filteredResources.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <AlertTriangle className="h-12 w-12 text-amber-500 dark:text-amber-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No Resources Found</h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
              Try adjusting your search query or filter criteria. Need help finding something? <a href="#faq" className="text-blue-600 dark:text-blue-400 hover:underline">Check our FAQs</a>.
            </p>
          </div>
        ) : (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {activeCategory === 'all' ? 'All Resources' : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Resources`}
              <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                ({nonFeaturedResources.length} {nonFeaturedResources.length === 1 ? 'item' : 'items'})
              </span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nonFeaturedResources.map((resource) => (
                <motion.a
                  key={resource.id}
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700 overflow-hidden"
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <div className={`rounded-full p-2 ${categoryColors[resource.category]}`}>
                        {resource.icon}
                      </div>
                      <ExternalLink className="h-4 w-4 text-gray-400 mt-1" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{resource.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{resource.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {resource.tags.slice(0, 3).map((tag, index) => (
                        <span 
                          key={index} 
                          className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      {resource.tags.length > 3 && (
                        <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full">
                          +{resource.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        )}
        
        {/* FAQ Section */}
        <div id="faq" className="my-12 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-8 border border-blue-100 dark:border-blue-900/30">
          <div className="flex items-center mb-6">
            <HelpCircle className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-3">
            {faqs.map((faq) => (
              <motion.div 
                key={faq.id} 
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                whileHover={{ scale: 1.005 }}
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="flex justify-between items-center w-full p-5 text-left focus:outline-none hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="font-medium text-gray-900 dark:text-white">{faq.question}</span>
                  {expandedFAQs.includes(faq.id) ? (
                    <ChevronUp className="h-5 w-5 text-blue-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                
                {expandedFAQs.includes(faq.id) && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-5 pb-5 text-gray-600 dark:text-gray-300"
                  >
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* External Resources Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-8 mb-12">
          <div className="flex items-center mb-6">
            <Globe className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Trusted External Resources</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-3xl">
            These government and nonprofit organizations provide authoritative information about recognizing and reporting scams, along with legitimate job and financial resources.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Ministry of External Affairs (MEA) Advisory",
                description: "Official advisories on international job scams and authorized agents",
                link: "https://economictimes.indiatimes.com/wealth/save/fake-job-offers-in-india-or-abroad-how-to-spot-a-fraudulent-job-offer-know-the-full-list-of-authorised-agents-for-foreign-jobs/articleshow/110567268.cms?from=mdr",
                icon: <Shield className="h-5 w-5" />
              },
              {
                title: "Reserve Bank of India - Financial Literacy",
                description: "Educational resources on financial products and scam prevention",
                link: "https://www.rbi.org.in/scripts/FS_FinancialLiteracy.aspx",
                icon: <Banknote className="h-5 w-5" />
              },
              {
                title: "National Cyber Crime Reporting Portal",
                description: "Government portal to report cyber crimes including job and loan scams",
                link: "https://cybercrime.gov.in/",
                icon: <AlertTriangle className="h-5 w-5" />
              },
              {
                title: "Consumer Helpline (Govt. of India)",
                description: "Official platform for consumer complaints and assistance",
                link: "https://www.consumerhelpline.gov.in/",
                icon: <HelpCircle className="h-5 w-5" />
              },
              {
                title: "Stand Up India Scheme",
                description: "Legitimate financial support for entrepreneurs from SC/ST and women",
                link: "https://www.india.gov.in/spotlight/standup-india-scheme-women-and-scst-entrepreneurs",
                icon: <Briefcase className="h-5 w-5" />
              },
              {
                title: "Indian Computer Emergency Response Team",
                description: "Cybersecurity best practices and online safety resources",
                link: "https://www.cert-in.org.in/",
                icon: <Lock className="h-5 w-5" />
              }
            ].map((resource, index) => (
              <motion.a
                key={index}
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors group"
                whileHover={{ x: 5 }}
              >
                <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg mr-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                  {resource.icon}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {resource.title}
                    <ExternalLink className="h-4 w-4 inline ml-1 text-gray-400" />
                  </h3>
                  <p className="text-sm text-gray-600">{resource.description}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="bg-blue-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Need Immediate Assistance?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            If you believe you've been targeted by a scam or need help verifying an opportunity, contact the National Cyber Crime Helpline.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="https://cybercrime.gov.in/" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
            >
              <AlertTriangle className="h-5 w-5 mr-2" />
              Report a Scam
            </a>
            <a 
              href="tel:1930" 
              className="px-6 py-3 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 transition-colors flex items-center justify-center"
            >
              <Smartphone className="h-5 w-5 mr-2" />
              Call Helpline: 1930
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};