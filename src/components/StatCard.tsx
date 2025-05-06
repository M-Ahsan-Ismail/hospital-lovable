
import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  variant?: "cyan" | "magenta" | "mixed";
  className?: string;
  theme?: "dark" | "light";
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  description,
  variant = "cyan",
  className,
  theme = "dark",
}) => {
  const isDark = theme === "dark";
  
  return (
    <div
      className={cn(
        "relative rounded-lg overflow-hidden glass-card p-5 animate-fade-in transition-transform duration-300 hover:scale-[1.03] group backdrop-blur-md border",
        isDark && variant === "cyan" && "border-neon-cyan/30 hover:border-neon-cyan/70 bg-gradient-to-br from-neon-cyan/5 to-transparent",
        isDark && variant === "magenta" && "border-neon-magenta/30 hover:border-neon-magenta/70 bg-gradient-to-br from-neon-magenta/5 to-transparent",
        isDark && variant === "mixed" && "border-neon-cyan/30 hover:border-neon-magenta/70 bg-gradient-to-br from-neon-cyan/5 to-neon-magenta/5",
        !isDark && variant === "cyan" && "border-blue-300 hover:border-blue-400 bg-gradient-to-br from-blue-50 to-white shadow-sm",
        !isDark && variant === "magenta" && "border-pink-300 hover:border-pink-400 bg-gradient-to-br from-pink-50 to-white shadow-sm",
        !isDark && variant === "mixed" && "border-purple-300 hover:border-purple-400 bg-gradient-to-br from-blue-50 to-pink-50 shadow-sm",
        className
      )}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className={cn(
            "text-lg font-medium mb-1",
            isDark ? "text-white/90" : "text-gray-700"
          )}>
            {title}
          </h3>
          <p className={cn(
            "text-3xl font-bold mb-1", 
            isDark && variant === "cyan" && "text-neon-cyan drop-shadow-glow",
            isDark && variant === "magenta" && "text-neon-magenta drop-shadow-glow",
            isDark && variant === "mixed" && "bg-clip-text text-transparent bg-gradient-to-r from-neon-cyan to-neon-magenta drop-shadow-glow",
            !isDark && variant === "cyan" && "text-blue-600",
            !isDark && variant === "magenta" && "text-pink-600",
            !isDark && variant === "mixed" && "bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-pink-600"
          )}>
            {value}
          </p>
          {description && (
            <p className={cn(
              "text-sm",
              isDark ? "text-white/60" : "text-gray-500"
            )}>
              {description}
            </p>
          )}
        </div>
        <div className={cn(
          "p-3 rounded-full bg-gradient-to-br transition-all duration-300",
          isDark && variant === "cyan" && "from-neon-cyan/20 to-neon-cyan/5 text-neon-cyan group-hover:from-neon-cyan/30 group-hover:to-neon-cyan/10",
          isDark && variant === "magenta" && "from-neon-magenta/20 to-neon-magenta/5 text-neon-magenta group-hover:from-neon-magenta/30 group-hover:to-neon-magenta/10",
          isDark && variant === "mixed" && "from-neon-cyan/20 to-neon-magenta/20 text-white group-hover:from-neon-cyan/30 group-hover:to-neon-magenta/30",
          !isDark && variant === "cyan" && "from-blue-100 to-blue-50 text-blue-600 group-hover:from-blue-200 group-hover:to-blue-100",
          !isDark && variant === "magenta" && "from-pink-100 to-pink-50 text-pink-600 group-hover:from-pink-200 group-hover:to-pink-100",
          !isDark && variant === "mixed" && "from-blue-100 to-pink-100 text-purple-600 group-hover:from-blue-200 group-hover:to-pink-200"
        )}>
          <Icon size={24} strokeWidth={1.5} />
        </div>
      </div>
      <div className={cn(
        "absolute bottom-0 left-0 right-0 h-1",
        isDark && variant === "cyan" && "bg-gradient-to-r from-neon-cyan/70 to-neon-cyan/30",
        isDark && variant === "magenta" && "bg-gradient-to-r from-neon-magenta/70 to-neon-magenta/30",
        isDark && variant === "mixed" && "bg-gradient-to-r from-neon-cyan/50 to-neon-magenta/50",
        !isDark && variant === "cyan" && "bg-gradient-to-r from-blue-500 to-blue-300",
        !isDark && variant === "magenta" && "bg-gradient-to-r from-pink-500 to-pink-300",
        !isDark && variant === "mixed" && "bg-gradient-to-r from-blue-500 to-pink-500"
      )} />
    </div>
  );
};

export default StatCard;
