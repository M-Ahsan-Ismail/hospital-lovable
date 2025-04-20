
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import AnimatedButton from "./AnimatedButton";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
  
  useEffect(() => {
    // Check if user is logged in
    const checkUserAuth = async () => {
      try {
        // Try to get from localStorage first for faster UI update
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
          setCurrentUser(JSON.parse(storedUser));
        }
        
        // Then verify with Supabase
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          if (!storedUser) {
            // If we have a session but no stored user, get user data
            const { data: userData, error } = await supabase
              .from('users')
              .select('id, email, full_name, role')
              .eq('id', data.session.user.id)
              .maybeSingle(); // Using maybeSingle instead of single to avoid errors
              
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
          // If no session but we have a stored user, clear it
          localStorage.removeItem('currentUser');
          setCurrentUser(null);
        }
      } catch (error) {
        console.error("Error checking user auth:", error);
        // Clear localStorage on error
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
          // We'll use setTimeout to avoid potential auth state deadlocks
          setTimeout(async () => {
            try {
              // Get user info
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
                // Fallback to stored user or session metadata
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
    // Prevent multiple clicks
    if (isLoggingOut) return;
    
    try {
      setIsLoggingOut(true);
      console.log("Logging out...");
      
      // Clear local storage first to immediately update UI
      localStorage.removeItem('currentUser');
      setCurrentUser(null);
      
      // Then sign out from Supabase
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("Logout error:", error);
        throw error;
      }
      
      toast({
        title: "Success",
        description: "Logged out successfully",
      });
      
      // Navigate to home page
      navigate('/', { replace: true });
    } catch (error: any) {
      console.error("Logout failed:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to log out",
        variant: "destructive",
      });
      
      // Force navigate anyway as fallback
      navigate('/', { replace: true });
    } finally {
      setIsLoggingOut(false);
    }
  };
  
  // Define links based on authentication and role
  let links: NavLink[] = [];
  
  if (!currentUser) {
    // Public links
    links = [
      { title: "Home", href: "/" },
      { title: "Sign In", href: "/signin" },
      // { title: "Sign Up", href: "/signup", isButton: true }
    ];
  } else if (currentUser.role === 'doctor') {
    // Doctor links
    links = [
      { title: "Home", href: "/doctor-home" },
      { title: "Create Patient", href: "/create-patient" },
      { title: "Patient History", href: "/patients" }
    ];
  } else if (currentUser.role === 'admin') {
    // Admin links
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
          ? "bg-blur border-b border-white/10 py-3" 
          : "py-5"
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div 
          onClick={navigateToHome} 
          className="flex items-center relative group cursor-pointer"
        >
          <span className={cn(
            "text-2xl font-bold text-white group-hover:text-neon-cyan transition-colors duration-300",
            isScrolled && "text-xl"
          )}>
            MediSphere<span className="text-neon-cyan">.</span>
          </span>
          <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-cyan group-hover:w-full transition-all duration-300" />
        </div>
        
        
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
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
          
          {/* Logout button for authenticated users */}
          {currentUser && (
            <button
              onClick={handleLogout}
              className="relative py-2 text-white/80 hover:text-neon-cyan transition-colors duration-300 group flex items-center"
            >
              <LogOut size={16} className="mr-2" />
              Logout
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-neon-cyan group-hover:w-full transition-all duration-300" />
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
            
            {/* Logout button for mobile */}
            {currentUser && (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="py-2 px-4 rounded-md hover:bg-white/5 text-white/80 hover:text-neon-cyan transition-colors duration-300 flex items-center"
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
