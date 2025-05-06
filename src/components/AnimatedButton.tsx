
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type AnimatedButtonVariant = "default" | "outline" | "cyan" | "magenta" | "light";
type AnimatedButtonSize = "default" | "sm" | "lg" | "xl";

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: AnimatedButtonVariant;
  size?: AnimatedButtonSize;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  onClick,
  className,
  variant = "default",
  size = "default",
  disabled = false,
  type = "button",
}) => {
  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={cn(
        "relative rounded-full overflow-hidden transition-all duration-300",
        "font-semibold text-white outline-none focus:outline-none",
        "flex items-center justify-center",
        // Size variants
        size === "default" && "px-6 py-2.5 text-sm",
        size === "sm" && "px-4 py-1.5 text-xs",
        size === "lg" && "px-8 py-3 text-base",
        size === "xl" && "px-12 py-4 text-lg",
        // Button variants
        variant === "default" && "bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/10",
        variant === "outline" && "bg-transparent border border-white/20 hover:border-white/50 backdrop-blur-sm",
        variant === "cyan" && "bg-gradient-to-r from-neon-cyan/80 to-neon-cyan/60 hover:from-neon-cyan hover:to-neon-cyan/80 shadow-glow-cyan",
        variant === "magenta" && "bg-gradient-to-r from-neon-magenta/80 to-neon-magenta/60 hover:from-neon-magenta hover:to-neon-magenta/80 shadow-glow-magenta",
        variant === "light" && "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-sm text-white border-none",
        // Disabled state
        disabled && "opacity-50 cursor-not-allowed hover:scale-100",
        className
      )}
    >
      {children}

      {/* Add animated glow effect for the neon variants */}
      {(variant === "cyan" || variant === "magenta") && (
        <motion.div
          className={cn(
            "absolute inset-0 opacity-0",
            variant === "cyan" && "bg-neon-cyan",
            variant === "magenta" && "bg-neon-magenta"
          )}
          animate={{
            opacity: [0, 0.2, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
          }}
        />
      )}
    </motion.button>
  );
};

export default AnimatedButton;
