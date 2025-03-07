
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HexagonBackground from "@/components/HexagonBackground";
import PatientCard from "@/components/PatientCard";
import AnimatedButton from "@/components/AnimatedButton";
import { Search, Filter, UserPlus, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getPatients } from "@/lib/patientStorage";

const PatientHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<{full_name: string; role: string} | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      toast({
        title: "Not logged in",
        description: "Please login to access this page",
        variant: "destructive",
      });
      navigate("/");
      return;
    }

    try {
      const userData = JSON.parse(currentUser);
      setUser(userData);
      loadPatients();
    } catch (error) {
      console.error("Error parsing user data:", error);
      toast({
        title: "Error",
        description: "Failed to load user data",
        variant: "destructive",
      });
    }
  }, [navigate, toast]);
  
  const loadPatients = () => {
    try {
      const patientData = getPatients();
      setPatients(patientData);
    } catch (error) {
      console.error("Error loading patients:", error);
      toast({
        title: "Error",
        description: "Failed to load patient data",
        variant: "destructive",
      });
    }
  };
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
  };
  
  const handleRefresh = () => {
    setIsLoading(true);
    loadPatients();
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Refreshed",
        description: "Patient data has been refreshed",
      });
    }, 500);
  };
  
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/");
  };
  
  const filteredPatients = patients.filter((patient) => {
    const matchesSearch = 
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.disease.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.cnic.includes(searchTerm);
    
    const matchesStatus = 
      statusFilter === "all" || 
      (statusFilter === "active" && patient.status === "Active") ||
      (statusFilter === "follow-up" && patient.status === "Follow-Up") ||
      (statusFilter === "discharged" && patient.status === "Discharged");
    
    return matchesSearch && matchesStatus;
  });
  
  if (!user) {
    return null; // Prevent rendering while checking authentication
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <HexagonBackground />
      <Navbar isAuth userRole={user.role} onLogout={handleLogout} />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2 animate-fade-in">Patient History</h1>
              <p className="text-white/70 animate-fade-in" style={{ animationDelay: "100ms" }}>
                View and manage all patient records
              </p>
            </div>
            
            <div className="flex gap-3">
              <AnimatedButton 
                variant="outline" 
                size="sm" 
                onClick={handleRefresh}
                className="hidden sm:flex"
                disabled={isLoading}
              >
                <RefreshCw size={16} className={`mr-2 ${isLoading ? "animate-spin" : ""}`} />
                Refresh
              </AnimatedButton>
              
              {user.role === "Doctor" && (
                <AnimatedButton variant="cyan" size="sm">
                  <Link to="/create-patient" className="flex items-center">
                    <UserPlus size={16} className="mr-2" />
                    New Patient
                  </Link>
                </AnimatedButton>
              )}
            </div>
          </div>
          
          <div className="glass-card rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-grow">
                <Input 
                  type="text" 
                  placeholder="Search by name, disease, or CNIC..." 
                  value={searchTerm}
                  onChange={handleSearch}
                  className="bg-white/5 border-white/10 pl-10 focus:border-neon-cyan w-full"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
              </div>
              
              <div className="flex gap-4">
                <div className="w-48">
                  <Select onValueChange={handleStatusChange} defaultValue="all">
                    <SelectTrigger className="bg-white/5 border-white/10 focus:border-neon-cyan">
                      <div className="flex items-center">
                        <Filter size={14} className="mr-2 text-white/60" />
                        <SelectValue placeholder="Filter by status" />
                      </div>
                    </SelectTrigger>
                    <SelectContent className="bg-dark-secondary border-white/10">
                      <SelectItem value="all">All Patients</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="follow-up">Follow-Up</SelectItem>
                      <SelectItem value="discharged">Discharged</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <AnimatedButton 
                  variant="outline" 
                  size="sm" 
                  onClick={handleRefresh}
                  className="md:hidden"
                  disabled={isLoading}
                >
                  <RefreshCw size={16} className={`${isLoading ? "animate-spin" : ""}`} />
                </AnimatedButton>
              </div>
            </div>
            
            {filteredPatients.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPatients.map((patient) => (
                  <PatientCard key={patient.id} patient={patient} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-white/60 mb-4">No patients found matching your criteria</p>
                {user.role === "Doctor" && (
                  <AnimatedButton variant="outline" size="sm">
                    <Link to="/create-patient">Add New Patient</Link>
                  </AnimatedButton>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PatientHistory;
