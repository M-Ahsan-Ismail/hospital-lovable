import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HexagonBackground from "@/components/HexagonBackground";
import AnimatedButton from "@/components/AnimatedButton";
import ThemeToggle from "@/components/ThemeToggle";
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";
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
import StatCard from "@/components/StatCard";

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

const IndexContent = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
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
    { 
      name: "Clinic", 
      darkColor: "from-blue-400/30 to-cyan-400/30",
      lightColor: "from-blue-100 to-cyan-100"
    },
    { 
      name: "AnwarMemorial", 
      darkColor: "from-purple-400/30 to-pink-400/30",
      lightColor: "from-purple-100 to-pink-100"
    },
    { 
      name: "MedCenter", 
      darkColor: "from-amber-400/30 to-orange-400/30",
      lightColor: "from-amber-100 to-orange-100"
    },
    { 
      name: "HealthGroup", 
      darkColor: "from-green-400/30 to-emerald-400/30",
      lightColor: "from-green-100 to-emerald-100"
    },
    { 
      name: "CarePoint", 
      darkColor: "from-sky-400/30 to-indigo-400/30",
      lightColor: "from-sky-100 to-indigo-100"
    }
  ];

  return (
    <div className={cn(
      "min-h-screen flex flex-col overflow-hidden",
      isDark 
        ? "bg-dark bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-dark-secondary/20 via-dark to-dark/95" 
        : "bg-white bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-100/50 via-white to-white/95"
    )}>
      {isDark && <HexagonBackground />}
      
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      
      <Navbar theme={theme} />
      
      <section ref={heroRef} className="pt-24 md:pt-32 relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0">
          {isDark ? (
            <>
              <motion.div 
                className="absolute top-20 right-[5%] w-64 h-64 rounded-full bg-neon-cyan/10 blur-[100px]"
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
                className="absolute bottom-[10%] left-[5%] w-[30rem] h-[30rem] rounded-full bg-neon-magenta/10 blur-[120px]"
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
                className="absolute top-[25%] left-[30%] w-[20rem] h-[20rem] rounded-full bg-purple-500/5 blur-[80px]"
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
            </>
          ) : (
            <>
              <motion.div 
                className="absolute top-20 right-[5%] w-64 h-64 rounded-full bg-blue-300/20 blur-[100px]"
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
                className="absolute bottom-[10%] left-[5%] w-[30rem] h-[30rem] rounded-full bg-pink-300/20 blur-[120px]"
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
                className="absolute top-[25%] left-[30%] w-[20rem] h-[20rem] rounded-full bg-purple-300/10 blur-[80px]"
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
            </>
          )}
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
                <span className={cn(
                  "px-4 py-1.5 rounded-full text-xs uppercase font-semibold tracking-wider inline-block shadow-lg",
                  isDark 
                    ? "bg-gradient-to-r from-neon-cyan/20 to-neon-magenta/20 text-white border border-white/10 shadow-neon-cyan/5"
                    : "bg-gradient-to-r from-blue-100 to-pink-100 text-gray-800 border border-gray-200 shadow-gray-100/50"
                )}>
                  Next-Gen Healthcare Platform
                </span>
              </motion.div>
              
              <motion.h1 
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight"
                variants={fadeIn}
                custom={0}
              >
                <span className={isDark ? "text-white" : "text-gray-800"}>Redefine </span>
                <span className="relative inline-block">
                  <span className={cn(
                    "bg-clip-text text-transparent",
                    isDark 
                      ? "bg-gradient-to-r from-neon-cyan to-neon-magenta" 
                      : "bg-gradient-to-r from-blue-600 to-pink-600"
                  )}>
                    Patient Care
                  </span>
                  <motion.span 
                    className={cn(
                      "absolute -bottom-1 left-0 w-full h-1 rounded-full",
                      isDark 
                        ? "bg-gradient-to-r from-neon-cyan to-neon-magenta"
                        : "bg-gradient-to-r from-blue-500 to-pink-500"
                    )}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                  ></motion.span>
                </span>
              </motion.h1>
              
              <motion.p 
                className={cn(
                  "text-lg md:text-xl mb-10 max-w-xl leading-relaxed",
                  isDark ? "text-white/70" : "text-gray-600"
                )}
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
                  variant={isDark ? "cyan" : "light"} 
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
                  <div className={cn(
                    "mr-3 rounded-full p-3 transition-all",
                    isDark 
                      ? "bg-neon-cyan/20 group-hover:bg-neon-cyan/30"
                      : "bg-blue-100 group-hover:bg-blue-200"
                  )}>
                    <Play size={16} className={isDark 
                      ? "text-neon-cyan fill-neon-cyan ml-0.5"
                      : "text-blue-600 fill-blue-600 ml-0.5"
                    } />
                  </div>
                  <span className={cn(
                    "transition-colors",
                    isDark 
                      ? "text-white group-hover:text-neon-cyan" 
                      : "text-gray-800 group-hover:text-blue-600"
                  )}>
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
                  <span className={isDark ? "text-white/50" : "text-gray-500"}>Trusted by industry leaders</span>
                  <div className={`h-[1px] flex-1 ${isDark ? "bg-gradient-to-r from-white/20" : "bg-gradient-to-r from-gray-300/50"} to-transparent`}></div>
                </div>
                
                <div className="flex flex-wrap gap-6">
                  {trustLogos.map((logo, index) => (
                    <motion.div
                      key={index}
                      className={cn(
                        "rounded-lg p-2.5 backdrop-blur-md cursor-pointer transition-all duration-300",
                        isDark 
                          ? `bg-gradient-to-br ${logo.darkColor} border border-white/10` 
                          : `bg-gradient-to-br ${logo.lightColor} border border-gray-200`
                      )}
                      initial={{ opacity: 0.5 }}
                      whileHover={{ scale: 1.05, opacity: 1 }}
                      onHoverStart={() => setActiveTrustLogo(index)}
                      onHoverEnd={() => setActiveTrustLogo(null)}
                    >
                      <span className={cn(
                        "text-sm font-medium",
                        isDark 
                          ? activeTrustLogo === index ? "text-white" : "text-white/70"
                          : activeTrustLogo === index ? "text-gray-800" : "text-gray-600"
                      )}>
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
                <div className={cn(
                  "absolute inset-0 rounded-[2rem] blur-3xl transform scale-90 opacity-40 -z-10",
                  isDark 
                    ? "bg-gradient-to-r from-neon-cyan/10 to-neon-magenta/10"
                    : "bg-gradient-to-r from-blue-200/40 to-pink-200/40"
                )}></div>
                
                <motion.div 
                  className={cn(
                    "w-80 h-80 md:w-[520px] md:h-[520px] rounded-[2rem] overflow-hidden relative border",
                    isDark ? "border-white/10" : "border-gray-200"
                  )}
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
                  <div className={cn(
                    "absolute inset-0 backdrop-blur-md z-10",
                    isDark 
                      ? "bg-gradient-to-br from-dark-secondary/80 to-dark/95" 
                      : "bg-gradient-to-br from-gray-100/80 to-white/95"
                  )}></div>
                  
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:20px_20px] z-0 opacity-30"></div>
                  
                  <div className={cn(
                    "absolute top-0 inset-x-0 h-14 flex items-center px-6 z-20 border-b",
                    isDark 
                      ? "bg-gradient-to-r from-neon-cyan/20 to-neon-magenta border-white/10" 
                      : "bg-gradient-to-r from-blue-100 to-pink-100 border-gray-200"
                  )}>
                    <div className="flex space-x-2">
                      <div className={isDark ? "w-3 h-3 rounded-full bg-neon-magenta/80" : "w-3 h-3 rounded-full bg-pink-500"}></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                      <div className={isDark ? "w-3 h-3 rounded-full bg-neon-cyan/80" : "w-3 h-3 rounded-full bg-blue-500"}></div>
                    </div>
                    <div className={cn(
                      "ml-6 text-sm font-medium",
                      isDark ? "text-white/90" : "text-gray-700"
                    )}>
                      Patient Dashboard Pro
                    </div>
                  </div>
                  
                  <div className="absolute top-14 inset-x-0 bottom-0 z-20 p-6 flex flex-col">
                    <motion.div 
                      className={cn(
                        "rounded-lg p-4 mb-6",
                        isDark 
                          ? "bg-gradient-to-r from-white/10 to-white/5" 
                          : "bg-gradient-to-r from-gray-100 to-gray-50 border border-gray-200"
                      )}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className={isDark ? "text-white font-medium" : "text-gray-800 font-medium"}>Patient Overview</div>
                          <div className={isDark ? "text-white/50 text-sm" : "text-gray-500 text-sm"}>Last 30 days</div>
                        </div>
                        <div className={isDark ? "bg-neon-cyan/20 rounded-md px-2 py-1" : "bg-blue-100 rounded-md px-2 py-1"}>
                          <span className={isDark ? "text-neon-cyan text-xs" : "text-blue-600 text-xs"}>+24.5%</span>
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
                              className={cn(
                                "w-1.5 rounded-full", 
                                isDark 
                                  ? "bg-gradient-to-t from-neon-cyan to-neon-magenta"
                                  : "bg-gradient-to-t from-blue-500 to-pink-500"
                              )}
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
                          className={cn(
                            "rounded-lg p-3 flex items-center transition-colors cursor-pointer group",
                            isDark 
                              ? "bg-white/5 hover:bg-white/10"
                              : "bg-gray-50 hover:bg-gray-100 border border-gray-200"
                          )}
                        >
                          <div className={cn(
                            "rounded-full p-2 mr-3",
                            isDark 
                              ? "bg-gradient-to-br from-neon-cyan/20 to-neon-magenta/20"
                              : "bg-gradient-to-br from-blue-100 to-pink-100"
                          )}>
                            {i === 1 && <Users size={14} className={isDark ? "text-white" : "text-gray-700"} />}
                            {i === 2 && <Stethoscope size={14} className={isDark ? "text-white" : "text-gray-700"} />}
                            {i === 3 && <Clock size={14} className={isDark ? "text-white" : "text-gray-700"} />}
                          </div>
                          <div className="flex-1">
                            <div className={cn(
                              "text-sm font-medium",
                              isDark ? "text-white" : "text-gray-800"
                            )}>
                              {i === 1 && "Patient Check-in"}
                              {i === 2 && "Medical Records"}
                              {i === 3 && "Appointment Schedule"}
                            </div>
                            <div className={cn(
                              "h-1.5 rounded-full mt-1.5 overflow-hidden",
                              isDark ? "bg-white/10" : "bg-gray-200"
                            )}>
                              <motion.div 
                                className={cn(
                                  "h-full",
                                  isDark 
                                    ? "bg-gradient-to-r from-neon-cyan to-neon-magenta"
                                    : "bg-gradient-to-r from-blue-500 to-pink-500"
                                )}
                                initial={{ width: "0%" }}
                                animate={{ width: `${i * 30}%` }}
                                transition={{ delay: 1.5 + (i * 0.2), duration: 0.7 }}
                              />
                            </div>
                          </div>
                          <motion.div 
                            className={isDark ? "ml-2 text-white/40" : "ml-2 text-gray-400"}
                            whileHover={{ x: 3 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <ArrowRight size={14} className={cn(
                              "transition-colors",
                              isDark
                                ? "group-hover:text-neon-cyan"
                                : "group-hover:text-blue-500"
                            )} />
                          </motion.div>
                        </motion.div>
                      ))}
                      
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.8 }}
                        className="grid grid-cols-2 gap-3 mt-4"
                      >
                        <div className={cn(
                          "rounded-lg p-3",
                          isDark 
                            ? "bg-gradient-to-br from-neon-cyan/10 to-neon-cyan/5 border border-neon-cyan/20"
                            : "bg-gradient-to-br from-blue-50 to-blue-25 border border-blue-200"
                        )}>
                          <div className={cn(
                            "text-xs mb-1",
                            isDark ? "text-white/70" : "text-gray-500"
                          )}>Recovery Rate</div>
                          <div className={isDark ? "text-neon-cyan text-lg font-semibold" : "text-blue-600 text-lg font-semibold"}>94.2%</div>
                        </div>
                        <div className={cn(
                          "rounded-lg p-3",
                          isDark 
                            ? "bg-gradient-to-br from-neon-magenta/10 to-neon-magenta/5 border border-neon-magenta/20"
                            : "bg-gradient-to-br from-pink-50 to-pink-25 border border-pink-200"
                        )}>
                          <div className={cn(
                            "text-xs mb-1",
                            isDark ? "text-white/70" : "text-gray-500"
                          )}>Patient Satisfaction</div>
                          <div className={isDark ? "text-neon-magenta text-lg font-semibold" : "text-pink-600 text-lg font-semibold"}>96.8%</div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                  
                  <div className={cn(
                    "absolute bottom-0 left-0 right-0 h-32 blur-xl -z-5 rounded-b-[2rem]",
                    isDark 
                      ? "bg-gradient-to-t from-neon-cyan/20 to-transparent"
                      : "bg-gradient-to-t from-blue-300/20 to-transparent"
                  )}></div>
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
          <span className={isDark ? "text-white/60" : "text-gray-500"}>Discover Features</span>
          <motion.div 
            animate={{ y: [0, 5, 0] }} 
            transition={{ duration: 1.5, repeat: Infinity }} 
            className={cn(
              "w-6 h-10 border-2 rounded-full flex justify-center pt-1",
              isDark ? "border-white/20" : "border-gray-300"
            )}
          >
            <motion.div 
              animate={{ height: [5, 10, 5] }} 
              transition={{ duration: 1.5, repeat: Infinity }} 
              className={cn(
                "w-1 rounded-full",
                isDark 
                  ? "bg-gradient-to-b from-neon-cyan to-neon-magenta"
                  : "bg-gradient-to-b from-blue-500 to-pink-500"
              )}
            />
          </motion.div>
        </motion.div>
      </section>
      
      <motion.section 
        className={cn(
          "py-20 relative overflow-hidden backdrop-blur-sm",
          isDark ? "bg-dark/50" : "bg-white/50"
        )}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Hospitals", value: "200+", color: "from-cyan-500 to-blue-600", icon: Database },
              { label: "Doctors", value: "3,500+", color: "from-fuchsia-500 to-pink-600", icon: Stethoscope },
              { label: "Patients", value: "1M+", color: "from-amber-500 to-orange-600", icon: Users },
              { label: "Daily Records", value: "25K+", color: "from-emerald-500 to-teal-600", icon: BarChart3 },
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="relative glass-card overflow-hidden rounded-2xl group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div 
                  className="absolute inset-0 bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity" 
                  style={{
                    background: `linear-gradient(to bottom right, rgb(${index * 30}, 100, 255), rgb(${index * 30 + 100}, 100, 255))`
                  }}
                ></div>
                <div className="p-6">
                  <div className={`w-12 h-12 mb-4 rounded-xl bg-gradient-to-br ${stat.color} p-2.5 flex items-center justify-center`}>
                    <stat.icon size={24} className="text-white" />
                  </div>
                  <motion.div 
                    className="text-4xl font-bold mb-1 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent"
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
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      
      <section ref={featuresRef} id="features" className="py-24 relative overflow-hidden">
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
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block mb-4">
              <span className={cn(
                "px-4 py-1.5 rounded-full text-xs uppercase font-semibold tracking-wider inline-block bg-gradient-to-r from-neon-magenta/20 to-neon-
