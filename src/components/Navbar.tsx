
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import AnimatedButton from "./AnimatedButton";

interface NavLink {
  title: string;
  href: string;
  isButton?: boolean;
  roleRequired?: "Admin" | "Doctor" | "both";
}

interface NavbarProps {
  isAuth?: boolean;
  userRole?: string;
  onLogout?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isAuth = false, userRole = "", onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const publicLinks: NavLink[] = [
    { title: "Home", href: "/" },
    { title: "Sign Up", href: "/signup", isButton: true }
  ];
  
  const authLinks: NavLink[] = [
    { title: "Dashboard", href: "/dashboard", roleRequired: "Admin" },
    { title: "Create Patient", href: "/create-patient", roleRequired: "Doctor" },
    { title: "Patient History", href: "/patients", roleRequired: "both" },
  ];
  
  const getLinks = () => {
    if (!isAuth) return publicLinks;
    
    return authLinks.filter(link => {
      if (link.roleRequired === "both") return true;
      return link.roleRequired === userRole;
    });
  };
  
  const links = getLinks();
  
  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-orbit",
        isScrolled || isMobileMenuOpen 
          ? "bg-blur border-b border-white/10 py-3" 
          : "py-5"
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to={isAuth ? (userRole === "Admin" ? "/dashboard" : "/create-patient") : "/"} className="flex items-center relative group">
          <span className={cn(
            "text-2xl font-bold text-white group-hover:text-neon-cyan transition-colors duration-300",
            isScrolled && "text-xl"
          )}>
            HMS<span className="text-neon-cyan">.</span>
          </span>
          <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-cyan group-hover:w-full transition-all duration-300" />
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {links.map((link) => 
            link.isButton ? (
              <AnimatedButton key={link.title} variant="cyan" size="sm" className="ml-2">
                <Link to={link.href}>{link.title}</Link>
              </AnimatedButton>
            ) : (
              <Link
                key={link.title}
                to={link.href}
                className={cn(
                  "relative py-2 text-white/80 hover:text-neon-cyan transition-colors duration-300 group",
                  location.pathname === link.href && "text-neon-cyan"
                )}
              >
                {link.title}
                <span
                  className={cn(
                    "absolute bottom-0 left-0 w-0 h-0.5 bg-neon-cyan group-hover:w-full transition-all duration-300",
                    location.pathname === link.href && "w-full"
                  )}
                />
              </Link>
            )
          )}
          
          {isAuth && onLogout && (
            <button
              onClick={onLogout}
              className="relative py-2 text-white/80 hover:text-neon-magenta transition-colors duration-300 group"
            >
              Logout
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-neon-magenta group-hover:w-full transition-all duration-300" />
            </button>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white hover:text-neon-cyan transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-blur border-t border-white/10 animate-fade-in">
          <div className="container mx-auto py-4 px-4 flex flex-col space-y-4">
            {links.map((link) => 
              link.isButton ? (
                <AnimatedButton key={link.title} variant="cyan" size="sm" className="w-full">
                  <Link 
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.title}
                  </Link>
                </AnimatedButton>
              ) : (
                <Link
                  key={link.title}
                  to={link.href}
                  className={cn(
                    "py-2 px-4 rounded-md hover:bg-white/5 text-white/80 hover:text-neon-cyan transition-colors duration-300",
                    location.pathname === link.href && "bg-white/5 text-neon-cyan"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.title}
                </Link>
              )
            )}
            
            {isAuth && onLogout && (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onLogout();
                }}
                className="py-2 px-4 rounded-md hover:bg-white/5 text-white/80 hover:text-neon-magenta transition-colors duration-300 w-full text-left"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
