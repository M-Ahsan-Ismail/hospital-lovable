
import React, { useEffect, useMemo } from "react";

const HexagonBackground: React.FC = () => {
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

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-dark-secondary/20 via-dark to-dark/95"></div>
      
      {/* Grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30"></div>
      
      {/* Floating hexagons */}
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
      
      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-neon-cyan/5 blur-[100px] animate-pulse-slow"></div>
      <div className="absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full bg-neon-magenta/5 blur-[80px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-2/3 left-2/3 w-64 h-64 rounded-full bg-purple-500/5 blur-[90px] animate-pulse-slow" style={{ animationDelay: '3.5s' }}></div>
    </div>
  );
};

export default HexagonBackground;
