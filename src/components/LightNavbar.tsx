import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import LightAnimatedButton from "./LightAnimatedButton";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface NavLink {
  title: string;
  href: string;
  isButton?: boolean;
}

const LightNavbar: React.FC<{ isAuth?: boolean }> = ({ isAuth = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    const checkUserAuth = async () => {
      try {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
          setCurrentUser(JSON.parse(storedUser));
        }
        
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          if (!storedUser) {
            const { data: userData, error } = await supabase
              .from('users')
              .select('id, email, full_name, role')
              .eq('id', data.session.user.id)
              .maybeSingle();
              
            if (userData) {
              const userInfo = {
                id: userData.id,
                email: userData.email,
                fullName: userData.full_name,
                role: userData.role
              };
              setCurrentUser(userInfo);
              localStorage.setItem('currentUser', JSON.stringify(userInfo));
            }
          }
        } else if (storedUser) {
          localStorage.removeItem('currentUser');
          setCurrentUser(null);
        }
      } catch (error) {
        console.error("Error checking user auth:", error);
        localStorage.removeItem('currentUser');
        setCurrentUser(null);
      }
    };
    
    checkUserAuth();
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const handleLogout = async () => {
    try {
      localStorage.removeItem('currentUser');
      setCurrentUser(null);
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("Logout error:", error);
        throw error;
      }
      
      toast({
        title: "Success",
        description: "Logged out successfully",
      });
      
      navigate('/', { replace: true });
    } catch (error: any) {
      console.error("Logout failed:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to log out",
        variant: "destructive",
      });
      
      navigate('/', { replace: true });
    }
  };
  
  // Define links based on authentication and role
  let links: NavLink[] = [];
  
  if (!currentUser) {
    links = [
      { title: "Home", href: "/" },
      { title: "Sign In", href: "/signin", isButton: true }
    ];
  } else if (currentUser.role === 'doctor') {
    links = [
      { title: "Home", href: "/doctor-home" },
      { title: "Create Patient", href: "/create-patient" },
      { title: "Patient History", href: "/patients" }
    ];
  } else if (currentUser.role === 'admin') {
    links = [
      { title: "Dashboard", href: "/dashboard" },
      { title: "Patient History", href: "/patients" },
      { title: "Create Patient", href: "/create-patient" }
    ];
  }
  
  const navigateToHome = () => {
    if (!currentUser) {
      navigate('/');
    } else if (currentUser.role === 'doctor') {
      navigate('/doctor-home', { replace: true });
    } else if (currentUser.role === 'admin') {
      navigate('/dashboard', { replace: true });
    }
  };
  
  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-orbit",
        isScrolled || isMobileMenuOpen 
          ? "bg-white/95 backdrop-blur-md border-b border-slate-200 py-3 shadow-lg" 
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div 
          onClick={navigateToHome} 
          className="flex items-center relative group cursor-pointer"
        >
          <span className={cn(
            "text-2xl font-bold transition-colors duration-300",
            isScrolled ? "text-slate-800 text-xl" : "text-slate-800",
            "group-hover:text-emerald-600"
          )}>
            MediSphere<span className="text-emerald-600">.</span>
          </span>
          <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 group-hover:w-full transition-all duration-300" />
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {links.map((link) => 
            link.isButton ? (
              <LightAnimatedButton key={link.title} variant="primary" size="sm" className="ml-2">
                <Link to={link.href}>{link.title}</Link>
              </LightAnimatedButton>
            ) : (
              <Link
                key={link.title}
                to={link.href}
                className={cn(
                  "relative py-2 transition-colors duration-300 group font-medium",
                  isScrolled ? "text-slate-700 hover:text-emerald-600" : "text-slate-700 hover:text-emerald-600",
                  location.pathname === link.href && "text-emerald-600"
                )}
              >
                {link.title}
                <span
                  className={cn(
                    "absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-600 group-hover:w-full transition-all duration-300",
                    location.pathname === link.href && "w-full"
                  )}
                />
              </Link>
            )
          )}
          
          {currentUser && (
            <button
              onClick={handleLogout}
              className={cn(
                "relative py-2 transition-colors duration-300 group flex items-center font-medium",
                isScrolled ? "text-slate-700 hover:text-emerald-600" : "text-slate-700 hover:text-emerald-600"
              )}
            >
              <LogOut size={16} className="mr-2" />
              Logout
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-600 group-hover:w-full transition-all duration-300" />
            </button>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className={cn(
            "md:hidden transition-colors",
            isScrolled ? "text-slate-800 hover:text-emerald-600" : "text-slate-800 hover:text-emerald-600"
          )}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 animate-fade-in shadow-lg">
          <div className="container mx-auto py-4 px-4 flex flex-col space-y-4">
            {links.map((link) => 
              link.isButton ? (
                <LightAnimatedButton key={link.title} variant="primary" size="sm" className="w-full">
                  <Link 
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.title}
                  </Link>
                </LightAnimatedButton>
              ) : (
                <Link
                  key={link.title}
                  to={link.href}
                  className={cn(
                    "py-2 px-4 rounded-md hover:bg-slate-100 text-slate-700 hover:text-emerald-600 transition-colors duration-300 font-medium",
                    location.pathname === link.href && "bg-emerald-50 text-emerald-600"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.title}
                </Link>
              )
            )}
            
            {currentUser && (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="py-2 px-4 rounded-md hover:bg-slate-100 text-slate-700 hover:text-emerald-600 transition-colors duration-300 flex items-center font-medium"
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default LightNavbar;