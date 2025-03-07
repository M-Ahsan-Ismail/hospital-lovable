
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import CreatePatient from "./pages/CreatePatient";
import PatientHistory from "./pages/PatientHistory";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children, allowedRoles = [] }: { children: JSX.Element, allowedRoles?: string[] }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");
  
  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem("currentUser");
      if (user) {
        try {
          const userData = JSON.parse(user);
          setAuthenticated(true);
          setUserRole(userData.role || "");
        } catch (error) {
          console.error("Error parsing user data:", error);
          setAuthenticated(false);
        }
      } else {
        setAuthenticated(false);
      }
      setLoading(false);
    };
    
    checkAuth();
  }, []);
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!authenticated) {
    return <Navigate to="/" />;
  }
  
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole) && userRole !== "") {
    return userRole === "Doctor" ? 
      <Navigate to="/create-patient" /> : 
      <Navigate to="/dashboard" />;
  }
  
  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signup" element={<SignUp />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/create-patient" 
            element={
              <ProtectedRoute allowedRoles={["Doctor"]}>
                <CreatePatient />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/patients" 
            element={
              <ProtectedRoute allowedRoles={["Admin", "Doctor"]}>
                <PatientHistory />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
