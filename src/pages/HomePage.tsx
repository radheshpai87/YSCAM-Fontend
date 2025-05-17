import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  // Shield, 
  AlertTriangle, 
  BookOpen,
  ChevronRight,
  Search,
  BarChart2,
  FileText,
  Mail,
  Smartphone,
  CreditCard,
  Lock,
  Check,
  Zap,
  Database,
  // Globe,
  Users,
  ShieldCheck,
  // BadgeCheck,
  // Clock
} from 'lucide-react';

export const HomePage: React.FC = () => {



  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
<section className="relative bg-gradient-to-br from-blue-900 to-blue-700 text-white overflow-hidden">
  {/* Enhanced background with more dynamic particles */}
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-900/80 to-blue-700/80"></div>
    
    {/* Improved floating particles with better animation */}
    {[...Array(30)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full bg-white/10 backdrop-blur-[1px]"
        initial={{ 
          opacity: 0,
          y: Math.random() * 100,
          x: Math.random() * 100,
          scale: Math.random() * 0.5 + 0.5
        }}
        animate={{ 
          opacity: [0, 0.4, 0],
          y: [0, Math.random() * 150 - 75],
          x: [0, Math.random() * 150 - 75],
          transition: {
            duration: Math.random() * 15 + 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear"
          }
        }}
        style={{
          width: `${Math.random() * 12 + 3}px`,
          height: `${Math.random() * 12 + 3}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`
        }}
      />
    ))}
    
    {/* Subtle grid overlay */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
  </div>

  {/* Same content container with enhanced hover effects */}
  <div className="container mx-auto px-6 py-32 md:py-40 relative z-10">
    <div className="max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6 hover:bg-white/15 transition-colors duration-300"
      >
        <Zap className="h-4 w-4 mr-2 animate-pulse" />
        <span className="text-sm font-medium">Real-time scam detection</span>
      </motion.div>
      
      <motion.h1 
        className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">Stop scams before</span><br />
        <span className="relative inline-block">
          <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-amber-400">they stop you</span>
          <motion.span 
            className="absolute bottom-0 left-0 w-full h-3 bg-amber-400/20 -rotate-1 -z-0"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
        </span>
      </motion.h1>
      
      <motion.p 
        className="text-xl text-blue-100 mb-10 leading-relaxed max-w-3xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        YSCAM's advanced verification platform detects fraudulent job offers, loan scams, and phishing attempts in seconds, protecting your finances and personal information.
      </motion.p>
      
      <motion.div 
        className="flex flex-col sm:flex-row justify-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Link 
          to="/verify" 
          className="px-8 py-4 bg-white dark:bg-gray-800 text-blue-900 dark:text-blue-200 rounded-xl font-semibold hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] inline-flex items-center justify-center relative overflow-hidden group"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-amber-400/10 dark:from-amber-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <AlertTriangle className="h-5 w-5 mr-2" />
          Verify an Offer Now
          <ChevronRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
        <Link 
          to="/resources" 
          className="px-8 py-4 bg-transparent border-2 border-white/50 text-white rounded-xl font-semibold hover:bg-white/10 hover:border-white transition-all duration-300 hover:shadow-lg hover:scale-[1.02] inline-flex items-center justify-center relative overflow-hidden group"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <BookOpen className="h-5 w-5 mr-2" />
          Learn Protection Strategies
        </Link>
      </motion.div>
    </div>
  </div>
  
  {/* Enhanced wave divider with animation */}
  <motion.div 
    className="absolute -bottom-1 left-0 right-0 overflow-hidden transform rotate-180"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.8 }}
  >
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 md:h-24">
      <path 
        d="M1200 0L0 0 892.25 114.72 1200 0z" 
        fill="currentColor"
        className="drop-shadow-lg text-white dark:text-gray-900"
      ></path>
    </svg>
    {/* <motion.div 
      className="absolute bottom-0 left-0 w-full h-1 bg-amber-400"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 1, delay: 1 }}
    /> */}
  </motion.div>
</section>



      {/* Trust Indicators */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center items-center gap-8 md:gap-16"
          >
            {[''].map((company, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-gray-400 dark:text-gray-500 font-medium text-lg hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                {company}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-blue-600 dark:text-blue-400 font-semibold mb-4 flex items-center justify-center"
            >
              <div className="w-4 h-0.5 bg-blue-600 dark:bg-blue-400 mr-2"></div>
              HOW IT WORKS
              <div className="w-4 h-0.5 bg-blue-600 dark:bg-blue-400 ml-2"></div>
            </motion.div>
            <motion.h2 
              className="text-4xl font-bold text-gray-900 dark:text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Fraud detection in three simple steps
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Our AI-powered system analyzes thousands of data points to protect you from scams.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Search className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
                title: "Submit Suspicious Content",
                description: "Paste the message text, upload a screenshot, or forward the email to our verification system.",
                step: "01",
                features: ["Text analysis", "Image recognition", "Email forwarding"]
              },
              {
                icon: <BarChart2 className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
                title: "Instant AI Analysis",
                description: "Our system cross-references against known scam patterns, domain reputation, and linguistic markers.",
                step: "02",
                features: ["Pattern matching", "Domain verification", "Behavioral analysis"]
              },
              {
                icon: <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
                title: "Get Detailed Report",
                description: "Receive a comprehensive risk assessment with confidence score and actionable recommendations.",
                step: "03",
                features: ["Risk score", "Detailed breakdown", "Next steps"]
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 hover:border-blue-100 dark:hover:border-blue-800 transition-all duration-300 group relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -8,
                  boxShadow: '0 20px 25px -5px rgba(59, 130, 246, 0.1)'
                }}
              >
                <div className="absolute top-0 right-0 text-8xl font-bold text-gray-50 dark:text-gray-700 z-0 group-hover:text-blue-50 dark:group-hover:text-blue-900/30 transition-colors duration-300">{item.step}</div>
                <div className="relative z-10">
                  <div className="rounded-xl bg-blue-50 dark:bg-blue-900/30 p-4 w-fit mb-6 group-hover:bg-blue-100 dark:group-hover:bg-blue-800/40 transition-colors duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    {item.description}
                  </p>
                  <ul className="space-y-2">
                    {item.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Scam Detection Features */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="text-blue-600 dark:text-blue-400 font-semibold mb-4">SCAM DETECTION</div>
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Advanced protection against evolving threats</h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  Our platform continuously learns from new scam patterns to provide up-to-the-minute protection.
                </p>
                
                <div className="space-y-6">
                  {[
                    {
                      icon: <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
                      title: "Email Analysis",
                      description: "Detect phishing attempts and spoofed sender addresses",
                      features: ["Domain verification", "Header analysis", "Link scanning"]
                    },
                    {
                      icon: <Smartphone className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
                      title: "Job Offer Verification",
                      description: "Validate company information and employment terms",
                      features: ["Company registration", "Salary benchmarking", "Contract review"]
                    },
                    {
                      icon: <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
                      title: "Loan Scam Detection",
                      description: "Identify fraudulent lending practices and advance-fee scams",
                      features: ["Lender verification", "Fee structure analysis", "Regulatory checks"]
                    },
                    {
                      icon: <Lock className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
                      title: "Data Protection",
                      description: "Never stores your personal information or documents",
                      features: ["End-to-end encryption", "Automatic deletion", "Zero data retention"]
                    }
                  ].map((feature, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 dark:border-gray-700"
                    >
                      <div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded-lg mr-4">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{feature.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-2">{feature.description}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {feature.features.map((f, i) => (
                            <span key={i} className="text-xs bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
            
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 p-1 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700"
              >
                <div className="bg-gray-900 rounded-xl overflow-hidden">
                  <div className="p-4 bg-gray-800 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div className="text-gray-400 text-sm font-mono ml-auto">scam-detection</div>
                  </div>
                  <div className="p-6">
                    <div className="text-white font-mono text-sm">
                      <div className="text-green-400 mb-4">$ y-scam verify "job-offer.pdf"</div>
                      <div className="mb-2 text-gray-400">Analyzing document... <span className="text-white">██████████ 100%</span></div>
                      <div className="mb-2 text-gray-400">Checking company registration... <span className="text-red-400">NOT FOUND</span></div>
                      <div className="mb-2 text-gray-400">Validating contact information... <span className="text-amber-400">SUSPICIOUS</span></div>
                      <div className="mb-2 text-gray-400">Cross-referencing scam database... <span className="text-red-400">3 MATCHES</span></div>
                      <div className="mt-6 mb-4 border-t border-gray-700 pt-4">
                        <div className="text-amber-300 font-bold">WARNING: Potential scam detected</div>
                        <div className="text-red-400 mt-1">Confidence: 87% fraudulent</div>
                      </div>
                      <div className="mt-4 text-white space-y-2">
                        <div className="flex items-start">
                          <span className="text-red-400 mr-2">🚩</span>
                          <span>No company website found for "TechGlobal Solutions"</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-red-400 mr-2">🚩</span>
                          <span>Request for $350 "training materials" payment</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-red-400 mr-2">🚩</span>
                          <span>Poor grammar and unprofessional formatting</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-red-400 mr-2">🚩</span>
                          <span>Email domain registered 2 weeks ago</span>
                        </div>
                      </div>
                      <div className="mt-6 pt-4 border-t border-gray-700">
                        <div className="text-blue-400">Recommended action: Do not respond or send any payments</div>
                        <div className="text-gray-400 mt-2">Report this scam to help others: report@yscam.org</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>



      {/* Database Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center mb-6">
                    <Database className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-4" />
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Live Scam Database</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-300">Active scam patterns</span>
                      <span className="font-semibold dark:text-white">12,487</span>
                    </div>
                    {/* <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-300">New this week</span>
                      <span className="font-semibold dark:text-white">342</span>
                    </div> */}
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-300">Countries covered</span>
                      <span className="font-semibold dark:text-white">58</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-300">Community reports</span>
                      <span className="font-semibold dark:text-white">8,921</span>
                    </div>
                  </div>
                  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-blue-600 dark:bg-blue-500 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: "85%" }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                      />
                    </div>
                    <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-300">
                      <span>Detection accuracy</span>
                      <span>85%</span>
                    </div>
                  </div>
                </div>
                
                {/* Floating elements */}
                <motion.div 
                  className="absolute -top-4 -right-4 bg-blue-100 dark:bg-blue-800 p-4 rounded-xl shadow-md z-10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </motion.div>
                <motion.div 
                  className="absolute -bottom-4 -left-4 bg-amber-100 dark:bg-amber-900/30 p-4 rounded-xl shadow-md z-10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <ShieldCheck className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </motion.div>
              </motion.div>
            </div>
            
            <div className="lg:w-1/2 order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="text-blue-600 dark:text-blue-400 font-semibold mb-4">COMMUNITY PROTECTION</div>
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Powered by collective intelligence</h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  Our database grows stronger with every user report, creating a constantly evolving shield against new scam tactics.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 dark:text-green-400 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Real-time updates</h3>
                      <p className="text-gray-600 dark:text-gray-300">New scam patterns are added within minutes of detection</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 dark:text-green-400 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Global coverage</h3>
                      <p className="text-gray-600 dark:text-gray-300">Scams from every region with localized detection</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 dark:text-green-400 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Anonymous reporting</h3>
                      <p className="text-gray-600 dark:text-gray-300">Contribute safely without sharing personal data</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 bg-gradient-to-r from-blue-800 to-blue-600 text-white overflow-hidden">
        {/* Floating elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
          <motion.div 
            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-400 mix-blend-multiply filter blur-3xl"
            animate={{
              y: [0, -40, 0],
              x: [0, 30, 0]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-blue-300 mix-blend-multiply filter blur-3xl"
            animate={{
              y: [0, 30, 0],
              x: [0, -40, 0]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        </div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6">Ready to protect yourself from scams?</h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              Join YSCAM to verify suspicious offers before taking any risks.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/verify" 
                className="px-8 py-4 bg-white dark:bg-gray-800 text-blue-900 dark:text-blue-200 rounded-xl font-semibold hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] inline-flex items-center justify-center"
              >
                <AlertTriangle className="h-5 w-5 mr-2" />
                Verify an Offer Now
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
              <Link 
                to="/resources" 
                className="px-8 py-4 bg-transparent border-2 border-white/50 text-white rounded-xl font-semibold hover:bg-white/10 hover:border-white transition-all duration-300 hover:shadow-lg hover:scale-[1.02] inline-flex items-center justify-center"
              >
                <BookOpen className="h-5 w-5 mr-2" />
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};


