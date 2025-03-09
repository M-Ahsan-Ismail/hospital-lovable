
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import CreatePatient from "./pages/CreatePatient";
import PatientHistory from "./pages/PatientHistory";
import NotFound from "./pages/NotFound";
import { supabase } from "./integrations/supabase/client";

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for current user in localStorage and session
    const checkUser = async () => {
      const storedUser = localStorage.getItem('currentUser');
      
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      
      const { data } = await supabase.auth.getSession();
      
      if (!data.session && storedUser) {
        // If no active session but user in localStorage, clear it
        localStorage.removeItem('currentUser');
        setUser(null);
      }
      
      setLoading(false);
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
          // When signed in, update user state from localStorage
          const storedUser = localStorage.getItem('currentUser');
          if (storedUser) {
            setUser(JSON.parse(storedUser));
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
    if (loading) return <div>Loading...</div>;
    
    if (!user) {
      return <Navigate to="/signin" replace />;
    }
    
    if (allowedRoles.includes(user.role)) {
      return children;
    }
    
    // Redirect to appropriate page based on role
    if (user.role === 'doctor') {
      return <Navigate to="/create-patient" replace />;
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
                <Navigate to="/create-patient" replace /> : 
                <Navigate to="/dashboard" replace />
              ) : (
                <Index />
              )
            } />
            <Route path="/signup" element={
              user ? (
                user.role === 'doctor' ? 
                <Navigate to="/create-patient" replace /> : 
                <Navigate to="/dashboard" replace />
              ) : (
                <SignUp />
              )
            } />
            <Route path="/signin" element={
              user ? (
                user.role === 'doctor' ? 
                <Navigate to="/create-patient" replace /> : 
                <Navigate to="/dashboard" replace />
              ) : (
                <SignIn />
              )
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute allowedRoles={['admin', 'doctor']}>
                <Dashboard />
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
