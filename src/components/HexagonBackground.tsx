
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const HexagonBackground: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const hexagons = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      size: Math.random() * 60 + 20,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDuration: Math.random() * 15 + 10,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.3 + 0.05
    }));
  }, []);

  // Generate sparkling stars effect
  const sparkles = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDuration: Math.random() * 3 + 1,
      delay: Math.random() * 2
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-dark-secondary/30 via-dark to-dark/95"></div>
      
      {/* Interactive gradient that follows mouse */}
      <motion.div 
        className="absolute rounded-full blur-[120px] opacity-30 pointer-events-none"
        animate={{
          x: mousePosition.x - 200,
          y: mousePosition.y - 200,
        }}
        transition={{ type: "spring", damping: 15 }}
        style={{ 
          width: '400px', 
          height: '400px', 
          background: 'radial-gradient(circle, rgba(8, 217, 214, 0.3) 0%, rgba(255, 42, 109, 0.2) 50%, transparent 80%)',
          zIndex: 1
        }}
      />
      
      {/* Grid lines with improved visual effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,.04)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_2px,transparent_2px),linear-gradient(to_right,rgba(255,255,255,.02)_2px,transparent_2px)] bg-[size:140px_140px] opacity-30"></div>
      
      {/* Floating hexagons with improved visual effect */}
      {hexagons.map((hex) => (
        <div
          key={hex.id}
          className="absolute hexagon animate-float"
          style={{
            width: `${hex.size}px`,
            height: `${hex.size * 0.866}px`,
            left: `${hex.left}%`,
            top: `${hex.top}%`,
            opacity: hex.opacity,
            animationDuration: `${hex.animationDuration}s`,
            animationDelay: `${hex.delay}s`
          }}
        ></div>
      ))}
      
      {/* Sparkling stars effect */}
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute rounded-full bg-white pointer-events-none"
          style={{
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            left: `${sparkle.left}%`,
            top: `${sparkle.top}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: sparkle.animationDuration,
            repeat: Infinity,
            delay: sparkle.delay,
          }}
        />
      ))}
      
      {/* Digital circuit lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <motion.path 
          d="M0,100 Q200,150 400,100 T800,150" 
          stroke="rgba(0, 238, 255, 0.4)" 
          strokeWidth="1" 
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.4 }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "loop", ease: "linear" }}
        />
        <motion.path 
          d="M0,200 Q300,250 600,180 T1000,200" 
          stroke="rgba(255, 42, 109, 0.3)" 
          strokeWidth="1" 
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 5, repeat: Infinity, repeatType: "loop", ease: "linear", delay: 1 }}
        />
        <motion.path 
          d="M100,0 Q150,200 100,400 T150,800" 
          stroke="rgba(216, 102, 255, 0.2)" 
          strokeWidth="1" 
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.2 }}
          transition={{ duration: 6, repeat: Infinity, repeatType: "loop", ease: "linear", delay: 2 }}
        />
      </svg>
      
      {/* Enhanced glowing orbs */}
      <motion.div 
        className="absolute top-1/4 left-1/4 rounded-full bg-neon-cyan/10 blur-[120px] animate-pulse-slow"
        style={{ width: '30rem', height: '30rem' }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div 
        className="absolute bottom-1/3 right-1/4 rounded-full bg-neon-magenta/10 blur-[100px] animate-pulse-slow" 
        style={{ width: '25rem', height: '25rem', animationDelay: '2s' }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div 
        className="absolute top-2/3 left-2/3 rounded-full bg-purple-500/10 blur-[110px] animate-pulse-slow" 
        style={{ width: '20rem', height: '20rem', animationDelay: '3.5s' }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {/* Advanced scan line effect */}
      <motion.div 
        className="absolute inset-0 scan-lines pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 2 }}
      />
      
      {/* Light burst effects */}
      <motion.div
        className="absolute -top-[10%] right-[5%] w-96 h-96 opacity-0"
        animate={{
          opacity: [0, 0.3, 0],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 4,
        }}
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%)',
          borderRadius: '50%',
        }}
      />
    </div>
  );
};

export default HexagonBackground;
