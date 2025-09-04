import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const LightHexagonBackground: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    let rafId: number;
    let lastMouseEvent: MouseEvent | null = null;
    let isUpdating = false;
    
    const updateMousePosition = () => {
      if (lastMouseEvent && !isUpdating) {
        isUpdating = true;
        setMousePosition({
          x: lastMouseEvent.clientX,
          y: lastMouseEvent.clientY
        });
        lastMouseEvent = null;
        isUpdating = false;
      }
      rafId = requestAnimationFrame(updateMousePosition);
    };
    
    const handleMouseMove = (event: MouseEvent) => {
      lastMouseEvent = event;
    };
    
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    updateMousePosition();
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const hexagons = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      size: Math.random() * 40 + 15,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDuration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.08 + 0.02
    }));
  }, []);

  const sparkles = useMemo(() => {
    return Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDuration: Math.random() * 4 + 2,
      delay: Math.random() * 3
    }));
  }, []);
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden will-change-transform">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100"></div>
      
      <motion.div 
        className="absolute rounded-full blur-[100px] opacity-20 pointer-events-none"
        animate={{
          x: mousePosition.x - 150,
          y: mousePosition.y - 150,
        }}
        transition={{ 
          type: "spring",
          damping: 25,
          stiffness: 100,
          duration: 0.3
        }}
        style={{ 
          width: '300px',
          height: '300px', 
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, rgba(139, 92, 246, 0.1) 50%, transparent 80%)',
          zIndex: 1,
          willChange: 'transform',
          transform: 'translateZ(0)'
        }}
      />
      
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,.08)_1px,transparent_1px),linear-gradient(to_right,rgba(148,163,184,.08)_1px,transparent_1px)] bg-[size:80px_80px] opacity-30"></div>
      
      {hexagons.map((hex) => (
        <div
          key={hex.id}
          className="absolute"
          style={{
            width: `${hex.size}px`,
            height: `${hex.size * 0.866}px`,
            left: `${hex.left}%`,
            top: `${hex.top}%`,
            opacity: hex.opacity,
            animation: `float ${hex.animationDuration}s ease-in-out infinite`,
            animationDelay: `${hex.delay}s`,
            willChange: 'transform',
            transform: 'translateZ(0)',
            clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.2)'
          }}
        ></div>
      ))}
      
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute rounded-full bg-emerald-400 pointer-events-none"
          style={{
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            left: `${sparkle.left}%`,
            top: `${sparkle.top}%`,
            willChange: 'transform, opacity',
            transform: 'translateZ(0)'
          }}
          animate={{
            opacity: [0, 0.4, 0],
            scale: [0.8, 1, 0.8],
          }}
          transition={{
            duration: sparkle.animationDuration,
            repeat: Infinity,
            delay: sparkle.delay,
            ease: "linear"
          }}
        />
      ))}
      
      <motion.div 
        className="absolute top-1/4 left-1/4 rounded-full bg-emerald-400/10 blur-[120px]"
        style={{ 
          width: '20rem', 
          height: '20rem',
          willChange: 'opacity',
          transform: 'translateZ(0)'
        }}
        animate={{
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
    </div>
  );
};

export default LightHexagonBackground;