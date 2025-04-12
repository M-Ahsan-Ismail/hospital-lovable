
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const HexagonBackground: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Increased throttle delay for better performance
  useEffect(() => {
    let lastTime = 0;
    const throttleDelay = 100; // Increased from 50ms to 100ms for better performance
    
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

  // Reduced number of hexagons further for better performance
  const hexagons = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      size: Math.random() * 50 + 20, // Slightly smaller hexagons
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDuration: Math.random() * 20 + 15, // Slower animations
      delay: Math.random() * 5,
      opacity: Math.random() * 0.2 + 0.05 // Lower opacity
    }));
  }, []);

  // Reduced number of sparkles further
  const sparkles = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDuration: Math.random() * 4 + 2, // Slower animations
      delay: Math.random() * 3
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-dark-secondary/30 via-dark to-dark/95"></div>
      
      {/* Interactive gradient that follows mouse - with reduced size and blur */}
      <motion.div 
        className="absolute rounded-full blur-[80px] opacity-10 pointer-events-none"
        animate={{
          x: mousePosition.x - 150,
          y: mousePosition.y - 150,
        }}
        transition={{ 
          type: "tween",
          ease: "easeOut",
          duration: 0.8 // Slower transition for less CPU usage
        }}
        style={{ 
          width: '300px', // Smaller size
          height: '300px', 
          background: 'radial-gradient(circle, rgba(8, 217, 214, 0.2) 0%, rgba(255, 42, 109, 0.1) 50%, transparent 80%)',
          zIndex: 1,
          willChange: 'transform'
        }}
      />
      
      {/* Grid lines with even lower opacity */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:80px_80px] opacity-20"></div>
      
      {/* Floating hexagons with reduced complexity and more minimal animation */}
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
            willChange: 'transform'
          }}
        ></div>
      ))}
      
      {/* Reduced sparkles with optimized rendering */}
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute rounded-full bg-white pointer-events-none"
          style={{
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            left: `${sparkle.left}%`,
            top: `${sparkle.top}%`,
            willChange: 'transform, opacity'
          }}
          animate={{
            opacity: [0, 0.6, 0],
            scale: [0.8, 1, 0.8],
          }}
          transition={{
            duration: sparkle.animationDuration,
            repeat: Infinity,
            delay: sparkle.delay,
            ease: "linear" // Linear animations use less CPU
          }}
        />
      ))}
      
      {/* Removed SVG paths that were causing performance issues */}
      
      {/* Optimized glowing orbs with simpler animations */}
      <motion.div 
        className="absolute top-1/4 left-1/4 rounded-full bg-neon-cyan/5 blur-[100px]"
        style={{ width: '20rem', height: '20rem' }} // Reduced size
        animate={{
          opacity: [0.05, 0.08, 0.05],
        }}
        transition={{
          duration: 15, // Slower animation
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {/* Reduced opacity scan lines */}
      <div className="absolute inset-0 scan-lines pointer-events-none opacity-[0.02]"></div>
    </div>
  );
};

export default HexagonBackground;
