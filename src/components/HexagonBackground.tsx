
import React from "react";
import { motion } from "framer-motion";

const HexagonBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 hexagon-bg opacity-20 pointer-events-none z-0">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,238,255,.01)_1px,transparent_1px),linear-gradient(to_right,rgba(0,238,255,.01)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      
      {Array.from({ length: 8 }).map((_, index) => (
        <motion.div
          key={`hex-${index}`}
          className="absolute opacity-10"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${50 + Math.random() * 100}px`,
            height: `${50 + Math.random() * 100}px`,
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            background: index % 2 ? "linear-gradient(to right, #00EEFF, transparent)" : "linear-gradient(to right, #FF2A6D, transparent)",
          }}
          animate={{
            x: [0, Math.random() * 50 - 25, 0],
            y: [0, Math.random() * 50 - 25, 0],
            opacity: [0.05, 0.2, 0.05],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default HexagonBackground;
