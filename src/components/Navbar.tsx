
import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import AnimatedButton from './AnimatedButton';
import ThemeToggle from './ThemeToggle';

interface NavbarProps {
  theme?: 'dark' | 'light';
}

const Navbar: React.FC<NavbarProps> = ({ theme = 'dark' }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isDark = theme === 'dark';
  const isLandingPage = location.pathname === '/';

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      localStorage.removeItem('currentUser');
      setUser(null);
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      });
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
      toast({
        title: "Error logging out",
        description: "There was a problem logging out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const navLinks = user 
    ? [
        { text: 'Dashboard', href: user.role === 'doctor' ? '/doctor-home' : '/dashboard' },
        { text: 'Patients', href: '/patients' },
        { text: 'New Patient', href: '/create-patient' },
      ] 
    : [
        { text: 'Features', href: '/#features' },
        { text: 'About', href: '/#about' },
        { text: 'Contact', href: '/#contact' },
      ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? (isDark 
              ? "bg-dark-secondary/80 backdrop-blur-lg shadow-lg" 
              : "bg-white/80 backdrop-blur-lg shadow-sm")
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <RouterLink to="/" className="flex items-center space-x-2">
            <div className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center",
              isDark 
                ? "bg-gradient-to-br from-neon-cyan to-neon-magenta" 
                : "bg-gradient-to-br from-blue-500 to-pink-500"
            )}>
              <span className={cn(
                "text-lg font-bold",
                isDark ? "text-white" : "text-white"
              )}>MS</span>
            </div>
            <span className={cn(
              "text-xl font-semibold",
              isDark ? "text-white" : "text-gray-800"
            )}>MediSphere</span>
          </RouterLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-6">
              {navLinks.map((link, index) => (
                <RouterLink 
                  key={index} 
                  to={link.href} 
                  className={cn(
                    "relative overflow-hidden font-medium transition-colors duration-300",
                    isDark 
                      ? "text-white/70 hover:text-white" 
                      : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  {link.text}
                </RouterLink>
              ))}
            </nav>

            {isLandingPage && <ThemeToggle />}
            
            <div className="flex items-center space-x-4">
              {!user ? (
                <>
                  <RouterLink to="/signin">
                    <AnimatedButton variant={isDark ? "outline" : "light"} size="default">
                      Sign In
                    </AnimatedButton>
                  </RouterLink>
                  <RouterLink to="/signup">
                    <AnimatedButton variant={isDark ? "cyan" : "light"} size="default">
                      Sign Up
                    </AnimatedButton>
                  </RouterLink>
                </>
              ) : (
                <>
                  <div className={cn(
                    "text-sm font-medium",
                    isDark ? "text-white/80" : "text-gray-700"
                  )}>
                    {user.fullName || user.email}
                  </div>
                  <AnimatedButton variant={isDark ? "magenta" : "light"} size="default" onClick={handleLogout}>
                    Logout
                  </AnimatedButton>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            {isLandingPage && <ThemeToggle />}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={cn(
                "ml-2 p-2 rounded-md", 
                isDark 
                  ? "text-white hover:bg-white/10" 
                  : "text-gray-800 hover:bg-gray-100"
              )}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "overflow-hidden md:hidden",
              isDark ? "bg-dark-secondary/95 backdrop-blur-lg" : "bg-white/95 backdrop-blur-lg"
            )}
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              <nav className="flex flex-col space-y-3">
                {navLinks.map((link, index) => (
                  <RouterLink
                    key={index}
                    to={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "py-2 px-4 rounded-lg transition-colors duration-300",
                      isDark 
                        ? "text-white/80 hover:bg-white/10 hover:text-white" 
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    )}
                  >
                    {link.text}
                  </RouterLink>
                ))}
              </nav>

              {!user ? (
                <div className="grid grid-cols-2 gap-3 py-2">
                  <RouterLink to="/signin" onClick={() => setMenuOpen(false)}>
                    <AnimatedButton variant={isDark ? "outline" : "light"} size="default" className="w-full">
                      Sign In
                    </AnimatedButton>
                  </RouterLink>
                  <RouterLink to="/signup" onClick={() => setMenuOpen(false)}>
                    <AnimatedButton variant={isDark ? "cyan" : "light"} size="default" className="w-full">
                      Sign Up
                    </AnimatedButton>
                  </RouterLink>
                </div>
              ) : (
                <div className="space-y-3 py-2">
                  <div className={cn(
                    "px-4 py-2 text-sm font-medium",
                    isDark ? "text-white/80" : "text-gray-700"
                  )}>
                    {user.fullName || user.email}
                  </div>
                  <AnimatedButton variant={isDark ? "magenta" : "light"} size="default" onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }} className="w-full">
                    Logout
                  </AnimatedButton>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
