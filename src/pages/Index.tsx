import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HexagonBackground from "@/components/HexagonBackground";
import AnimatedButton from "@/components/AnimatedButton";
import {
  Database,
  Stethoscope,
  Clock,
  Users,
  ChevronRight,
  ShieldCheck,
  Zap,
  Sparkles,
  Play,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Laptop,
  Lightbulb,
  Phone
} from "lucide-react";

// Custom light theme styles for landing page only
const lightStyles = {
  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
  primaryGradient: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
  secondaryGradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
  accentGradient: 'linear-gradient(135deg, #06b6d4, #0891b2)',
  cardBackground: 'rgba(255, 255, 255, 0.8)',
  cardBorder: 'rgba(148, 163, 184, 0.2)',
  textPrimary: '#1e293b',
  textSecondary: '#64748b',
  textMuted: '#94a3b8'
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: "easeOut"
    }
  })
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const Index = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const successStoriesRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTrustLogo, setActiveTrustLogo] = useState<number | null>(null);
  const { scrollYProgress } = useScroll();
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  const trustLogos = [
    { name: "Clinic", color: "bg-blue-100 text-blue-700" },
    { name: "AnwarMemorial", color: "bg-purple-100 text-purple-700" },
    { name: "MedCenter", color: "bg-cyan-100 text-cyan-700" },
    { name: "HealthGroup", color: "bg-green-100 text-green-700" },
    { name: "CarePoint", color: "bg-indigo-100 text-indigo-700" }
  ];
  
  return (
    <div 
      className="min-h-screen flex flex-col overflow-hidden"
      style={{ 
        background: lightStyles.background,
        minHeight: '100vh'
      }}
    >
      <HexagonBackground />
      <Navbar />
      
      {/* Hero Section */}
      <section ref={heroRef} className="pt-24 md:pt-32 relative min-h-[85vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <motion.div 
            className="absolute top-20 right-[10%] w-96 h-96 rounded-full opacity-10"
            style={{ background: lightStyles.primaryGradient }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          
          <motion.div 
            className="absolute bottom-[20%] left-[5%] w-80 h-80 rounded-full opacity-10"
            style={{ background: lightStyles.secondaryGradient }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.08, 0.12, 0.08],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </div>
        
        <motion.div 
          style={{ 
            opacity: heroOpacity,
            scale: heroScale
          }}
          className="container mx-auto px-6 relative z-10"
        >
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="md:w-1/2 mb-12 md:mb-0 relative z-30"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-6"
              >
                <span 
                  className="px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide inline-block border shadow-lg"
                  style={{
                    background: lightStyles.cardBackground,
                    border: `1px solid ${lightStyles.cardBorder}`,
                    color: lightStyles.textPrimary,
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  Next-Gen Healthcare Platform
                </span>
              </motion.div>
              
              <motion.h1 
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight"
                variants={fadeIn}
                custom={0}
                style={{ color: lightStyles.textPrimary }}
              >
                <span>Redefine </span>
                <span className="relative inline-block">
                  <span 
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: lightStyles.primaryGradient }}
                  >
                    Patient Care
                  </span>
                  <motion.span 
                    className="absolute -bottom-1 left-0 w-full h-1 rounded-full"
                    style={{ backgroundImage: lightStyles.primaryGradient }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                  ></motion.span>
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-lg md:text-xl mb-10 max-w-xl leading-relaxed"
                variants={fadeIn}
                custom={1}
                style={{ color: lightStyles.textSecondary }}
              >
                Transform your healthcare facility with our intelligent patient management system. 
                Secure, efficient, and designed for the future of medicine.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-5"
                variants={fadeIn}
                custom={2}
              >
                <motion.button
                  className="px-8 py-4 rounded-xl font-semibold text-white shadow-xl transition-all duration-300"
                  style={{ 
                    backgroundImage: lightStyles.primaryGradient,
                    boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)'
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 15px 35px rgba(59, 130, 246, 0.4)'
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => scrollToSection(ctaRef)}
                >
                  <div className="flex items-center">
                    Learn More
                    <motion.span 
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <ArrowRight className="ml-2" size={18} />
                    </motion.span>
                  </div>
                </motion.button>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center cursor-pointer group"
                >
                  <div 
                    className="mr-3 rounded-full p-3 group-hover:shadow-lg transition-all backdrop-blur-md"
                    style={{ 
                      background: 'rgba(59, 130, 246, 0.1)',
                      border: '1px solid rgba(59, 130, 246, 0.2)'
                    }}
                  >
                    <Play size={16} className="text-blue-600 fill-blue-600 ml-0.5" />
                  </div>
                  <span 
                    className="group-hover:text-blue-600 transition-colors font-medium"
                    style={{ color: lightStyles.textPrimary }}
                  >
                    Watch Demo
                  </span>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="mt-12 flex flex-col"
                variants={fadeIn}
                custom={3}
              >
                <div className="flex space-x-2 mb-3 items-center">
                  <span 
                    className="text-sm font-medium"
                    style={{ color: lightStyles.textMuted }}
                  >
                    Trusted by industry leaders
                  </span>
                  <div 
                    className="h-[1px] flex-1"
                    style={{ background: `linear-gradient(to right, ${lightStyles.cardBorder}, transparent)` }}
                  ></div>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  {trustLogos.map((logo, index) => (
                    <motion.div
                      key={index}
                      className={`rounded-lg px-4 py-2.5 cursor-pointer transition-all duration-300 ${logo.color} backdrop-blur-md shadow-sm hover:shadow-md`}
                      initial={{ opacity: 0.7 }}
                      whileHover={{ scale: 1.05, opacity: 1 }}
                      onHoverStart={() => setActiveTrustLogo(index)}
                      onHoverEnd={() => setActiveTrustLogo(null)}
                    >
                      <span className="text-sm font-medium">
                        {logo.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2 flex justify-center md:justify-end"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative">
                <motion.div 
                  className="w-80 h-80 md:w-[480px] md:h-[480px] rounded-2xl overflow-hidden relative shadow-2xl"
                  style={{
                    background: lightStyles.cardBackground,
                    border: `1px solid ${lightStyles.cardBorder}`,
                    backdropFilter: 'blur(20px)'
                  }}
                  initial={{ y: 20 }}
                  animate={{ 
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                >
                  <div 
                    className="absolute top-0 inset-x-0 h-14 border-b flex items-center px-6 z-20"
                    style={{
                      background: lightStyles.accentGradient,
                      borderColor: lightStyles.cardBorder
                    }}
                  >
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="ml-6 text-white text-sm font-medium">Patient Dashboard Pro</div>
                  </div>
                  
                  <div className="absolute top-14 inset-x-0 bottom-0 z-20 p-6 flex flex-col">
                    <motion.div 
                      className="rounded-lg p-4 mb-6 shadow-sm"
                      style={{
                        background: lightStyles.cardBackground,
                        border: `1px solid ${lightStyles.cardBorder}`
                      }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div 
                            className="font-semibold"
                            style={{ color: lightStyles.textPrimary }}
                          >
                            Patient Overview
                          </div>
                          <div 
                            className="text-sm"
                            style={{ color: lightStyles.textMuted }}
                          >
                            Last 30 days
                          </div>
                        </div>
                        <div className="bg-green-100 text-green-700 rounded-md px-2 py-1">
                          <span className="text-xs font-semibold">+24.5%</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-12 gap-1 h-16 items-end">
                        {[40, 65, 35, 85, 45, 55, 75, 50, 65, 70, 60, 80].map((height, i) => (
                          <motion.div 
                            key={i}
                            className="rounded-sm"
                            style={{ 
                              height: `${height}%`,
                              backgroundImage: lightStyles.primaryGradient
                            }}
                            initial={{ height: 0 }}
                            animate={{ height: `${height}%` }}
                            transition={{ delay: 1 + (i * 0.05), duration: 0.5 }}
                          />
                        ))}
                      </div>
                    </motion.div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div 
                        className="rounded-lg p-3 shadow-sm"
                        style={{
                          background: 'rgba(59, 130, 246, 0.1)',
                          border: '1px solid rgba(59, 130, 246, 0.2)'
                        }}
                      >
                        <div 
                          className="text-xs mb-1"
                          style={{ color: lightStyles.textMuted }}
                        >
                          Recovery Rate
                        </div>
                        <div className="text-blue-600 text-lg font-bold">94.2%</div>
                      </div>
                      <div 
                        className="rounded-lg p-3 shadow-sm"
                        style={{
                          background: 'rgba(139, 92, 246, 0.1)',
                          border: '1px solid rgba(139, 92, 246, 0.2)'
                        }}
                      >
                        <div 
                          className="text-xs mb-1"
                          style={{ color: lightStyles.textMuted }}
                        >
                          Patient Satisfaction
                        </div>
                        <div className="text-purple-600 text-lg font-bold">96.8%</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>
      
      {/* Features Section */}
      <section ref={featuresRef} className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block mb-4">
              <span 
                className="px-6 py-2 rounded-full text-sm font-semibold tracking-wide inline-block shadow-lg"
                style={{
                  background: lightStyles.cardBackground,
                  border: `1px solid ${lightStyles.cardBorder}`,
                  color: lightStyles.textPrimary,
                  backdropFilter: 'blur(10px)'
                }}
              >
                Powerful Tools
              </span>
            </div>
            <h2 
              className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
              style={{ color: lightStyles.textPrimary }}
            >
              <span 
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: lightStyles.primaryGradient }}
              >
                Comprehensive
              </span>{" "}
              Features
            </h2>
            <p 
              className="max-w-xl mx-auto text-lg"
              style={{ color: lightStyles.textSecondary }}
            >
              Everything you need to streamline your workflow and elevate patient care.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            {[
              {
                icon: Database,
                title: "Patient Records",
                description: "Securely store and access complete patient histories.",
                gradient: "from-blue-500 to-blue-600"
              },
              {
                icon: Stethoscope,
                title: "Disease Tracking",
                description: "Monitor patient diagnoses and treatment progress.",
                gradient: "from-purple-500 to-purple-600"
              },
              {
                icon: Clock,
                title: "Visit History",
                description: "Detailed logs of patient visits and appointments.",
                gradient: "from-cyan-500 to-cyan-600"
              },
              {
                icon: Users,
                title: "Multi-User Access",
                description: "Role-based access for medical staff.",
                gradient: "from-green-500 to-green-600"
              }
            ].map((feature, index) => (
              <motion.div 
                key={index} 
                className="rounded-2xl transition-all duration-300 group overflow-hidden relative shadow-lg hover:shadow-xl"
                style={{
                  background: lightStyles.cardBackground,
                  border: `1px solid ${lightStyles.cardBorder}`,
                  backdropFilter: 'blur(20px)'
                }}
                variants={fadeIn}
                custom={index}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="p-6 relative z-10">
                  <div 
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} p-2.5 mb-5 flex items-center justify-center shadow-lg`}
                  >
                    <feature.icon size={24} className="text-white" />
                  </div>
                  <h3 
                    className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors"
                    style={{ color: lightStyles.textPrimary }}
                  >
                    {feature.title}
                  </h3>
                  <p 
                    className="transition-colors"
                    style={{ color: lightStyles.textSecondary }}
                  >
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Testimonial Section */}
      <section 
        ref={successStoriesRef} 
        className="py-20 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, rgba(248, 250, 252, 0.8) 0%, rgba(241, 245, 249, 0.9) 100%)`
        }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 
              className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
              style={{ color: lightStyles.textPrimary }}
            >
              <span 
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: lightStyles.secondaryGradient }}
              >
                Trusted by
              </span>{" "}
              Healthcare Leaders
            </h2>
          </motion.div>
          
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="rounded-2xl p-8 md:p-10 relative overflow-hidden shadow-xl"
              style={{
                background: lightStyles.cardBackground,
                border: `1px solid ${lightStyles.cardBorder}`,
                backdropFilter: 'blur(20px)'
              }}
              whileHover={{ 
                boxShadow: "0 25px 50px rgba(139, 92, 246, 0.15)",
                transition: { duration: 0.3 }
              }}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
                <div className="flex-shrink-0">
                  <motion.div 
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center text-white text-2xl font-bold relative overflow-hidden shadow-lg"
                    style={{ backgroundImage: lightStyles.secondaryGradient }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <span className="relative z-10 drop-shadow-md">DU</span>
                  </motion.div>
                </div>
                
                <div className="flex-1">
                  <div className="flex mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.div 
                        key={star}
                        initial={{ opacity: 0, scale: 0, rotate: -30 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ delay: 0.3 + (star * 0.1), type: "spring", stiffness: 200 }}
                        className="text-yellow-400"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                        </svg>
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.p 
                    className="text-lg md:text-xl mb-6 leading-relaxed italic"
                    style={{ color: lightStyles.textPrimary }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    viewport={{ once: true }}
                  >
                    "Since implementing MediSphere's platform, our practice has seen a remarkable transformation. Patient wait times have decreased by 35%, administrative tasks are more streamlined, and our medical team can focus more on delivering exceptional care."
                  </motion.p>
                  
                  <div 
                    className="border-t pt-6"
                    style={{ borderColor: lightStyles.cardBorder }}
                  >
                    <h4 
                      className="text-lg font-semibold bg-clip-text text-transparent"
                      style={{ backgroundImage: lightStyles.secondaryGradient }}
                    >
                      Dr. Usman Qamar
                    </h4>
                    <p style={{ color: lightStyles.textMuted }}>
                      Chief Medical Officer
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section 
        ref={ctaRef} 
        className="py-20 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)`
        }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="rounded-2xl p-10 relative overflow-hidden shadow-xl"
              style={{
                background: lightStyles.cardBackground,
                border: `1px solid ${lightStyles.cardBorder}`,
                backdropFilter: 'blur(20px)'
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-10 relative z-10">
                <motion.h2 
                  className="text-3xl md:text-5xl font-bold mb-6 tracking-tight"
                  style={{ color: lightStyles.textPrimary }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  Ready to Transform Your 
                  <span 
                    className="bg-clip-text text-transparent block"
                    style={{ backgroundImage: lightStyles.primaryGradient }}
                  >
                    Healthcare Practice?
                  </span>
                </motion.h2>
                
                <motion.p 
                  className="text-xl mb-10 max-w-2xl mx-auto"
                  style={{ color: lightStyles.textSecondary }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  Join thousands of healthcare providers who have elevated their practice.
                </motion.p>
              </div>
              
              <motion.div 
                className="flex flex-col sm:flex-row justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Link to="/signup">
                  <motion.button 
                    className="px-8 py-4 rounded-xl font-semibold text-white shadow-xl transition-all duration-300"
                    style={{ 
                      backgroundImage: lightStyles.primaryGradient,
                      boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)'
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: '0 15px 35px rgba(59, 130, 246, 0.4)'
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center">
                      Get Started
                      <ArrowRight size={18} className="ml-2" />
                    </div>
                  </motion.button>
                </Link>
                
                <a href="https://wa.me/923041998458" target="_blank" rel="noopener noreferrer">
                  <motion.button 
                    className="px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                    style={{
                      background: lightStyles.cardBackground,
                      border: `2px solid rgba(139, 92, 246, 0.3)`,
                      color: lightStyles.textPrimary,
                      backdropFilter: 'blur(10px)'
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      borderColor: 'rgba(139, 92, 246, 0.5)'
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center">
                      <Phone size={18} className="mr-2 text-purple-600" />
                      <span 
                        className="bg-clip-text text-transparent"
                        style={{ backgroundImage: lightStyles.secondaryGradient }}
                      >
                        Schedule Appointment
                      </span>
                    </div>
                  </motion.button>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
