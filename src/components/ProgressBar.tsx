
import React from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  variant?: "cyan" | "magenta" | "mixed";
  className?: string;
  showPercentage?: boolean;
  isLoading?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  variant = "cyan",
  className,
  showPercentage = false,
  isLoading = false
}) => {
  return (
    <div className={cn("w-full", className)}>
      <div className="relative">
        <Progress
          value={isLoading ? 0 : value}
          className={cn(
            "h-1.5 w-full bg-white/10",
            className
          )}
        />
        <div 
          className={cn(
            "absolute inset-0 pointer-events-none",
            variant === "cyan" && "bg-gradient-to-r from-neon-cyan via-neon-cyan/70 to-neon-cyan/0",
            variant === "magenta" && "bg-gradient-to-r from-neon-magenta via-neon-magenta/70 to-neon-magenta/0",
            variant === "mixed" && "bg-gradient-to-r from-neon-cyan via-neon-magenta to-transparent"
          )}
          style={{ 
            width: `${value}%`,
            opacity: 0.3,
            clipPath: "inset(0 0 0 0)" 
          }}
        />
      </div>
      
      {showPercentage && (
        <div className="mt-1 text-xs text-right text-white/60">
          {isLoading ? "Loading..." : `${value}%`}
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
