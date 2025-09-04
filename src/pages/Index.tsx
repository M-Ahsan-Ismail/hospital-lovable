import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import LightNavbar from "@/components/LightNavbar";
import LightFooter from "@/components/LightFooter";
import LightHexagonBackground from "@/components/LightHexagonBackground";
import LightAnimatedButton from "@/components/LightAnimatedButton";
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
    { name: "Clinic", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { name: "AnwarMemorial", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { name: "MedCenter", color: "bg-sky-50 text-sky-700 border-sky-200" },
    { name: "HealthGroup", color: "bg-green-50 text-green-700 border-green-200" },
    { name: "CarePoint", color: "bg-indigo-50 text-indigo-700 border-indigo-200" }
  ];
  
  return (
    <div className="min-h-screen flex flex-col overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <LightHexagonBackground />
      <LightNavbar />
      
      {/* Hero Section */}
      <section ref={heroRef} className="pt-24 md:pt-32 relative min-h-[85vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <motion.div 
            className="absolute top-20 right-[10%] w-96 h-96 rounded-full opacity-10 bg-gradient-to-r from-emerald-400 to-emerald-600"
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
            className="absolute bottom-[20%] left-[5%] w-80 h-80 rounded-full opacity-10 bg-gradient-to-r from-purple-400 to-purple-600"
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
                <span className="px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide inline-block border shadow-lg bg-white/90 backdrop-blur-sm border-slate-200 text-slate-700">
                  Next-Gen Healthcare Platform
                </span>
              </motion.div>
              
              <motion.h1 
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight text-slate-800"
                variants={fadeIn}
                custom={0}
              >
                <span>Redefine </span>
                <span className="relative inline-block">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-emerald-600">
                    Patient Care
                  </span>
                  <motion.span 
                    className="absolute -bottom-1 left-0 w-full h-1 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                  ></motion.span>
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-lg md:text-xl mb-10 max-w-xl leading-relaxed text-slate-600"
                variants={fadeIn}
                custom={1}
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
                  className="px-8 py-4 rounded-xl font-bold text-white shadow-xl transition-all duration-300 hover:shadow-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
                  style={{ 
                    boxShadow: '0 10px 25px rgba(16, 185, 129, 0.25)'
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 15px 30px rgba(16, 185, 129, 0.35)'
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
                  <div className="mr-3 rounded-full p-3 group-hover:shadow-lg transition-all backdrop-blur-sm border bg-emerald-50/80 border-emerald-200">
                    <Play size={16} className="text-emerald-600 fill-emerald-600 ml-0.5" />
                  </div>
                  <span className="group-hover:text-emerald-600 transition-colors font-semibold text-slate-700">
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
                  <span className="text-sm font-medium text-slate-500">
                    Trusted by industry leaders
                  </span>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-slate-300 to-transparent"></div>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  {trustLogos.map((logo, index) => (
                    <motion.div
                      key={index}
                      className={`rounded-xl px-4 py-2.5 cursor-pointer transition-all duration-300 ${logo.color} border backdrop-blur-sm shadow-sm hover:shadow-md`}
                      initial={{ opacity: 0.8 }}
                      whileHover={{ scale: 1.05, opacity: 1 }}
                      onHoverStart={() => setActiveTrustLogo(index)}
                      onHoverEnd={() => setActiveTrustLogo(null)}
                    >
                      <span className="text-sm font-semibold">
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
                  className="w-80 h-80 md:w-[480px] md:h-[480px] rounded-2xl overflow-hidden relative shadow-2xl bg-white/95 backdrop-blur-md border border-slate-200"
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
                  <div className="absolute top-0 inset-x-0 h-14 border-b border-slate-200 flex items-center px-6 z-20 bg-gradient-to-r from-emerald-500 to-emerald-600">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="ml-6 text-white text-sm font-medium">Patient Dashboard Pro</div>
                  </div>
                  
                  <div className="absolute top-14 inset-x-0 bottom-0 z-20 p-6 flex flex-col">
                    <motion.div 
                      className="rounded-lg p-4 mb-6 shadow-sm bg-white/90 border border-slate-200"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="font-semibold text-slate-800">
                            Patient Overview
                          </div>
                          <div className="text-sm text-slate-500">
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
                            className="rounded-sm bg-gradient-to-t from-emerald-500 to-emerald-400"
                            style={{ 
                              height: `${height}%`
                            }}
                            initial={{ height: 0 }}
                            animate={{ height: `${height}%` }}
                            transition={{ delay: 1 + (i * 0.05), duration: 0.5 }}
                          />
                        ))}
                      </div>
                    </motion.div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-lg p-3 shadow-sm bg-blue-50/80 border border-blue-200">
                        <div className="text-xs mb-1 text-slate-500">
                          Recovery Rate
                        </div>
                        <div className="text-blue-600 text-lg font-bold">94.2%</div>
                      </div>
                      <div className="rounded-lg p-3 shadow-sm bg-purple-50/80 border border-purple-200">
                        <div className="text-xs mb-1 text-slate-500">
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
      <section ref={featuresRef} className="py-20 relative overflow-hidden bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block mb-4">
              <span className="px-6 py-2 rounded-full text-sm font-semibold tracking-wide inline-block shadow-lg bg-white/90 backdrop-blur-sm border border-slate-200 text-slate-700">
                Powerful Tools
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-slate-800">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-emerald-600">
                Comprehensive
              </span>{" "}
              Features
            </h2>
            <p className="max-w-xl mx-auto text-lg text-slate-600">
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
                gradient: "from-blue-500 to-blue-600",
                bgColor: "bg-blue-50/80",
                borderColor: "border-blue-200"
              },
              {
                icon: Stethoscope,
                title: "Disease Tracking",
                description: "Monitor patient diagnoses and treatment progress.",
                gradient: "from-purple-500 to-purple-600",
                bgColor: "bg-purple-50/80",
                borderColor: "border-purple-200"
              },
              {
                icon: Clock,
                title: "Visit History",
                description: "Detailed logs of patient visits and appointments.",
                gradient: "from-cyan-500 to-cyan-600",
                bgColor: "bg-cyan-50/80",
                borderColor: "border-cyan-200"
              },
              {
                icon: Users,
                title: "Multi-User Access",
                description: "Role-based access for medical staff.",
                gradient: "from-green-500 to-green-600",
                bgColor: "bg-green-50/80",
                borderColor: "border-green-200"
              }
            ].map((feature, index) => (
              <motion.div 
                key={index} 
                className={`rounded-2xl transition-all duration-300 group overflow-hidden relative shadow-lg hover:shadow-xl bg-white/90 backdrop-blur-md border ${feature.borderColor}`}
                variants={fadeIn}
                custom={index}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="p-6 relative z-10">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} p-2.5 mb-5 flex items-center justify-center shadow-lg`}>
                    <feature.icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors text-slate-800">
                    {feature.title}
                  </h3>
                  <p className="transition-colors text-slate-600">
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
        className="py-20 relative overflow-hidden bg-gradient-to-b from-slate-50 to-white"
      >
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-slate-800">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-600">
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
              className="rounded-2xl p-8 md:p-10 relative overflow-hidden shadow-xl bg-white/95 backdrop-blur-md border border-slate-200"
              whileHover={{ 
                boxShadow: "0 25px 50px rgba(139, 92, 246, 0.15)",
                transition: { duration: 0.3 }
              }}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
                <div className="flex-shrink-0">
                  <motion.div 
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center text-white text-2xl font-bold relative overflow-hidden shadow-lg bg-gradient-to-r from-purple-500 to-purple-600"
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
                    className="text-lg md:text-xl mb-6 leading-relaxed italic text-slate-700"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    viewport={{ once: true }}
                  >
                    "Since implementing MediSphere's platform, our practice has seen a remarkable transformation. Patient wait times have decreased by 35%, administrative tasks are more streamlined, and our medical team can focus more on delivering exceptional care."
                  </motion.p>
                  
                  <div className="border-t pt-6 border-slate-200">
                    <h4 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-600">
                      Dr. Usman Qamar
                    </h4>
                    <p className="text-slate-500">
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
        className="py-20 relative overflow-hidden bg-gradient-to-b from-white to-slate-50"
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="rounded-2xl p-10 relative overflow-hidden shadow-xl bg-white/95 backdrop-blur-md border border-slate-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-10 relative z-10">
                <motion.h2 
                  className="text-3xl md:text-5xl font-bold mb-6 tracking-tight text-slate-800"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  Ready to Transform Your 
                  <span className="bg-clip-text text-transparent block bg-gradient-to-r from-emerald-500 to-emerald-600">
                    Healthcare Practice?
                  </span>
                </motion.h2>
                
                <motion.p 
                  className="text-xl mb-10 max-w-2xl mx-auto text-slate-600"
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
                    className="px-8 py-4 rounded-xl font-semibold text-white shadow-xl transition-all duration-300 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
                    style={{ 
                      boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)'
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: '0 15px 35px rgba(16, 185, 129, 0.4)'
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
                    className="px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl bg-white/90 backdrop-blur-sm border-2 border-purple-300 text-slate-700 hover:border-purple-400"
                    whileHover={{ 
                      scale: 1.05
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center">
                      <Phone size={18} className="mr-2 text-purple-600" />
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-600">
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
      
      <LightFooter />
    </div>
  );
};

export default Index;