
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import DoctorHome from "./pages/DoctorHome";
import CreatePatient from "./pages/CreatePatient";
import PatientHistory from "./pages/PatientHistory";
import NotFound from "./pages/NotFound";
import { supabase } from "./integrations/supabase/client";
import { toast } from "./components/ui/use-toast";

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for current user
    const checkUser = async () => {
      try {
        setLoading(true);
        
        // Get current session
        const { data } = await supabase.auth.getSession();
        
        // Check if we have a session
        if (data.session) {
          console.log("Active session found:", data.session);
          
          // Get user info from users table
          const { data: userData, error } = await supabase
            .from('users')
            .select('id, email, full_name, role')
            .eq('id', data.session.user.id)
            .single();
          
          if (error) {
            console.error("Error fetching user data:", error);
            // Try to use metadata as fallback
            const currentUser = {
              id: data.session.user.id,
              email: data.session.user.email,
              fullName: data.session.user.user_metadata.full_name || data.session.user.email?.split('@')[0] || 'User',
              role: data.session.user.user_metadata.role || 'doctor'
            };
            
            setUser(currentUser);
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
          } else if (userData) {
            console.log("User data found in database:", userData);
            // Store properly formatted user data
            const currentUser = {
              id: userData.id,
              email: userData.email,
              fullName: userData.full_name,
              role: userData.role
            };
            
            setUser(currentUser);
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
          }
        } else {
          // No active session, clear localStorage
          localStorage.removeItem('currentUser');
          setUser(null);
        }
      } catch (err) {
        console.error("Error checking user session:", err);
        localStorage.removeItem('currentUser');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    checkUser();
    
    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, session);
        
        if (event === 'SIGNED_OUT') {
          localStorage.removeItem('currentUser');
          setUser(null);
        } else if (event === 'SIGNED_IN' && session) {
          try {
            // Get user info from users table
            const { data: userData, error } = await supabase
              .from('users')
              .select('id, email, full_name, role')
              .eq('id', session.user.id)
              .single();
            
            if (error) {
              console.error("Error fetching user data:", error);
              // Try to use metadata as fallback
              const currentUser = {
                id: session.user.id,
                email: session.user.email,
                fullName: session.user.user_metadata.full_name || session.user.email?.split('@')[0] || 'User',
                role: session.user.user_metadata.role || 'doctor'
              };
              
              setUser(currentUser);
              localStorage.setItem('currentUser', JSON.stringify(currentUser));
            } else if (userData) {
              console.log("User data found in database:", userData);
              // Store properly formatted user data
              const currentUser = {
                id: userData.id,
                email: userData.email,
                fullName: userData.full_name,
                role: userData.role
              };
              
              setUser(currentUser);
              localStorage.setItem('currentUser', JSON.stringify(currentUser));
            }
          } catch (err) {
            console.error("Error handling auth change:", err);
          }
        }
      }
    );
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Role-based route protection
  const ProtectedRoute = ({ 
    children, 
    allowedRoles = ['doctor', 'admin'] 
  }: { 
    children: JSX.Element, 
    allowedRoles?: string[] 
  }) => {
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#040D12]">
          <div className="h-12 w-12 border-4 border-neon-cyan border-t-transparent rounded-full animate-spin"></div>
        </div>
      );
    }
    
    if (!user) {
      return <Navigate to="/signin" replace />;
    }
    
    if (allowedRoles.includes(user.role)) {
      return children;
    }
    
    // Redirect to appropriate page based on role
    if (user.role === 'doctor') {
      return <Navigate to="/doctor-home" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              user ? (
                user.role === 'doctor' ? 
                <Navigate to="/doctor-home" replace /> : 
                <Navigate to="/dashboard" replace />
              ) : (
                <Index />
              )
            } />
            <Route path="/signup" element={
              user ? (
                user.role === 'doctor' ? 
                <Navigate to="/doctor-home" replace /> : 
                <Navigate to="/dashboard" replace />
              ) : (
                <SignUp />
              )
            } />
            <Route path="/signin" element={
              user ? (
                user.role === 'doctor' ? 
                <Navigate to="/doctor-home" replace /> : 
                <Navigate to="/dashboard" replace />
              ) : (
                <SignIn />
              )
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/doctor-home" element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <DoctorHome />
              </ProtectedRoute>
            } />
            <Route path="/create-patient" element={
              <ProtectedRoute allowedRoles={['doctor', 'admin']}>
                <CreatePatient />
              </ProtectedRoute>
            } />
            <Route path="/patients" element={
              <ProtectedRoute allowedRoles={['admin', 'doctor']}>
                <PatientHistory />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
