
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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
  Sparkles
} from "lucide-react";

// Animation variants
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
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const Index = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
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
  
  return (
    <div className="min-h-screen flex flex-col bg-dark bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-dark-secondary/40 via-dark to-dark overflow-hidden">
      <HexagonBackground />
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 px-4 relative">
        <motion.div 
          className="absolute top-40 right-0 w-64 h-64 bg-neon-cyan/5 rounded-full blur-3xl"
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
          className="absolute bottom-20 left-10 w-64 h-64 bg-neon-magenta/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="md:w-1/2 mb-10 md:mb-0"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
                variants={fadeIn}
                custom={0}
              >
                <span className="text-white">Hospital </span>
                <span className="relative">
                  <span className="bg-gradient-to-r from-neon-cyan to-neon-magenta bg-clip-text text-transparent">
                    Management
                  </span>
                  <motion.span 
                    className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-neon-cyan to-neon-magenta rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                  ></motion.span>
                </span>
                <span className="text-white"> System</span>
              </motion.h1>
              
              <motion.p 
                className="text-white/80 text-lg md:text-xl mb-8 max-w-xl"
                variants={fadeIn}
                custom={1}
              >
                Transform your healthcare facility with our intelligent patient 
                record management platform. Secure, efficient, and designed for modern healthcare professionals.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                variants={fadeIn}
                custom={2}
              >
                <AnimatedButton variant="cyan" size="lg">
                  <Link to="/signup" className="flex items-center">
                    Get Started
                    <ChevronRight className="ml-2" size={18} />
                  </Link>
                </AnimatedButton>
                
                <AnimatedButton variant="outline" size="lg">
                  <Link to="#features" onClick={(e) => {
                    e.preventDefault();
                    featuresRef.current?.scrollIntoView({ behavior: "smooth" });
                  }}>
                    Learn More
                  </Link>
                </AnimatedButton>
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
                  className="w-72 h-72 md:w-96 md:h-96 rounded-full bg-neon-cyan/20 filter blur-3xl absolute -z-10"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
                <motion.div 
                  className="w-60 h-60 md:w-80 md:h-80 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden shadow-lg"
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.8, 
                    delay: 0.5,
                    type: "spring",
                    stiffness: 100
                  }}
                >
                  <div className="h-10 bg-gradient-to-r from-neon-cyan/10 to-neon-magenta/10 border-b border-white/10 flex items-center px-4">
                    <div className="w-3 h-3 rounded-full bg-neon-magenta/50 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-neon-cyan/50"></div>
                    <div className="ml-4 text-white/60 text-sm">Patient Dashboard</div>
                  </div>
                  <div className="p-4">
                    <div className="h-8 bg-white/10 rounded-md w-2/3 mb-4"></div>
                    <div className="space-y-3">
                      {[1, 2, 3, 4].map((i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + (i * 0.1) }}
                          className="flex items-center"
                        >
                          <div className="w-8 h-8 rounded-md bg-gradient-to-br from-neon-cyan/20 to-neon-magenta/20 flex items-center justify-center">
                            <div className="w-4 h-4 rounded-sm bg-white/40"></div>
                          </div>
                          <div className="ml-3 flex-1">
                            <div className="h-2 bg-white/20 rounded-md w-full"></div>
                            <div className="h-2 bg-white/10 rounded-md w-4/5 mt-2"></div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 }}
                      className="mt-6 p-2 bg-gradient-to-r from-neon-cyan/10 to-neon-magenta/10 rounded-md flex justify-between items-center"
                    >
                      <div className="w-1/3 h-2 bg-neon-cyan/30 rounded-md"></div>
                      <div className="w-16 h-6 bg-gradient-to-r from-neon-cyan/30 to-neon-magenta/30 rounded-md"></div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section ref={featuresRef} id="features" className="py-20 bg-dark-secondary/30 relative overflow-hidden">
        <motion.div 
          className="absolute -top-40 -right-40 w-96 h-96 bg-neon-cyan/5 rounded-full blur-3xl"
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
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-neon-magenta/5 rounded-full blur-3xl"
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
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-neon-cyan">Advanced</span> Features
            </h2>
            <p className="text-white/70 max-w-xl mx-auto">
              Our hospital management system provides intuitive tools to streamline 
              your workflow and improve patient care with cutting-edge technology.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            {[
              {
                icon: Database,
                title: "Patient Records",
                description: "Securely store and access complete patient histories and medical records.",
                gradient: "from-cyan-500/20 to-blue-500/20"
              },
              {
                icon: Stethoscope,
                title: "Disease Tracking",
                description: "Track and monitor patient diagnoses and treatment progress over time.",
                gradient: "from-purple-500/20 to-pink-500/20"
              },
              {
                icon: Clock,
                title: "Visit History",
                description: "Maintain detailed logs of patient visits and follow-up appointments.",
                gradient: "from-amber-500/20 to-orange-500/20"
              },
              {
                icon: Users,
                title: "Multi-User Access",
                description: "Role-based access for doctors and administrative staff.",
                gradient: "from-emerald-500/20 to-teal-500/20"
              },
              {
                icon: ShieldCheck,
                title: "Data Security",
                description: "Enterprise-grade encryption and privacy controls to protect sensitive information.",
                gradient: "from-green-500/20 to-emerald-500/20"
              },
              {
                icon: Zap,
                title: "Fast Performance",
                description: "Lightning-fast data retrieval and updates for efficient workflows.",
                gradient: "from-yellow-500/20 to-amber-500/20"
              },
              {
                icon: Sparkles,
                title: "Smart Analytics",
                description: "Gain insights from patient data with intelligent reporting tools.",
                gradient: "from-pink-500/20 to-rose-500/20"
              },
              {
                icon: Database,
                title: "Cloud Storage",
                description: "Access your data securely from anywhere with cloud-based storage.",
                gradient: "from-blue-500/20 to-indigo-500/20"
              }
            ].map((feature, index) => (
              <motion.div 
                key={index} 
                className="glass-card p-6 rounded-lg hover:scale-105 hover:border-neon-cyan/50 transition-all duration-300"
                variants={fadeIn}
                custom={index}
              >
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}>
                  <feature.icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Stats Section */}
      <motion.section 
        className="py-16 relative overflow-hidden bg-dark"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Hospitals", value: "200+", color: "text-neon-cyan" },
              { label: "Doctors", value: "3,500+", color: "text-neon-magenta" },
              { label: "Patients", value: "1M+", color: "text-purple-400" },
              { label: "Daily Records", value: "25K+", color: "text-blue-400" },
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="glass-card p-8 rounded-xl text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className={`text-4xl font-bold mb-2 ${stat.color}`}
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
                <div className="text-white/60">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      
      {/* Testimonials Section */}
      <motion.section 
        className="py-20 bg-dark-secondary/20 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Trusted by <span className="text-neon-cyan">Healthcare Professionals</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "This system revolutionized our patient management process. Everything is now accessible in seconds.",
                name: "Dr. Sarah Johnson",
                title: "Chief Medical Officer",
              },
              {
                quote: "The analytics features helped us identify trends we never would have noticed. It's dramatically improved our care.",
                name: "Dr. Michael Chen",
                title: "Head of Cardiology",
              },
              {
                quote: "Implementation was seamless and the support team is responsive. Best decision we've made for our hospital.",
                name: "Emily Rodriguez",
                title: "Hospital Administrator",
              },
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                className="glass-card p-6 rounded-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 mr-1">★</span>
                  ))}
                </div>
                <p className="text-white/80 mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-cyan to-neon-magenta flex items-center justify-center text-white font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-white/60 text-sm">{testimonial.title}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      
      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark to-dark-secondary opacity-90 z-0"></div>
        <div className="absolute inset-0 hexagon-bg opacity-10"></div>
        
        <motion.div 
          className="container mx-auto px-4 relative z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to <span className="bg-gradient-to-r from-neon-cyan to-neon-magenta bg-clip-text text-transparent">Modernize</span> Your Hospital Records?
            </h2>
            <p className="text-white/70 mb-10 text-lg">
              Join healthcare professionals already using our system to improve patient care and
              streamline their workflow.
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <AnimatedButton variant="cyan" size="lg">
                <Link to="/signup">Get Started Now</Link>
              </AnimatedButton>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
