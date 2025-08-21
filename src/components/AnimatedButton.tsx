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
        return "bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 focus:ring-blue-500/20 shadow-lg";
      case "magenta":
        return "bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 focus:ring-pink-500/20 shadow-lg";
      case "outline":
        return "bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 shadow-md";
      default:
        return "bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 focus:ring-blue-500/20 shadow-lg";
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "py-2 px-4 text-sm";
      case "lg":
        return "py-3 px-8 text-lg";
      default:
        return "py-2.5 px-6";
    }
  };

  return (
    <Button
      className={cn(
        "relative font-medium rounded-lg transition-all duration-300 transform",
        "focus:outline-none focus:ring-4 focus:ring-opacity-50",
        getVariantClasses(),
        getSizeClasses(),
        animated && "hover:scale-105 active:scale-95 hover:shadow-xl",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
};

export default AnimatedButton;