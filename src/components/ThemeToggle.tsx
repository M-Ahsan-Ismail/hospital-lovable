
import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme}
      className={cn(
        "p-2 rounded-full transition-all duration-300", 
        theme === "dark" 
          ? "text-white/80 hover:text-neon-cyan hover:bg-white/5" 
          : "text-black/70 hover:text-neon-magenta hover:bg-black/5",
        className
      )}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun size={20} className="animate-fade-in" />
      ) : (
        <Moon size={20} className="animate-fade-in" />
      )}
    </button>
  );
};

export default ThemeToggle;
