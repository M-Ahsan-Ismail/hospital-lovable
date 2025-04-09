import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import AnimatedButton from "./AnimatedButton";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "@/providers/ThemeProvider";

interface NavLink {
  title: string;
  href: string;
  isButton?: boolean;
}

const Navbar: React.FC<{ isAuth?: boolean }> = ({ isAuth = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { theme } = useTheme();
  
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
  
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Navbar auth state changed:", event);
        
        if (event === 'SIGNED_OUT') {
          setCurrentUser(null);
          localStorage.removeItem('currentUser');
          navigate('/', { replace: true });
        } else if (event === 'SIGNED_IN' && session) {
          setTimeout(async () => {
            try {
              const { data: userData, error } = await supabase
                .from('users')
                .select('id, email, full_name, role')
                .eq('id', session.user.id)
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
              } else {
                const storedUser = localStorage.getItem('currentUser');
                if (storedUser) {
                  setCurrentUser(JSON.parse(storedUser));
                } else if (session.user.user_metadata) {
                  const userInfo = {
                    id: session.user.id,
                    email: session.user.email,
                    fullName: session.user.user_metadata.full_name || session.user.email?.split('@')[0] || 'User',
                    role: session.user.user_metadata.role || 'doctor'
                  };
                  setCurrentUser(userInfo);
                  localStorage.setItem('currentUser', JSON.stringify(userInfo));
                }
              }
            } catch (error) {
              console.error("Error processing sign in:", error);
            }
          }, 0);
        }
      }
    );
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);
  
  const handleLogout = async () => {
    if (isLoggingOut) return;
    
    try {
      setIsLoggingOut(true);
      console.log("Logging out...");
      
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
    } finally {
      setIsLoggingOut(false);
    }
  };
  
  let links: NavLink[] = [];
  
  if (!currentUser) {
    links = [
      { title: "Home", href: "/" },
      { title: "Sign In", href: "/signin" },
      { title: "Sign Up", href: "/signup", isButton: true }
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
          ? theme === "dark" 
            ? "bg-blur border-b border-white/10 py-3" 
            : "bg-blur border-b border-black/10 py-3"
          : "py-5"
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div 
          onClick={navigateToHome} 
          className="flex items-center relative group cursor-pointer"
        >
          <span className={cn(
            "text-2xl font-bold transition-colors duration-300",
            isScrolled && "text-xl",
            theme === "dark" 
              ? "text-white group-hover:text-neon-cyan" 
              : "text-[#040D12] group-hover:text-neon-magenta"
          )}>
            MediSphere<span className={theme === "dark" ? "text-neon-cyan" : "text-neon-magenta"}>.</span>
          </span>
          <div className={cn(
            "absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300",
            theme === "dark" ? "bg-neon-cyan" : "bg-neon-magenta"
          )} />
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          {links.map((link) => 
            link.isButton ? (
              <AnimatedButton key={link.title} variant={theme === "dark" ? "cyan" : "magenta"} size="sm" className="ml-2">
                <Link to={link.href}>{link.title}</Link>
              </AnimatedButton>
            ) : (
              <Link
                key={link.title}
                to={link.href}
                className={cn(
                  "relative py-2 transition-colors duration-300 group",
                  theme === "dark" 
                    ? "text-white/80 hover:text-neon-cyan" 
                    : "text-black/70 hover:text-neon-magenta",
                  location.pathname === link.href && (theme === "dark" ? "text-neon-cyan" : "text-neon-magenta")
                )}
              >
                {link.title}
                <span
                  className={cn(
                    "absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300",
                    theme === "dark" ? "bg-neon-cyan" : "bg-neon-magenta",
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
                "relative py-2 transition-colors duration-300 group flex items-center",
                theme === "dark" 
                  ? "text-white/80 hover:text-neon-cyan" 
                  : "text-black/70 hover:text-neon-magenta"
              )}
            >
              <LogOut size={16} className="mr-2" />
              Logout
              <span className={cn(
                "absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300",
                theme === "dark" ? "bg-neon-cyan" : "bg-neon-magenta"
              )} />
            </button>
          )}
          
          <div className="border-l pl-4 ml-2 border-white/10">
            <ThemeToggle />
          </div>
        </div>
        
        <div className="md:hidden flex items-center space-x-4">
          <ThemeToggle />
          <button 
            className={cn(
              "transition-colors",
              theme === "dark" 
                ? "text-white hover:text-neon-cyan" 
                : "text-black/70 hover:text-neon-magenta"
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {isMobileMenuOpen && (
        <div className={cn(
          "md:hidden bg-blur border-t animate-fade-in",
          theme === "dark" ? "border-white/10" : "border-black/10"
        )}>
          <div className="container mx-auto py-4 px-4 flex flex-col space-y-4">
            {links.map((link) => 
              link.isButton ? (
                <AnimatedButton key={link.title} variant={theme === "dark" ? "cyan" : "magenta"} size="sm" className="w-full">
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
                    "py-2 px-4 rounded-md transition-colors duration-300",
                    theme === "dark" 
                      ? "text-white/80 hover:text-neon-cyan hover:bg-white/5" 
                      : "text-black/70 hover:text-neon-magenta hover:bg-black/5",
                    location.pathname === link.href && (
                      theme === "dark" 
                        ? "bg-white/5 text-neon-cyan" 
                        : "bg-black/5 text-neon-magenta"
                    )
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
                className={cn(
                  "py-2 px-4 rounded-md flex items-center transition-colors duration-300",
                  theme === "dark" 
                    ? "text-white/80 hover:text-neon-cyan hover:bg-white/5" 
                    : "text-black/70 hover:text-neon-magenta hover:bg-black/5"
                )}
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

export default Navbar;
