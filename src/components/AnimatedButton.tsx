
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "cyan" | "magenta" | "outline";
  size?: "default" | "sm" | "lg";
  children: React.ReactNode;
  className?: string;
  animated?: boolean;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  variant = "cyan",
  size = "default",
  children,
  className,
  animated = true,
  ...props
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "cyan":
        return "bg-modern-blue text-white hover:bg-modern-blue/90 focus:ring-modern-blue/30 shadow-lg shadow-modern-blue/25";
      case "magenta":
        return "bg-modern-purple text-white hover:bg-modern-purple/90 focus:ring-modern-purple/30 shadow-lg shadow-modern-purple/25";
      case "outline":
        return "bg-transparent border-2 border-modern-blue text-modern-blue hover:bg-modern-blue/5";
      default:
        return "bg-modern-blue text-white hover:bg-modern-blue/90 focus:ring-modern-blue/30 shadow-lg shadow-modern-blue/25";
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "py-1 px-3 text-sm";
      case "lg":
        return "py-3 px-8 text-lg";
      default:
        return "py-2 px-6";
    }
  };

  return (
    <Button
      className={cn(
        "relative font-medium rounded-md transition-all duration-300 transform",
        "focus:outline-none focus:ring-4 focus:ring-opacity-50",
        getVariantClasses(),
        getSizeClasses(),
        animated && "hover:scale-105 active:scale-95",
        animated && variant === "cyan" && "hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]",
        animated && variant === "magenta" && "hover:shadow-[0_0_25px_rgba(168,85,247,0.4)]",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
};

export default AnimatedButton;
