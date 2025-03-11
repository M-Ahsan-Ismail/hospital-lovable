
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedButton from "@/components/AnimatedButton";
import { Database, Stethoscope, Clock, Users, ChevronRight, ArrowRight, ShieldCheck, ClipboardCheck } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HexagonBackground from "@/components/HexagonBackground";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const boxesRef = useRef<HTMLDivElement>(null);
  const pathsRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const deviceRef = useRef<HTMLDivElement>(null);
  
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
    
    // Staggered grid animation
    if (boxesRef.current) {
      ScrollTrigger.create({
        trigger: boxesRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(
            ".feature-box",
            { 
              opacity: 0, 
              scale: 0.8,
              y: 30
            },
            { 
              opacity: 1, 
              scale: 1,
              y: 0,
              stagger: 0.1, 
              duration: 0.7, 
              ease: "power2.out"
            }
          );
        }
      });
    }
    
    // Path animation
    if (pathsRef.current) {
      ScrollTrigger.create({
        trigger: pathsRef.current,
        start: "top 70%",
        onEnter: () => {
          // Animate each path
          gsap.fromTo(
            ".connection-path",
            { strokeDashoffset: 300 },
            { strokeDashoffset: 0, duration: 1.5, ease: "power2.out", stagger: 0.2 }
          );
          
          // Animate icons
          gsap.fromTo(
            ".connection-icon",
            { opacity: 0, scale: 0.5 },
            { opacity: 1, scale: 1, duration: 0.7, stagger: 0.3, delay: 0.5 }
          );
        }
      });
    }
    
    // Features animation
    if (featuresRef.current) {
      ScrollTrigger.create({
        trigger: featuresRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(
            ".feature-item",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }
          );
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
      {/* Diagonal background with gradient boundary */}
      <div className="diagonal-gradient"></div>
      
      <Navbar />
      
      {/* Hero Section - Stripe-inspired with diagonal boundary */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 px-4 relative overflow-hidden">
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight hero-text">
                <span className="bg-gradient-to-r from-[#6772e5] via-[#9d66d6] to-[#ff2a6d] bg-clip-text text-transparent">
                  Hospital Management
                </span>
                <span className="text-gray-800"> System</span>
              </h1>
              
              <p className="text-gray-600 text-lg md:text-xl mb-8 max-w-xl hero-text">
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
                  className="text-[#6772e5] hover:text-[#424bb4] font-medium flex items-center transition-colors"
                >
                  Learn more 
                  <ArrowRight className="ml-1 h-4 w-4" />
                </button>
              </div>
              
              {/* Glow line - like Stripe */}
              <div className="glow-line w-32 mt-8 mb-4"></div>
              
              <div className="flex items-center space-x-4 mt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs text-gray-500">MD</div>
                  ))}
                </div>
                <p className="text-sm text-gray-500">Trusted by 10,000+ healthcare professionals</p>
              </div>
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
                    <div className="bg-[#6772e5] text-white p-3 rounded-t-lg device-element">
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
                            <div className="h-6 w-12 rounded-md bg-[#6772e5]/10 flex items-center justify-center">
                              <div className="w-2 h-2 rounded-full bg-[#6772e5]"></div>
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
                            <div className="h-1 bg-[#6772e5]/30 rounded-full w-full mb-1 relative">
                              <div className="absolute top-0 left-0 h-1 bg-[#6772e5] rounded-full w-3/4"></div>
                            </div>
                            <div className="h-1 bg-[#ff2a6d]/30 rounded-full w-full mb-1 relative">
                              <div className="absolute top-0 left-0 h-1 bg-[#ff2a6d] rounded-full w-2/5"></div>
                            </div>
                            <div className="h-1 bg-[#00eeff]/30 rounded-full w-full mb-1 relative">
                              <div className="absolute top-0 left-0 h-1 bg-[#00eeff] rounded-full w-3/5"></div>
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
                <div className="absolute -top-4 -left-8 w-16 h-16 bg-gradient-to-br from-[#6772e5]/20 to-[#9d66d6]/20 rounded-full floating-element"></div>
                <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-gradient-to-br from-[#ff2a6d]/20 to-[#ff9e7d]/20 rounded-full floating-element"></div>
                <div className="absolute top-1/4 -right-4 w-8 h-8 bg-gradient-to-br from-[#00eeff]/20 to-[#80e9ff]/20 rounded-full floating-element"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Staggered Grid Animation - Stripe-inspired */}
      <section ref={boxesRef} className="py-20 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              A fully integrated suite of <span className="text-[#6772e5]">healthcare tools</span>
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Our hospital management system provides intuitive tools to streamline 
              your workflow and improve patient care.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: "🏥", title: "Patient Records", desc: "Secure digital storage" },
              { icon: "💊", title: "Prescriptions", desc: "Digital prescription management" },
              { icon: "📊", title: "Analytics", desc: "Health trends and insights" },
              { icon: "🔔", title: "Notifications", desc: "Appointment reminders" },
              { icon: "📱", title: "Mobile Access", desc: "Access from any device" },
              { icon: "🔒", title: "Secure Data", desc: "HIPAA compliant security" },
              { icon: "📝", title: "Digital Forms", desc: "Paperless intake process" },
              { icon: "⏱️", title: "Time Saving", desc: "Streamlined workflows" }
            ].map((item, index) => (
              <div 
                key={index}
                className="feature-box bg-gray-50 hover:bg-gray-100 p-5 rounded-xl border border-gray-200 transition-all duration-300 hover:shadow-md hover:scale-105 transform cursor-pointer"
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <h3 className="text-gray-800 font-medium mb-1">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Path Animation Section - Stripe-inspired */}
      <section ref={pathsRef} className="py-20 bg-gradient-to-b from-white to-[#f6f9fc] relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              <span className="text-[#6772e5]">Accept</span> and <span className="text-[#6772e5]">optimize</span> patient care, globally
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Connect all aspects of healthcare management with our integrated system
            </p>
          </div>
          
          <div className="relative max-w-4xl mx-auto h-[400px] md:h-[500px]">
            {/* SVG for connection paths */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M200,200 C300,100 500,100 600,200" 
                stroke="#6772e5" 
                strokeWidth="2" 
                strokeDasharray="300" 
                strokeDashoffset="300"
                className="connection-path"
                fill="none"
              />
              <path 
                d="M600,200 C700,300 700,400 600,500" 
                stroke="#6772e5" 
                strokeWidth="2" 
                strokeDasharray="300" 
                strokeDashoffset="300"
                className="connection-path"
                fill="none"
              />
              <path 
                d="M600,500 C500,600 300,600 200,500" 
                stroke="#6772e5" 
                strokeWidth="2" 
                strokeDasharray="300" 
                strokeDashoffset="300"
                className="connection-path"
                fill="none"
              />
              <path 
                d="M200,500 C100,400 100,300 200,200" 
                stroke="#6772e5" 
                strokeWidth="2" 
                strokeDasharray="300" 
                strokeDashoffset="300"
                className="connection-path"
                fill="none"
              />
            </svg>
            
            {/* Connection points */}
            <div className="absolute top-[30%] left-[25%] connection-icon">
              <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center">
                <Database className="h-8 w-8 text-[#6772e5]" />
              </div>
              <div className="mt-2 text-center text-gray-700 font-medium">Patient Data</div>
            </div>
            
            <div className="absolute top-[30%] right-[25%] connection-icon">
              <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center">
                <Stethoscope className="h-8 w-8 text-[#6772e5]" />
              </div>
              <div className="mt-2 text-center text-gray-700 font-medium">Diagnosis</div>
            </div>
            
            <div className="absolute bottom-[30%] right-[25%] connection-icon">
              <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center">
                <Clock className="h-8 w-8 text-[#6772e5]" />
              </div>
              <div className="mt-2 text-center text-gray-700 font-medium">Appointments</div>
            </div>
            
            <div className="absolute bottom-[30%] left-[25%] connection-icon">
              <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center">
                <Users className="h-8 w-8 text-[#6772e5]" />
              </div>
              <div className="mt-2 text-center text-gray-700 font-medium">Staff Access</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section ref={featuresRef} id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              <span className="text-[#6772e5]">Advanced</span> Features
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Our hospital management system provides intuitive tools to streamline 
              your workflow and improve patient care.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Database,
                title: "Patient Records",
                description: "Securely store and access complete patient histories and medical records."
              },
              {
                icon: Stethoscope,
                title: "Disease Tracking",
                description: "Track and monitor patient diagnoses and treatment progress over time."
              },
              {
                icon: Clock,
                title: "Visit History",
                description: "Maintain detailed logs of patient visits and follow-up appointments."
              },
              {
                icon: Users,
                title: "Multi-User Access",
                description: "Role-based access for doctors and administrative staff."
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="feature-item bg-white p-6 rounded-lg border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-md hover:border-[#6772e5]/30"
              >
                <div className="w-12 h-12 rounded-full bg-[#6772e5]/10 flex items-center justify-center mb-4">
                  <feature.icon size={24} className="text-[#6772e5]" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#6772e5] to-[#9d66d6] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-20 h-20 bg-white rounded-full transform translate-x-1/2 translate-y-1/2"></div>
          <div className="absolute top-0 right-0 w-16 h-16 bg-white rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-white rounded-full transform -translate-x-1/3 -translate-y-1/2"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Ready to <span className="underline decoration-white/50 decoration-4 underline-offset-4">Modernize</span> Your Hospital Records?
            </h2>
            <p className="text-white/80 mb-10 text-lg">
              Join healthcare professionals already using our system to improve patient care and
              streamline their workflow.
            </p>
            
            <div className="inline-block">
              <Link 
                to="/signup"
                className="bg-white hover:bg-gray-100 text-[#6772e5] font-bold py-3 px-8 rounded-full shadow-lg transition-all hover:shadow-xl transform hover:-translate-y-1"
              >
                Get Started Now
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
