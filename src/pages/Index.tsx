import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
    { name: "Clinic", color: "from-blue-400/30 to-cyan-400/30" },
    { name: "AnwarMemorial", color: "from-purple-400/30 to-pink-400/30" },
    { name: "MedCenter", color: "from-amber-400/30 to-orange-400/30" },
    { name: "HealthGroup", color: "from-green-400/30 to-emerald-400/30" },
    { name: "CarePoint", color: "from-sky-400/30 to-indigo-400/30" }
  ];
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden">
      <Navbar />
      
      <section ref={heroRef} className="pt-24 md:pt-32 relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <motion.div 
            className="absolute top-20 right-[5%] w-64 h-64 rounded-full bg-modern-blue/10 blur-[100px]"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          
          <motion.div 
            className="absolute bottom-[10%] left-[5%] w-[30rem] h-[30rem] rounded-full bg-modern-emerald/10 blur-[120px]"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          
          <motion.div 
            className="absolute top-[25%] left-[30%] w-[20rem] h-[20rem] rounded-full bg-modern-purple/8 blur-[80px]"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{
              duration: 7,
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
                <span className="px-4 py-1.5 rounded-full text-xs uppercase font-semibold tracking-wider inline-block bg-gradient-to-r from-modern-blue/15 to-modern-purple/15 text-slate-600 border border-slate-200/80 shadow-lg shadow-modern-blue/10">
                  Next-Gen Healthcare Platform
                </span>
              </motion.div>
              
              <motion.h1 
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight"
                variants={fadeIn}
                custom={0}
              >
                <span className="text-slate-900">Redefine </span>
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-modern-blue to-modern-purple bg-clip-text text-transparent">
                    Patient Care
                  </span>
                  <motion.span 
                    className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-modern-blue to-modern-purple rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                  ></motion.span>
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-slate-600 text-lg md:text-xl mb-10 max-w-xl leading-relaxed"
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
                <AnimatedButton 
                  variant="cyan" 
                  size="lg" 
                  className="group"
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
                </AnimatedButton>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center cursor-pointer group"
                >
                  <div className="mr-3 rounded-full bg-modern-blue/15 p-3 group-hover:bg-modern-blue/25 transition-all border border-modern-blue/20">
                    <Play size={16} className="text-modern-blue fill-modern-blue ml-0.5" />
                  </div>
                  <span className="text-slate-700 group-hover:text-modern-blue transition-colors">Watch Demo</span>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="mt-12 flex flex-col"
                variants={fadeIn}
                custom={3}
              >
                <div className="flex space-x-2 mb-3 items-center">
                  <span className="text-slate-500 text-sm">Trusted by industry leaders</span>
                  <div className="h-[1px] bg-gradient-to-r from-slate-300 to-transparent flex-1"></div>
                </div>
                
                <div className="flex flex-wrap gap-6">
                  {trustLogos.map((logo, index) => (
                    <motion.div
                      key={index}
                      className={`rounded-lg p-2.5 bg-white/80 backdrop-blur-md border border-slate-200/50 cursor-pointer transition-all duration-300 shadow-sm hover:shadow-lg`}
                      initial={{ opacity: 0.7 }}
                      whileHover={{ scale: 1.05, opacity: 1 }}
                      onHoverStart={() => setActiveTrustLogo(index)}
                      onHoverEnd={() => setActiveTrustLogo(null)}
                    >
                      <span className={`text-sm font-medium ${activeTrustLogo === index ? "text-slate-900" : "text-slate-600"}`}>
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
                <div className="absolute inset-0 bg-gradient-to-r from-modern-blue/15 to-modern-purple/15 rounded-[2rem] blur-3xl transform scale-90 opacity-40 -z-10"></div>
                
                <motion.div 
                  className="w-80 h-80 md:w-[520px] md:h-[520px] rounded-[2rem] overflow-hidden relative border border-slate-200/50 shadow-2xl bg-white/95 backdrop-blur-sm"
                  initial={{ y: 20 }}
                  animate={{ 
                    y: [0, -15, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-50/80 to-white/95 backdrop-blur-md z-10"></div>
                  
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,.08)_1px,transparent_1px),linear-gradient(to_right,rgba(148,163,184,.08)_1px,transparent_1px)] bg-[size:20px_20px] z-0 opacity-30"></div>
                  
                  <div className="absolute top-0 inset-x-0 h-14 bg-gradient-to-r from-modern-blue/15 to-modern-purple/15 border-b border-slate-200/50 flex items-center px-6 z-20">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-modern-purple/70"></div>
                      <div className="w-3 h-3 rounded-full bg-modern-emerald/70"></div>
                      <div className="w-3 h-3 rounded-full bg-modern-blue/70"></div>
                    </div>
                    <div className="ml-6 text-slate-800 text-sm font-medium">Patient Dashboard Pro</div>
                  </div>
                  
                  <div className="absolute top-14 inset-x-0 bottom-0 z-20 p-6 flex flex-col">
                    <motion.div 
                      className="bg-white/80 border border-slate-200/50 rounded-lg p-4 mb-6 shadow-sm"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="text-slate-800 font-medium">Patient Overview</div>
                          <div className="text-slate-500 text-sm">Last 30 days</div>
                        </div>
                        <div className="bg-modern-emerald/15 border border-modern-emerald/20 rounded-md px-2 py-1">
                          <span className="text-modern-emerald text-xs font-medium">+24.5%</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 mb-2">
                        {[40, 65, 35, 85, 45, 55, 75, 50, 65, 70, 60, 80].map((height, i) => (
                          <motion.div 
                            key={i}
                            className="flex justify-center"
                            initial={{ height: 0 }}
                            animate={{ height: `${height}%` }}
                            transition={{ delay: 1 + (i * 0.05), duration: 0.5 }}
                          >
                            <div 
                              className="w-1.5 rounded-full bg-gradient-to-t from-modern-blue to-modern-purple" 
                              style={{ height: `${height}%` }}
                            ></div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                    
                    <div className="flex-1 space-y-4">
                      {[1, 2, 3].map((i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.2 + (i * 0.15) }}
                          className="bg-white/70 border border-slate-200/50 rounded-lg p-3 flex items-center hover:bg-white/90 hover:shadow-sm transition-all cursor-pointer group"
                        >
                          <div className="rounded-full p-2 bg-gradient-to-br from-modern-blue/15 to-modern-purple/15 border border-modern-blue/20 mr-3">
                            {i === 1 && <Users size={14} className="text-modern-blue" />}
                            {i === 2 && <Stethoscope size={14} className="text-modern-blue" />}
                            {i === 3 && <Clock size={14} className="text-modern-blue" />}
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-slate-800">
                              {i === 1 && "Patient Check-in"}
                              {i === 2 && "Medical Records"}  
                              {i === 3 && "Appointment Schedule"}
                            </div>
                            <div className="h-1.5 bg-slate-200 rounded-full mt-1.5 overflow-hidden">
                              <motion.div 
                                className="h-full bg-gradient-to-r from-modern-blue to-modern-purple"
                                initial={{ width: "0%" }}
                                animate={{ width: `${i * 30}%` }}
                                transition={{ delay: 1.5 + (i * 0.2), duration: 0.7 }}
                              />
                            </div>
                          </div>
                          <motion.div 
                            className="ml-2 text-slate-400"
                            whileHover={{ x: 3 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <ArrowRight size={14} className="group-hover:text-modern-blue transition-colors" />
                          </motion.div>
                        </motion.div>
                      ))}
                      
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.8 }}
                        className="grid grid-cols-2 gap-3 mt-4"
                      >
                        <div className="bg-gradient-to-br from-modern-emerald/10 to-modern-emerald/5 border border-modern-emerald/20 rounded-lg p-3">
                          <div className="text-xs text-slate-600 mb-1">Recovery Rate</div>
                          <div className="text-modern-emerald text-lg font-semibold">94.2%</div>
                        </div>
                        <div className="bg-gradient-to-br from-modern-purple/10 to-modern-purple/5 border border-modern-purple/20 rounded-lg p-3">
                          <div className="text-xs text-slate-600 mb-1">Patient Satisfaction</div>
                          <div className="text-modern-purple text-lg font-semibold">96.8%</div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-modern-blue/10 to-transparent rounded-b-[2rem] blur-xl -z-5"></div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer z-30"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
          onClick={() => featuresRef.current?.scrollIntoView({ behavior: "smooth" })}
        >
          <span className="text-slate-500 text-sm mb-2">Discover Features</span>
          <motion.div 
            animate={{ y: [0, 5, 0] }} 
            transition={{ duration: 1.5, repeat: Infinity }} 
            className="w-6 h-10 border-2 border-slate-300/50 rounded-full flex justify-center pt-1"
          >
            <motion.div 
              animate={{ height: [5, 10, 5] }} 
              transition={{ duration: 1.5, repeat: Infinity }} 
              className="w-1 bg-gradient-to-b from-modern-blue to-modern-purple rounded-full"
            />
          </motion.div>
        </motion.div>
      </section>
      
      <motion.section 
        className="py-20 relative overflow-hidden bg-slate-100/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Hospitals", value: "200+", color: "from-modern-blue to-modern-indigo", icon: Database },
              { label: "Doctors", value: "3,500+", color: "from-modern-purple to-modern-indigo", icon: Stethoscope },
              { label: "Patients", value: "1M+", color: "from-modern-emerald to-modern-blue", icon: Users },
              { label: "Daily Records", value: "25K+", color: "from-modern-indigo to-modern-purple", icon: BarChart3 },
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="relative glass-card overflow-hidden rounded-2xl group shadow-lg hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="p-6">
                  <div className={`w-12 h-12 mb-4 rounded-xl bg-gradient-to-br ${stat.color} p-2.5 flex items-center justify-center shadow-lg`}>
                    <stat.icon size={24} className="text-white" />
                  </div>
                  <motion.div 
                    className="text-4xl font-bold mb-1 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent"
                    initial={{ scale: 0.8 }}
                    whileInView={{ scale: 1 }}
                    transition={{ 
                      delay: index * 0.1 + 0.2,
                      type: "spring",
                      stiffness: 100
                    }}
                    viewport={{ once: true }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-slate-600 font-medium">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      
      <section ref={featuresRef} id="features" className="py-24 relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-blue-50">
        <motion.div 
          className="absolute -top-40 -right-40 w-96 h-96 bg-modern-blue/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        <motion.div 
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-modern-purple/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block mb-4">
              <span className="px-4 py-1.5 rounded-full text-xs uppercase font-semibold tracking-wider inline-block bg-gradient-to-r from-modern-purple/15 to-modern-blue/15 text-slate-600 border border-slate-200/80">
                Powerful Tools
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              <span className="bg-gradient-to-r from-modern-blue to-modern-purple bg-clip-text text-transparent">Comprehensive</span>{" "}
              <span className="text-slate-900">Features</span>
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto text-lg">
              Everything you need to streamline your workflow and elevate patient care 
              with our cutting-edge healthcare management system.
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
                description: "Securely store and access complete patient histories and medical records.",
                gradient: "from-modern-blue to-modern-indigo"
              },
              {
                icon: Stethoscope,
                title: "Disease Tracking",
                description: "Track and monitor patient diagnoses and treatment progress over time.",
                gradient: "from-modern-purple to-modern-indigo"
              },
              {
                icon: Clock,
                title: "Visit History",
                description: "Maintain detailed logs of patient visits and follow-up appointments.",
                gradient: "from-modern-emerald to-modern-blue"
              },
              {
                icon: Users,
                title: "Multi-User Access",
                description: "Role-based access for doctors and administrative staff.",
                gradient: "from-modern-indigo to-modern-purple"
              },
              {
                icon: ShieldCheck,
                title: "Data Security",
                description: "Enterprise-grade encryption and privacy controls to protect sensitive information.",
                gradient: "from-modern-emerald to-modern-blue"
              },
              {
                icon: Zap,
                title: "Fast Performance",
                description: "Lightning-fast data retrieval and updates for efficient workflows.",
                gradient: "from-modern-blue to-modern-purple"
              },
              {
                icon: Sparkles,
                title: "Smart Analytics",
                description: "Gain insights from patient data with intelligent reporting tools.",
                gradient: "from-modern-purple to-modern-indigo"
              },
              {
                icon: Laptop,
                title: "Cloud Access",
                description: "Access your data securely from anywhere with cloud-based storage.",
                gradient: "from-modern-indigo to-modern-emerald"
              }
            ].map((feature, index) => (
              <motion.div 
                key={index} 
                className="glass-card rounded-2xl hover:shadow-lg transition-all duration-300 group overflow-hidden relative border border-slate-200/50"
                variants={fadeIn}
                custom={index}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="p-6 relative z-10">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} p-2.5 mb-5 flex items-center justify-center shadow-md`}>
                    <feature.icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-slate-800 group-hover:text-modern-blue transition-colors">{feature.title}</h3>
                  <p className="text-slate-600 group-hover:text-slate-700 transition-colors">{feature.description}</p>
                </div>
                <div className="h-1 w-full bg-gradient-to-r from-transparent via-modern-blue/30 to-transparent absolute bottom-0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      <section className="py-24 relative overflow-hidden bg-gradient-to-b from-slate-100 to-white">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-block mb-4">
              <span className="px-4 py-1.5 rounded-full text-xs uppercase font-semibold tracking-wider inline-block bg-gradient-to-r from-modern-blue/15 to-modern-emerald/15 text-slate-600 border border-slate-200/80">
                Why Choose Us
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              <span className="bg-gradient-to-r from-modern-blue to-modern-emerald bg-clip-text text-transparent">Benefits</span>{" "}
              <span className="text-slate-900">of Our Platform</span>
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto text-lg">
              Our system is designed to transform healthcare operations and improve outcomes.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-modern-blue/10 to-modern-purple/10 rounded-2xl blur-3xl opacity-30 -z-10"></div>
              <div className="rounded-2xl overflow-hidden border border-slate-200/50 shadow-xl bg-white/80 backdrop-blur-sm">
                <div className="aspect-video bg-gradient-to-br from-slate-50 to-white relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,.08)_1px,transparent_1px),linear-gradient(to_right,rgba(148,163,184,.08)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-20 h-20 rounded-full bg-white/80 flex items-center justify-center backdrop-blur-md cursor-pointer border border-slate-200/50 z-10 shadow-lg"
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-modern-blue to-modern-purple flex items-center justify-center">
                      <Play size={30} fill="white" className="text-white ml-1" />
                    </div>
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-100 to-transparent opacity-50"></div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                {[
                  {
                    title: "Increased Efficiency",
                    description: "Reduce administrative tasks by up to 75% and streamline daily operations.",
                    icon: Zap,
                    color: "from-modern-blue to-modern-indigo"
                  },
                  {
                    title: "Better Patient Outcomes",
                    description: "Improve diagnosis accuracy by 40% with comprehensive medical history access.",
                    icon: CheckCircle2,
                    color: "from-modern-emerald to-modern-blue"
                  },
                  {
                    title: "Enhanced Security",
                    description: "HIPAA-compliant data storage with end-to-end encryption and audit trails.",
                    icon: ShieldCheck,
                    color: "from-modern-purple to-modern-indigo"
                  }
                ].map((benefit, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start p-4 glass-card rounded-xl border border-slate-200/50"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 5 }}
                  >
                    <div className={`rounded-lg p-3 bg-gradient-to-br ${benefit.color} mr-4 flex-shrink-0 shadow-lg`}>
                      <benefit.icon className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-800 mb-2">{benefit.title}</h3>
                      <p className="text-slate-600">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    
      <section ref={successStoriesRef} className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-slate-50">
        <motion.div 
          className="absolute -top-40 -left-40 w-96 h-96 bg-modern-blue/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        <motion.div 
          className="absolute -bottom-20 -right-20 w-80 h-80 bg-modern-purple/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-block mb-4">
              <motion.span 
                className="px-4 py-1.5 rounded-full text-xs uppercase font-semibold tracking-wider inline-block bg-gradient-to-r from-modern-purple/15 to-modern-blue/15 text-slate-600 border border-slate-200/80"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                Success Stories
              </motion.span>
            </div>
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <span className="bg-gradient-to-r from-modern-blue to-modern-purple bg-clip-text text-transparent">Trusted by</span>{" "}
              <span className="text-slate-900">Healthcare Leaders</span>
            </motion.h2>
            <motion.p 
              className="text-slate-600 max-w-xl mx-auto text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
            >
              See why medical professionals worldwide choose our platform.
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 md:p-10 backdrop-blur-sm border border-slate-200/50 relative overflow-hidden shadow-xl"
              whileHover={{ 
                boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.15)",
                transition: { duration: 0.3 }
              }}
            >
              <motion.div 
                className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-modern-blue/10 to-modern-purple/10 rounded-full blur-[100px] -z-10"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
                <div className="flex-shrink-0">
                  <motion.div 
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-modern-blue to-modern-purple flex items-center justify-center text-white text-2xl font-bold relative overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    initial={{ rotate: -5 }}
                    whileInView={{ rotate: 0 }}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.2),_transparent_70%)]"></div>
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
                        className="text-amber-400"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                        </svg>
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.p 
                    className="text-slate-700 text-lg md:text-xl mb-6 leading-relaxed italic"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    viewport={{ once: true }}
                  >
                    "Since implementing MediSphere's platform, our practice has seen a remarkable transformation. Patient wait times have decreased by 35%, administrative tasks are more streamlined, and our medical team can focus more on what matters most—delivering exceptional care. The analytics features have provided invaluable insights that have helped us optimize our operations and improve patient outcomes."
                  </motion.p>
                  
                  <motion.div 
                    className="border-t border-slate-200/50 pt-6"
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    transition={{ delay: 0.8, duration: 1 }}
                    viewport={{ once: true }}
                  >
                    <motion.h4 
                      className="text-slate-800 text-lg font-semibold bg-gradient-to-r from-modern-blue to-modern-purple bg-clip-text text-transparent"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1, duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      Dr. Usman Qamar
                    </motion.h4>
                    <motion.p 
                      className="text-slate-600"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.1, duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      Chief Medical Officer
                    </motion.p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      <section ref={ctaRef} className="py-24 relative overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        <motion.div 
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-modern-blue/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        <motion.div 
          className="absolute top-20 left-20 w-80 h-80 bg-modern-purple/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="bg-gradient-to-br from-white/90 to-slate-50/90 backdrop-blur-md rounded-2xl p-10 border border-slate-200/50 shadow-xl relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ 
                boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.15)",
                transition: { duration: 0.3 }
              }}
            >
              <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-br from-modern-blue/10 to-transparent rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 h-24 w-24 bg-gradient-to-tr from-modern-purple/10 to-transparent rounded-tr-full"></div>
              
              <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,.08)_1px,transparent_1px),linear-gradient(to_right,rgba(148,163,184,.08)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20"></div>
              
              <div className="text-center mb-10 relative z-10">
                <motion.h2 
                  className="text-3xl md:text-5xl font-bold mb-6 tracking-tight bg-gradient-to-r from-modern-blue via-slate-800 to-modern-purple bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  Ready to Transform Your Healthcare Practice?
                </motion.h2>
                
                <motion.p 
                  className="text-slate-600 text-xl mb-10 max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  Join thousands of healthcare providers who have elevated their practice with our innovative platform.
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
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                    <AnimatedButton 
                      variant="cyan" 
                      size="lg"
                      className="bg-gradient-to-r from-modern-blue to-modern-indigo text-white border-none"
                    >
                      <div className="flex items-center">
                        Get Started
                        <ArrowRight size={18} className="ml-2" />
                      </div>
                    </AnimatedButton>
                  </motion.div>
                </Link>
                <a href="https://wa.me/923041998458" target="_blank" rel="noopener noreferrer">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                    <AnimatedButton 
                      variant="outline" 
                      size="lg" 
                      className="border-2 border-modern-purple/50 hover:border-modern-purple bg-white/50"
                    >
                      <div className="flex items-center">
                        <Phone size={18} className="mr-2 text-modern-purple" />
                        <span className="bg-gradient-to-r from-modern-purple to-modern-indigo bg-clip-text text-transparent">Schedule Appointment</span>
                      </div>
                    </AnimatedButton>
                  </motion.div>
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