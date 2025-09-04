import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LightAnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "default" | "sm" | "lg";
  children: React.ReactNode;
  className?: string;
  animated?: boolean;
}

const LightAnimatedButton: React.FC<LightAnimatedButtonProps> = ({
  variant = "primary",
  size = "default",
  children,
  className,
  animated = true,
  ...props
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 shadow-lg hover:shadow-emerald-500/25";
      case "secondary":
        return "bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 shadow-lg hover:shadow-purple-500/25";
      case "outline":
        return "bg-white border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 shadow-lg";
      default:
        return "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 shadow-lg hover:shadow-emerald-500/25";
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "py-2 px-4 text-sm";
      case "lg":
        return "py-4 px-8 text-lg";
      default:
        return "py-3 px-6";
    }
  };

  return (
    <Button
      className={cn(
        "relative font-semibold rounded-xl transition-all duration-300 transform border-0",
        "focus:outline-none focus:ring-4 focus:ring-emerald-500/20",
        getVariantClasses(),
        getSizeClasses(),
        animated && "hover:scale-105 active:scale-95",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
};

export default LightAnimatedButton;