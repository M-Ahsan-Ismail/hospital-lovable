
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedButton from "@/components/AnimatedButton";
import { Database, Stethoscope, Clock, Users, ChevronRight, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const boxesRef = useRef<HTMLDivElement>(null);
  const pathsRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Main page animation
    gsap.fromTo(
      ".hero-text",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.2, duration: 0.8, ease: "power2.out" }
    );
    
    // Dashboard animation
    gsap.fromTo(
      ".dashboard-preview",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power2.out" }
    );
    
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
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col bg-white" ref={mainRef}>
      <Navbar />
      
      {/* Hero Section - Stripe-inspired */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 px-4 bg-gradient-to-b from-[#f6f9fc] to-white">
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight text-gray-800 hero-text">
                <span>Hospital Management </span>
                <span className="bg-gradient-to-r from-[#6772e5] to-[#9d66d6] bg-clip-text text-transparent">
                  System
                </span>
              </h1>
              
              <p className="text-gray-600 text-lg md:text-xl mb-8 max-w-xl hero-text">
                Efficient Patient Record Management for healthcare professionals. 
                Track patient history, visits, and medical information with our 
                secure digital solution.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 hero-text">
                <AnimatedButton variant="cyan" size="lg">
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
            </div>
            
            <div className="md:w-1/2 flex justify-center md:justify-end">
              <div className="dashboard-preview relative">
                <div className="w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-r from-[#6772e5]/20 to-[#9d66d6]/20 filter blur-3xl absolute -z-10"></div>
                <div className="w-[300px] md:w-[420px] bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xl">
                  <div className="h-10 bg-gray-100 border-b border-gray-200 flex items-center px-4">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f57] mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e] mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-[#28ca41]"></div>
                    <div className="ml-4 text-gray-600 text-sm">Patient Dashboard</div>
                  </div>
                  <div className="p-4">
                    <div className="h-8 bg-gray-100 rounded-md w-2/3 mb-4"></div>
                    <div className="space-y-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex items-center">
                          <div className="w-8 h-8 rounded-md bg-[#6772e5]/10 flex items-center justify-center">
                            <div className="w-4 h-4 rounded-sm bg-[#6772e5]/60"></div>
                          </div>
                          <div className="ml-3 flex-1">
                            <div className="h-2 bg-gray-200 rounded-md w-full"></div>
                            <div className="h-2 bg-gray-100 rounded-md w-4/5 mt-2"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 p-2 bg-[#6772e5]/10 rounded-md flex justify-between items-center">
                      <div className="w-1/3 h-2 bg-[#6772e5]/20 rounded-md"></div>
                      <div className="w-16 h-6 bg-[#6772e5]/20 rounded-md"></div>
                    </div>
                  </div>
                </div>
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
