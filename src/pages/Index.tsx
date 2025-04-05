
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HexagonBackground from "@/components/HexagonBackground";
import AnimatedButton from "@/components/AnimatedButton";
import { Database, Stethoscope, Clock, Users, ChevronRight, Shield, HeartPulse, Brain, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            entry.target.classList.remove("opacity-0", "translate-y-10");
          }
        });
      },
      { threshold: 0.1 }
    );
    
    document.querySelectorAll(".scroll-animate").forEach((el) => {
      el.classList.add("opacity-0", "translate-y-10");
      observer.observe(el);
    });
    
    return () => observer.disconnect();
  }, []);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };
  
  const heroFeatures = [
    { icon: HeartPulse, text: "Advanced Patient Tracking" },
    { icon: Shield, text: "HIPAA Compliant" },
    { icon: Brain, text: "AI-Powered Insights" },
  ];
  
  return (
    <div className="min-h-screen flex flex-col overflow-hidden bg-gradient-to-b from-[#040D12] to-[#08131A]">
      <HexagonBackground />
      <Navbar />
      
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
        className="pt-28 md:pt-36 pb-20 md:pb-32 px-4 relative z-10"
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-neon-cyan/20 to-transparent px-4 py-2 rounded-full backdrop-blur-sm border border-neon-cyan/30">
                <span className="animate-pulse h-2 w-2 rounded-full bg-neon-cyan"></span>
                <span className="text-sm font-medium text-neon-cyan">Next-Gen Hospital Management</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold !leading-[1.1] tracking-tight">
                <motion.span className="text-white block mb-2">Revolutionizing </motion.span>
                <motion.span
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="bg-gradient-to-r from-neon-cyan via-neon-cyan to-neon-magenta bg-clip-text text-transparent relative"
                >
                  Patient Care
                  <motion.span
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.6, duration: 1.2 }}
                    className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-neon-cyan to-neon-magenta"
                  ></motion.span>
                </motion.span>
                <motion.span className="text-white block mt-2">Management</motion.span>
              </h1>
              
              <motion.p
                variants={itemVariants}
                className="text-white/80 text-lg md:text-xl max-w-xl leading-relaxed"
              >
                Streamlined patient record management for modern healthcare professionals. 
                Track patient history, visits, and medical information with our 
                secure digital platform powered by cutting-edge technology.
              </motion.p>
              
              <motion.div
                variants={itemVariants} 
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <AnimatedButton variant="cyan" size="lg" className="group">
                  <Link to="/signup" className="flex items-center">
                    Get Started
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                  </Link>
                </AnimatedButton>
                
                <AnimatedButton variant="outline" size="lg">
                  <Link to="#features" onClick={(e) => {
                    e.preventDefault();
                    featuresRef.current?.scrollIntoView({ behavior: "smooth" });
                  }}>
                    Explore Features
                  </Link>
                </AnimatedButton>
              </motion.div>
              
              <motion.div variants={itemVariants} className="flex flex-wrap gap-x-8 gap-y-4 pt-2">
                {heroFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <feature.icon size={18} className="text-neon-cyan" />
                    <span className="text-white/70">{feature.text}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="lg:pl-10 flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full bg-gradient-to-r from-neon-cyan/20 to-neon-magenta/20 filter blur-[60px] -z-10"></div>
                
                <div className="relative z-10 w-[300px] h-[500px] md:w-[360px] md:h-[600px] perspective-1000">
                  <motion.div
                    initial={{ y: 20, opacity: 0, rotateY: -10 }}
                    animate={{ y: 0, opacity: 1, rotateY: 0 }}
                    transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                    className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden shadow-2xl transform-3d rotate-y-6 h-full"
                  >
                    <div className="h-12 bg-gradient-to-r from-neon-cyan/20 to-neon-magenta/10 border-b border-white/10 flex items-center px-4">
                      <div className="w-3 h-3 rounded-full bg-neon-magenta/50 mr-2"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/50 mr-2"></div>
                      <div className="w-3 h-3 rounded-full bg-neon-cyan/50"></div>
                      <div className="ml-4 text-white/70 text-sm font-medium">MediSphere Dashboard</div>
                    </div>
                    
                    <div className="p-6">
                      <div className="h-10 bg-gradient-to-r from-neon-cyan/20 to-transparent rounded-lg w-4/5 mb-6 flex items-center px-4">
                        <span className="text-white/70 text-sm">Patient Overview</span>
                      </div>
                      
                      <div className="space-y-5">
                        {[1, 2, 3].map((i) => (
                          <motion.div
                            key={i}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.6 + (i * 0.2), duration: 0.5 }}
                            className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors cursor-pointer group"
                          >
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-cyan/30 to-neon-magenta/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                                  <div className="w-3 h-3 rounded-sm bg-neon-cyan"></div>
                                </div>
                              </div>
                              <div className="ml-3 flex-1">
                                <div className="h-2 bg-white/20 rounded-md w-3/4"></div>
                                <div className="h-2 bg-white/10 rounded-md w-1/2 mt-2"></div>
                              </div>
                              <div className="w-6 h-6 rounded-md bg-neon-cyan/20 flex items-center justify-center">
                                <ArrowRight size={12} className="text-neon-cyan" />
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.5 }}
                        className="mt-6 p-4 bg-gradient-to-r from-neon-cyan/10 to-neon-magenta/10 rounded-lg flex justify-between items-center"
                      >
                        <div className="space-y-2">
                          <div className="h-2 bg-neon-cyan/30 rounded-md w-24"></div>
                          <div className="h-2 bg-white/20 rounded-md w-16"></div>
                        </div>
                        <div className="h-8 w-16 bg-neon-cyan/20 rounded-md flex items-center justify-center">
                          <div className="h-4 w-8 bg-neon-cyan/40 rounded"></div>
                        </div>
                      </motion.div>
                      
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1.4, duration: 0.5 }}
                        className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="h-3 bg-white/20 rounded-md w-1/3"></div>
                          <div className="h-3 bg-neon-cyan/30 rounded-md w-1/5"></div>
                        </div>
                        
                        <div className="space-y-2">
                          {[1, 2, 3, 4].map((i) => (
                            <motion.div 
                              key={i}
                              initial={{ scale: 0.9, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: 1.5 + (i * 0.1), duration: 0.4 }}
                              className="h-2 bg-gradient-to-r from-neon-cyan/20 via-white/10 to-neon-magenta/20 rounded-full"
                              style={{ width: `${70 + Math.random() * 30}%` }}
                            ></motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.6, duration: 0.7 }}
                  className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-neon-magenta/20 filter blur-3xl animate-pulse-slow"
                ></motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
      
      {/* Features Section */}
      <section ref={featuresRef} id="features" className="py-24 md:py-32 relative z-20 bg-gradient-to-b from-[#08131A] to-[#0D1A21]/90">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10 mb-4"
            >
              <span className="text-sm font-medium text-neon-cyan">What We Offer</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-neon-cyan to-white bg-clip-text text-transparent"
            >
              Cutting-Edge Features
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-white/70 max-w-2xl mx-auto text-lg"
            >
              Our hospital management system provides intuitive tools to streamline 
              your workflow and improve patient care through advanced technology.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Database,
                title: "Patient Records",
                description: "Securely store and access complete patient histories and medical records with sophisticated encryption.",
                color: "from-neon-cyan/20 to-blue-500/20"
              },
              {
                icon: Stethoscope,
                title: "Disease Tracking",
                description: "Track and monitor patient diagnoses with visual analytics and treatment progress indicators.",
                color: "from-neon-magenta/20 to-purple-500/20"
              },
              {
                icon: Clock,
                title: "Visit History",
                description: "Maintain detailed chronological logs of patient visits with automated appointment scheduling.",
                color: "from-amber-500/20 to-orange-500/20"
              },
              {
                icon: Users,
                title: "Multi-User Access",
                description: "Role-based secure access control for doctors, nurses and administrative staff with audit logs.",
                color: "from-emerald-500/20 to-green-500/20"
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-b from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:shadow-glow-cyan hover:border-white/20 transition-all duration-300 group"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon size={28} className="text-white" />
                </div>
                
                <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-neon-cyan transition-colors">{feature.title}</h3>
                <p className="text-white/70 group-hover:text-white/80 transition-colors">{feature.description}</p>
                
                <div className="mt-6 flex items-center text-neon-cyan font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Learn more</span>
                  <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0D1A21] to-[#040D12] opacity-90 z-0"></div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.05 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="absolute inset-0 hexagon-bg"
        ></motion.div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-md rounded-3xl p-10 md:p-16 relative overflow-hidden"
            >
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-neon-cyan/10 rounded-full filter blur-3xl"></div>
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-neon-magenta/10 rounded-full filter blur-3xl"></div>
              
              <div className="text-center space-y-6">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-4xl font-bold"
                >
                  Ready to <span className="text-neon-cyan">Transform</span> Your Healthcare Management?
                </motion.h2>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="text-white/70 text-lg max-w-2xl mx-auto"
                >
                  Join healthcare professionals already using our system to enhance patient care and
                  streamline workflows through data-driven insights and cutting-edge technology.
                </motion.p>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="pt-4"
                >
                  <AnimatedButton variant="cyan" size="lg" className="group">
                    <Link to="/signup" className="flex items-center">
                      Get Started Now
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                    </Link>
                  </AnimatedButton>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
