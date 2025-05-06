
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
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  description,
  variant = "cyan",
  className,
}) => {
  return (
    <div
      className={cn(
        "relative rounded-lg overflow-hidden glass-card p-5 animate-fade-in transition-transform duration-300 hover:scale-[1.03] group backdrop-blur-md border",
        variant === "cyan" && "border-neon-cyan/30 hover:border-neon-cyan/70 bg-gradient-to-br from-neon-cyan/5 to-transparent",
        variant === "magenta" && "border-neon-magenta/30 hover:border-neon-magenta/70 bg-gradient-to-br from-neon-magenta/5 to-transparent",
        variant === "mixed" && "border-neon-cyan/30 hover:border-neon-magenta/70 bg-gradient-to-br from-neon-cyan/5 to-neon-magenta/5",
        className
      )}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-white/90 mb-1">{title}</h3>
          <p className={cn(
            "text-3xl font-bold mb-1 drop-shadow-glow",
            variant === "cyan" && "text-neon-cyan",
            variant === "magenta" && "text-neon-magenta",
            variant === "mixed" && "bg-clip-text text-transparent bg-gradient-to-r from-neon-cyan to-neon-magenta"
          )}>
            {value}
          </p>
          {description && (
            <p className="text-white/60 text-sm">{description}</p>
          )}
        </div>
        <div className={cn(
          "p-3 rounded-full bg-gradient-to-br transition-all duration-300",
          variant === "cyan" && "from-neon-cyan/20 to-neon-cyan/5 text-neon-cyan group-hover:from-neon-cyan/30 group-hover:to-neon-cyan/10",
          variant === "magenta" && "from-neon-magenta/20 to-neon-magenta/5 text-neon-magenta group-hover:from-neon-magenta/30 group-hover:to-neon-magenta/10",
          variant === "mixed" && "from-neon-cyan/20 to-neon-magenta/20 text-white group-hover:from-neon-cyan/30 group-hover:to-neon-magenta/30"
        )}>
          <Icon size={24} strokeWidth={1.5} />
        </div>
      </div>
      <div className={cn(
        "absolute bottom-0 left-0 right-0 h-1",
        variant === "cyan" && "bg-gradient-to-r from-neon-cyan/70 to-neon-cyan/30",
        variant === "magenta" && "bg-gradient-to-r from-neon-magenta/70 to-neon-magenta/30",
        variant === "mixed" && "bg-gradient-to-r from-neon-cyan/50 to-neon-magenta/50"
      )} />
    </div>
  );
};

export default StatCard;
