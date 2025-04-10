
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const HexagonBackground: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Throttle mouse move event for better performance
  useEffect(() => {
    let lastTime = 0;
    const throttleDelay = 50; // ms
    
    const handleMouseMove = (event: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime > throttleDelay) {
        setMousePosition({
          x: event.clientX,
          y: event.clientY
        });
        lastTime = now;
      }
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Reduce number of hexagons to improve performance
  const hexagons = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      size: Math.random() * 60 + 20,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDuration: Math.random() * 15 + 10,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.3 + 0.05
    }));
  }, []);

  // Reduce number of sparkles
  const sparkles = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
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
      
      {/* Interactive gradient that follows mouse - optimized animation */}
      <motion.div 
        className="absolute rounded-full blur-[100px] opacity-20 pointer-events-none"
        animate={{
          x: mousePosition.x - 200,
          y: mousePosition.y - 200,
        }}
        transition={{ 
          type: "tween", // Use tween instead of spring for better performance
          ease: "easeOut",
          duration: 0.5 
        }}
        style={{ 
          width: '350px', 
          height: '350px', 
          background: 'radial-gradient(circle, rgba(8, 217, 214, 0.3) 0%, rgba(255, 42, 109, 0.2) 50%, transparent 80%)',
          zIndex: 1,
          willChange: 'transform' // Optimize for animation performance
        }}
      />
      
      {/* Grid lines with reduced opacity and complexity */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:60px_60px] opacity-30"></div>
      
      {/* Floating hexagons with reduced complexity */}
      {hexagons.map((hex) => (
        <div
          key={hex.id}
          className="absolute hexagon"
          style={{
            width: `${hex.size}px`,
            height: `${hex.size * 0.866}px`,
            left: `${hex.left}%`,
            top: `${hex.top}%`,
            opacity: hex.opacity,
            animation: `float ${hex.animationDuration}s ease-in-out infinite`,
            animationDelay: `${hex.delay}s`,
            willChange: 'transform' // Optimize for animation performance
          }}
        ></div>
      ))}
      
      {/* Reduced sparkles with optimized animations */}
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute rounded-full bg-white pointer-events-none"
          style={{
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            left: `${sparkle.left}%`,
            top: `${sparkle.top}%`,
            willChange: 'transform, opacity' // Optimize for animation performance
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0.8, 1.1, 0.8],
          }}
          transition={{
            duration: sparkle.animationDuration,
            repeat: Infinity,
            delay: sparkle.delay,
            ease: "easeInOut" // Smoother animation
          }}
        />
      ))}
      
      {/* Simplified SVG paths */}
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <motion.path 
          d="M0,100 Q400,150 800,100" 
          stroke="rgba(0, 238, 255, 0.4)" 
          strokeWidth="1" 
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 6, repeat: Infinity, repeatType: "loop", ease: "linear" }}
        />
      </svg>
      
      {/* Simplified glowing orbs with fewer animations */}
      <motion.div 
        className="absolute top-1/4 left-1/4 rounded-full bg-neon-cyan/10 blur-[80px]"
        style={{ width: '25rem', height: '25rem' }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.08, 0.15, 0.08],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {/* Simplified scan line effect */}
      <motion.div 
        className="absolute inset-0 scan-lines pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.03 }}
        transition={{ duration: 2 }}
      />
    </div>
  );
};

export default HexagonBackground;
