
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedButton from "@/components/AnimatedButton";
import { Database, Stethoscope, Clock, Users, ChevronRight, ArrowRight, ShieldCheck, ClipboardCheck, Heart, Activity, Zap, Shield } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HexagonBackground from "@/components/HexagonBackground";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const pathsRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const deviceRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [pathsVisible, setPathsVisible] = useState(false);
  
  useEffect(() => {
    // Main page animation
    gsap.fromTo(
      ".hero-text",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.2, duration: 0.8, ease: "power2.out" }
    );
    
    // Hospital device animation
    gsap.fromTo(
      ".hospital-device",
      { opacity: 0, y: 30, rotateY: -20 },
      { opacity: 1, y: 0, rotateY: -10, duration: 1, delay: 0.5, ease: "power2.out" }
    );
    
    // Floating elements
    gsap.to(".floating-element", {
      y: "-20px",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.2
    });
    
    // Learn more button animation
    gsap.fromTo(
      ".learn-more",
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.8, ease: "power2.out" }
    );
    
    // Title word animations
    if (titleRef.current) {
      // Animate the connecting lines between words
      gsap.fromTo(
        ".word-connecting-line",
        { 
          width: 0,
          opacity: 0
        },
        { 
          width: "100%",
          opacity: 1,
          duration: 1.5,
          stagger: 0.3,
          delay: 0.5,
          ease: "power2.inOut"
        }
      );
      
      // Animate the word glows
      gsap.fromTo(
        ".word-border-gradient",
        { 
          opacity: 0,
          scale: 0.95
        },
        { 
          opacity: 1, 
          scale: 1,
          stagger: 0.3,
          duration: 1,
          ease: "back.out(1.7)"
        }
      );
    }
    
    // Advanced features animation with scrolltrigger
    if (featuresRef.current) {
      ScrollTrigger.create({
        trigger: featuresRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(
            ".feature-card",
            { 
              opacity: 0, 
              y: 30,
              scale: 0.95
            },
            { 
              opacity: 1, 
              y: 0,
              scale: 1,
              stagger: 0.15, 
              duration: 0.8, 
              ease: "back.out(1.5)"
            }
          );
          
          // Animate feature icons separately
          gsap.fromTo(
            ".feature-icon",
            { opacity: 0, scale: 0.8, y: 15 },
            { 
              opacity: 1, 
              scale: 1, 
              y: 0,
              stagger: 0.2, 
              duration: 0.8,
              delay: 0.2,
              ease: "back.out(2)"
            }
          );
        }
      });
    }
    
    // CTA section animation
    if (ctaRef.current) {
      ScrollTrigger.create({
        trigger: ctaRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(
            ".cta-text",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, stagger: 0.2, duration: 0.8, ease: "power2.out" }
          );
          
          gsap.fromTo(
            ".cta-button",
            { opacity: 0, y: 20, scale: 0.9 },
            { opacity: 1, y: 0, scale: 1, duration: 0.8, delay: 0.4, ease: "back.out(1.7)" }
          );
          
          gsap.fromTo(
            ".cta-glow",
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 1.2, delay: 0.6, ease: "elastic.out(1, 0.5)" }
          );
        }
      });
    }
    
    // Path animation with enhanced effects
    if (pathsRef.current) {
      ScrollTrigger.create({
        trigger: pathsRef.current,
        start: "top 70%",
        onEnter: () => {
          setPathsVisible(true);
          
          // Animate each path with staggered timing
          gsap.fromTo(
            ".connection-path",
            { strokeDashoffset: 300 },
            { strokeDashoffset: 0, duration: 1.5, ease: "power2.out", stagger: 0.2 }
          );
          
          // Animate icons with 3D effect
          gsap.fromTo(
            ".connection-icon",
            { 
              opacity: 0, 
              scale: 0.5,
              y: 20,
              rotationY: 45
            },
            { 
              opacity: 1, 
              scale: 1, 
              y: 0,
              rotationY: 0,
              duration: 0.8, 
              stagger: 0.3, 
              delay: 0.5,
              ease: "back.out(1.7)"
            }
          );
          
          // Add floating effect to connection icons after they appear
          gsap.to(".connection-icon", {
            y: "-10px",
            duration: 2,
            delay: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: 0.2
          });
        }
      });
    }
    
    // Device animation
    if (deviceRef.current) {
      ScrollTrigger.create({
        trigger: deviceRef.current,
        start: "top 70%",
        onEnter: () => {
          gsap.fromTo(
            ".device-element",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.2, ease: "power2.out" }
          );
        }
      });
    }
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col bg-white" ref={mainRef}>
      {/* Diagonal background with gradient boundary - covers the entire hero section */}
      <div className="diagonal-gradient animate-gradient"></div>
      
      <Navbar />
      
      {/* Hero Section - Stripe-inspired with diagonal boundary */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 px-4 relative overflow-hidden">
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <div ref={titleRef} className="mb-4 relative">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight hero-text">
                  <span className="word-border-gradient px-1 py-0.5 mr-2">Hospital</span>
                  <span className="word-border-gradient px-1 py-0.5 mr-2">Management</span>
                  <span className="word-border-gradient px-1 py-0.5">System</span>
                  
                  {/* Connecting lines between words */}
                  <span className="word-connecting-line" style={{left: "calc(8.5ch - 5px)", width: "10ch"}}></span>
                  <span className="word-connecting-line" style={{left: "calc(19.5ch - 5px)", width: "7ch"}}></span>
                </h1>
              </div>
              
              <p className="text-white/90 text-lg md:text-xl mb-8 max-w-xl hero-text">
                Efficient Patient Record Management for healthcare professionals. 
                Track patient history, visits, and medical information with our 
                secure digital solution.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 hero-text">
                <AnimatedButton variant="magenta" size="lg">
                  <Link to="/signup" className="flex items-center">
                    Get Started
                    <ChevronRight className="ml-2" size={18} />
                  </Link>
                </AnimatedButton>
                
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    featuresRef.current?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="learn-more learn-more-button"
                >
                  Learn more 
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              
              {/* Glow line - like Stripe */}
              <div className="glow-line w-32 mt-8 mb-4"></div>
            </div>
            
            <div ref={deviceRef} className="md:w-1/2 flex justify-center md:justify-end hospital-image-container">
              {/* Hospital application device mockup with screen */}
              <div className="hospital-device relative w-[300px] md:w-[420px] rounded-2xl overflow-hidden shadow-xl">
                {/* Device frame */}
                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                  {/* Device header with camera & speaker */}
                  <div className="h-6 bg-gray-100 flex items-center justify-center border-b border-gray-200">
                    <div className="w-16 h-2 bg-gray-200 rounded-full"></div>
                  </div>
                  
                  {/* Screen mockup */}
                  <div className="p-4">
                    <div className="bg-[#6B46C1] text-white p-3 rounded-t-lg device-element">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
                          <ShieldCheck className="w-4 h-4 text-white" />
                        </div>
                        <div className="text-sm font-medium">Hospital Dashboard</div>
                      </div>
                    </div>
                    
                    <div className="bg-white border border-gray-200 p-3 rounded-b-lg shadow-sm device-element">
                      {/* Patient cards */}
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center py-2 border-b border-gray-100 device-element">
                          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                            <span className="text-xs text-gray-500">P{i}</span>
                          </div>
                          <div className="flex-1">
                            <div className="h-2.5 bg-gray-100 rounded-full w-24 mb-1.5"></div>
                            <div className="h-2 bg-gray-50 rounded-full w-16"></div>
                          </div>
                          <div className="ml-2">
                            <div className="h-6 w-12 rounded-md bg-[#6B46C1]/10 flex items-center justify-center">
                              <div className="w-2 h-2 rounded-full bg-[#6B46C1]"></div>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {/* Stats area */}
                      <div className="grid grid-cols-2 gap-2 mt-3 device-element">
                        <div className="bg-gray-50 p-2 rounded-md">
                          <div className="h-2 bg-gray-100 rounded-full w-12 mb-1"></div>
                          <div className="h-4 bg-gray-200 rounded-full w-10"></div>
                        </div>
                        <div className="bg-gray-50 p-2 rounded-md">
                          <div className="h-2 bg-gray-100 rounded-full w-12 mb-1"></div>
                          <div className="h-4 bg-gray-200 rounded-full w-10"></div>
                        </div>
                      </div>
                      
                      {/* EHR visualization */}
                      <div className="mt-3 p-2 border border-dashed border-gray-200 rounded-md device-element">
                        <div className="flex items-center mb-2">
                          <ClipboardCheck className="w-4 h-4 text-gray-400 mr-2" />
                          <div className="h-2 bg-gray-100 rounded-full w-32"></div>
                        </div>
                        <div className="h-20 bg-gray-50 rounded-md flex items-center justify-center">
                          <div className="w-full px-2">
                            <div className="h-1 bg-[#6B46C1]/30 rounded-full w-full mb-1 relative">
                              <div className="absolute top-0 left-0 h-1 bg-[#6B46C1] rounded-full w-3/4"></div>
                            </div>
                            <div className="h-1 bg-[#ED64A6]/30 rounded-full w-full mb-1 relative">
                              <div className="absolute top-0 left-0 h-1 bg-[#ED64A6] rounded-full w-2/5"></div>
                            </div>
                            <div className="h-1 bg-[#F6AD55]/30 rounded-full w-full mb-1 relative">
                              <div className="absolute top-0 left-0 h-1 bg-[#F6AD55] rounded-full w-3/5"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Device home indicator */}
                  <div className="h-6 flex items-center justify-center">
                    <div className="w-32 h-1 bg-gray-200 rounded-full"></div>
                  </div>
                </div>
                
                {/* Floating elements around the device */}
                <div className="absolute -top-4 -left-8 w-16 h-16 bg-gradient-to-br from-[#6B46C1]/20 to-[#ED64A6]/20 rounded-full floating-element"></div>
                <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-gradient-to-br from-[#ED64A6]/20 to-[#F6AD55]/20 rounded-full floating-element"></div>
                <div className="absolute top-1/4 -right-4 w-8 h-8 bg-gradient-to-br from-[#6B46C1]/20 to-[#ED64A6]/20 rounded-full floating-element"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Path Animation Section - Enhanced with 3D and floating effects */}
      <section ref={pathsRef} className="py-20 connection-section relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              <span className="bg-gradient-to-r from-[#6B46C1] to-[#ED64A6] bg-clip-text text-transparent">Accept</span> and <span className="bg-gradient-to-r from-[#ED64A6] to-[#F6AD55] bg-clip-text text-transparent">optimize</span> patient care, globally
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Connect all aspects of healthcare management with our integrated system
            </p>
          </div>
          
          <div className={`relative max-w-4xl mx-auto h-[400px] md:h-[500px] ${pathsVisible ? 'visible' : ''}`}>
            {/* Enhanced SVG for connection paths with glow effects */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="gradientPath1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6B46C1" />
                  <stop offset="100%" stopColor="#ED64A6" />
                </linearGradient>
                <linearGradient id="gradientPath2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ED64A6" />
                  <stop offset="100%" stopColor="#F6AD55" />
                </linearGradient>
                <linearGradient id="gradientPath3" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F6AD55" />
                  <stop offset="100%" stopColor="#6B46C1" />
                </linearGradient>
                <linearGradient id="gradientPath4" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6B46C1" />
                  <stop offset="100%" stopColor="#F6AD55" />
                </linearGradient>
                
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              
              <path 
                d="M200,200 C300,100 500,100 600,200" 
                stroke="url(#gradientPath1)" 
                strokeWidth="3" 
                className="connection-path"
                fill="none"
                filter="url(#glow)"
              />
              <path 
                d="M600,200 C700,300 700,400 600,500" 
                stroke="url(#gradientPath2)" 
                strokeWidth="3" 
                className="connection-path"
                fill="none"
                filter="url(#glow)"
              />
              <path 
                d="M600,500 C500,600 300,600 200,500" 
                stroke="url(#gradientPath3)" 
                strokeWidth="3" 
                className="connection-path"
                fill="none"
                filter="url(#glow)"
              />
              <path 
                d="M200,500 C100,400 100,300 200,200" 
                stroke="url(#gradientPath4)" 
                strokeWidth="3" 
                className="connection-path"
                fill="none"
                filter="url(#glow)"
              />
            </svg>
            
            {/* Enhanced Connection points with 3D rotation and shadow */}
            <div className="absolute top-[30%] left-[25%] connection-icon transform transition-all duration-500 hover:scale-110">
              <div className="w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center transform transition-all duration-500 hover:rotate-y-12">
                <Database className="h-8 w-8 text-[#6B46C1]" />
              </div>
              <div className="mt-2 text-center text-gray-700 font-medium">Patient Data</div>
            </div>
            
            <div className="absolute top-[30%] right-[25%] connection-icon transform transition-all duration-500 hover:scale-110">
              <div className="w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center transform transition-all duration-500 hover:rotate-y-12">
                <Stethoscope className="h-8 w-8 text-[#ED64A6]" />
              </div>
              <div className="mt-2 text-center text-gray-700 font-medium">Diagnosis</div>
            </div>
            
            <div className="absolute bottom-[30%] right-[25%] connection-icon transform transition-all duration-500 hover:scale-110">
              <div className="w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center transform transition-all duration-500 hover:rotate-y-12">
                <Clock className="h-8 w-8 text-[#F6AD55]" />
              </div>
              <div className="mt-2 text-center text-gray-700 font-medium">Appointments</div>
            </div>
            
            <div className="absolute bottom-[30%] left-[25%] connection-icon transform transition-all duration-500 hover:scale-110">
              <div className="w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center transform transition-all duration-500 hover:rotate-y-12">
                <Users className="h-8 w-8 text-[#6B46C1]" />
              </div>
              <div className="mt-2 text-center text-gray-700 font-medium">Staff Access</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Enhanced Features Section - Now with glowing animated cards */}
      <section ref={featuresRef} id="features" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              <span className="text-gradient-primary">Advanced</span> Features
            </h2>
            <p className="text-white/70 max-w-xl mx-auto">
              Our hospital management system provides intuitive tools to streamline 
              your workflow and improve patient care.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Database,
                title: "Patient Records",
                description: "Securely store and access complete patient histories and medical records.",
                color: "from-purple-500 to-purple-600",
                iconColor: "text-purple-400",
                borderColor: "border-purple-500/50",
                glowColor: "purple"
              },
              {
                icon: Activity,
                title: "Disease Tracking",
                description: "Track and monitor patient diagnoses and treatment progress over time.",
                color: "from-pink-500 to-pink-600",
                iconColor: "text-pink-400",
                borderColor: "border-pink-500/50",
                glowColor: "pink"
              },
              {
                icon: Clock,
                title: "Visit History",
                description: "Maintain detailed logs of patient visits and follow-up appointments.",
                color: "from-orange-500 to-orange-600",
                iconColor: "text-orange-400",
                borderColor: "border-orange-500/50",
                glowColor: "orange"
              },
              {
                icon: Shield,
                title: "Multi-User Access",
                description: "Role-based access for doctors and administrative staff.",
                color: "from-blue-500 to-blue-600",
                iconColor: "text-blue-400",
                borderColor: "border-blue-500/50",
                glowColor: "blue"
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="feature-card glowing-card-wrapper"
              >
                <div className={`feature-card-inner bg-black border ${feature.borderColor} p-6 rounded-2xl relative z-10 h-full`}>
                  <div className={`feature-icon ${feature.iconColor} bg-gradient-to-br from-${feature.glowColor}-500/10 to-${feature.glowColor}-600/10`}>
                    <feature.icon size={28} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                  <p className="text-white/70">{feature.description}</p>
                </div>
                <div className={`glow-effect glow-${feature.glowColor}`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Enhanced CTA Section with more dynamic visuals */}
      <section ref={ctaRef} className="py-20 relative overflow-hidden">
        {/* Enhanced dynamic background with 3D layers */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#6B46C1] to-[#ED64A6] animate-gradient z-0"></div>
        
        {/* Enhanced animated background elements with 3D rotation */}
        <div className="absolute inset-0 z-1">
          <div className="absolute top-10 left-1/4 w-24 h-24 rounded-full bg-white/10 animate-float transform rotate-12 backdrop-blur-sm"></div>
          <div className="absolute bottom-20 right-1/3 w-32 h-32 rounded-full bg-white/5 animate-float transform -rotate-12 backdrop-blur-sm" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute top-1/3 right-1/4 w-16 h-16 rounded-full bg-white/10 animate-float transform rotate-45 backdrop-blur-sm" style={{animationDelay: '1s'}}></div>
          <div className="absolute cta-glow top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full bg-white/5 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white cta-text relative inline-block">
              Ready to <span className="relative px-2">
                <span className="absolute inset-0 w-full h-full bg-white/10 rounded-md transform -skew-x-12"></span>
                <span className="relative">Modernize</span>
              </span> Your Hospital Records?
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
            </h2>
            
            <p className="text-white/80 mb-10 text-lg cta-text">
              Join healthcare professionals already using our system to improve patient care and
              streamline their workflow.
            </p>
            
            <div className="inline-block cta-button relative overflow-hidden group">
              <Link 
                to="/signup"
                className="custom-get-started-button group-hover:text-white"
              >
                Get Started Now
              </Link>
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#6B46C1]/30 to-[#ED64A6]/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
