
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HexagonBackground from "@/components/HexagonBackground";
import StatCard from "@/components/StatCard";
import PatientCard from "@/components/PatientCard";
import AnimatedButton from "@/components/AnimatedButton";
import { 
  UserRound, 
  UserPlus, 
  CalendarDays, 
  Activity, 
  Search, 
  ChevronRight, 
  CheckCircle, 
  RefreshCw,
  Hospital 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { Patient, User } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [stats, setStats] = useState({
    totalPatients: 0,
    activePatients: 0,
    followUpPatients: 0,
    dischargedPatients: 0,
    totalVisits: 0,
  });
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const { toast } = useToast();
  
  useEffect(() => {
    // Get current user
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    
    // Fetch patients data
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Get all patients
        const { data: patientsData, error } = await supabase
          .from('patients')
          .select('*');
        
        if (error) throw error;
        
        // Transform data to match our interface
        const formattedPatients: Patient[] = patientsData.map((p: any) => ({
          id: p.id,
          name: p.name,
          age: p.age,
          gender: p.gender,
          cnic: p.cnic,
          phoneNumber: p.phone_number,
          email: p.email,
          address: p.address,
          disease: p.disease,
          diseaseDescription: p.disease_description,
          visitDate: p.visit_date,
          visitCount: p.visit_count,
          doctorNotes: p.doctor_notes,
          status: p.status,
          doctorId: p.doctor_id,
          createdAt: p.created_at,
        }));
        
        setPatients(formattedPatients);
        
        // Calculate stats
        const activePatients = formattedPatients.filter(p => p.status === 'Active').length;
        const followUpPatients = formattedPatients.filter(p => p.status === 'Follow-Up').length;
        const dischargedPatients = formattedPatients.filter(p => p.status === 'Discharged').length;
        const totalVisits = formattedPatients.reduce((sum, p) => sum + p.visitCount, 0);
        
        setStats({
          totalPatients: formattedPatients.length,
          activePatients,
          followUpPatients,
          dischargedPatients,
          totalVisits,
        });
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to fetch data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [toast]);
  
  // Updated useEffect to perform live filtering as the user types or changes filters
  useEffect(() => {
    // Apply both search filter and status filter
    if (patients.length > 0) {
      let filtered = [...patients];
      
      // Apply status filter
      if (activeFilter !== "all") {
        filtered = filtered.filter(patient => patient.status.toLowerCase() === activeFilter);
      }
      
      // Apply search filter - making it more robust to match partial names, case insensitive
      if (searchTerm.trim() !== '') {
        const query = searchTerm.toLowerCase().trim();
        filtered = filtered.filter(patient => 
          patient.name.toLowerCase().includes(query) ||
          patient.disease.toLowerCase().includes(query) ||
          patient.cnic.includes(query) ||
          (patient.phoneNumber && patient.phoneNumber.includes(query))
        );
      }
      
      // Show all matching patients instead of just first 3 when searching
      if (searchTerm.trim() !== '') {
        setFilteredPatients(filtered);
      } else {
        // Only show the first 3 patients for dashboard view when no search is active
        setFilteredPatients(filtered.slice(0, 3));
      }
    } else {
      setFilteredPatients([]);
    }
  }, [searchTerm, patients, activeFilter]);
  
  const handleStatusChange = (patientId: string, newStatus: string) => {
    // Update the patient status in the local state
    setPatients(patients.map(p => 
      p.id === patientId 
        ? { ...p, status: newStatus as 'Active' | 'Discharged' | 'Follow-Up' } 
        : p
    ));
    
    // Recalculate stats
    const activePatients = patients.filter(p => 
      p.id === patientId ? newStatus === 'Active' : p.status === 'Active'
    ).length;
    
    const followUpPatients = patients.filter(p => 
      p.id === patientId ? newStatus === 'Follow-Up' : p.status === 'Follow-Up'
    ).length;
    
    const dischargedPatients = patients.filter(p => 
      p.id === patientId ? newStatus === 'Discharged' : p.status === 'Discharged'
    ).length;
    
    setStats({
      ...stats,
      activePatients,
      followUpPatients,
      dischargedPatients
    });
  };
  
  const refreshData = async () => {
    try {
      setLoading(true);
      
      // Get all patients
      const { data: patientsData, error } = await supabase
        .from('patients')
        .select('*');
      
      if (error) throw error;
      
      // Transform data to match our interface
      const formattedPatients: Patient[] = patientsData.map((p: any) => ({
        id: p.id,
        name: p.name,
        age: p.age,
        gender: p.gender,
        cnic: p.cnic,
        phoneNumber: p.phone_number,
        email: p.email,
        address: p.address,
        disease: p.disease,
        diseaseDescription: p.disease_description,
        visitDate: p.visit_date,
        visitCount: p.visit_count,
        doctorNotes: p.doctor_notes,
        status: p.status,
        doctorId: p.doctor_id,
        createdAt: p.created_at,
      }));
      
      setPatients(formattedPatients);
      
      // Calculate stats
      const activePatients = formattedPatients.filter(p => p.status === 'Active').length;
      const followUpPatients = formattedPatients.filter(p => p.status === 'Follow-Up').length;
      const dischargedPatients = formattedPatients.filter(p => p.status === 'Discharged').length;
      const totalVisits = formattedPatients.reduce((sum, p) => sum + p.visitCount, 0);
      
      setStats({
        totalPatients: formattedPatients.length,
        activePatients,
        followUpPatients,
        dischargedPatients,
        totalVisits,
      });
      
      toast({
        title: "Success",
        description: "Dashboard data refreshed",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to refresh data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#040D12] to-[#071620]">
      <HexagonBackground />
      <Navbar isAuth />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="container mx-auto">
          {/* Header with Welcome & Refresh Button */}
          <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl font-bold mb-2 animate-fade-in bg-clip-text text-transparent bg-gradient-to-r from-neon-cyan to-neon-magenta">
                Welcome, <span className="text-white">{currentUser?.fullName || 'Admin'}</span>
              </h1>
              <p className="text-white/70 animate-fade-in" style={{ animationDelay: "100ms" }}>
                Here's an overview of your hospital management dashboard
              </p>
            </div>
            
            <AnimatedButton 
              variant="outline" 
              size="sm" 
              onClick={refreshData}
              disabled={loading}
              className="shadow-glow-subtle"
            >
              <RefreshCw size={16} className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh Data
            </AnimatedButton>
          </div>
          
          {/* Stats Section - Enhanced with Hover Effects */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-10">
            <StatCard 
              title="Total Patients" 
              value={stats.totalPatients} 
              icon={UserRound}
              description="All registered patients"
              variant="cyan"
              className="hover:shadow-glow-cyan transition-all duration-300"
            />
            <StatCard 
              title="Active Cases" 
              value={stats.activePatients} 
              icon={Activity}
              description="Currently under treatment"
              variant="magenta"
              className="hover:shadow-glow-magenta transition-all duration-300"
            />
            <StatCard 
              title="Follow-ups" 
              value={stats.followUpPatients} 
              icon={CalendarDays}
              description="Scheduled for follow-up"
              variant="cyan"
              className="hover:shadow-glow-cyan transition-all duration-300"
            />
            <StatCard 
              title="Discharged" 
              value={stats.dischargedPatients} 
              icon={CheckCircle}
              description="Successfully treated"
              variant="magenta"
              className="hover:shadow-glow-magenta transition-all duration-300"
            />
            <StatCard 
              title="Total Visits" 
              value={stats.totalVisits} 
              icon={Hospital}
              description="Cumulative patient visits"
              variant="mixed"
              className="hover:shadow-glow-mixed transition-all duration-300"
            />
          </div>
          
          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            <div className="lg:col-span-2">
              <div className="glass-card rounded-lg p-6 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300 shadow-glow-subtle">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-white bg-clip-text text-transparent bg-gradient-to-r from-neon-cyan to-white">Recent Patients</h2>
                  <div className="relative w-full max-w-xs">
                    <Input 
                      type="text" 
                      placeholder="Search patients..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-white/5 border-white/10 pl-10 focus:border-neon-cyan shadow-inner shadow-black/10"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
                  </div>
                </div>
                
                <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveFilter}>
                  <TabsList className="bg-white/5 border border-white/10">
                    <TabsTrigger 
                      value="all" 
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-cyan/20 data-[state=active]:to-neon-magenta/20 data-[state=active]:text-white"
                    >
                      All Patients
                    </TabsTrigger>
                    <TabsTrigger 
                      value="active" 
                      className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400"
                    >
                      Active
                    </TabsTrigger>
                    <TabsTrigger 
                      value="follow-up" 
                      className="data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-400"
                    >
                      Follow-Up
                    </TabsTrigger>
                    <TabsTrigger 
                      value="discharged" 
                      className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400"
                    >
                      Discharged
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                
                {loading ? (
                  <div className="text-center py-12">
                    <div className="inline-block h-8 w-8 border-2 border-neon-cyan border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-white/60">Loading patients...</p>
                  </div>
                ) : filteredPatients.length > 0 ? (
                  <div className="space-y-4">
                    {filteredPatients.map((patient) => (
                      <PatientCard 
                        key={patient.id} 
                        patient={patient} 
                        onStatusChange={handleStatusChange}
                        userRole={currentUser?.role}
                      />
                    ))}
                    
                    {filteredPatients.length > 3 && searchTerm.trim() === "" ? (
                      <div className="text-center pt-6">
                        <Link 
                          to="/patients" 
                          className="relative inline-flex items-center px-6 py-3 overflow-hidden rounded-full group bg-gradient-to-r from-white/5 to-white/10 hover:from-neon-cyan/20 hover:to-neon-magenta/20 transition-all duration-300 shadow-glow-subtle"
                        >
                          <span className="relative text-neon-cyan group-hover:text-white transition-colors flex items-center">
                            View all patients
                            <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </Link>
                      </div>
                    ) : searchTerm.trim() !== "" && (
                      <div className="text-center pt-6">
                        <p className="text-white/70">Found {filteredPatients.length} patient{filteredPatients.length !== 1 ? 's' : ''} matching "{searchTerm}"</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white/5 rounded-lg border border-white/10">
                    <p className="text-white/60 mb-4">No patients found matching your criteria</p>
                    <AnimatedButton variant="outline" size="sm">
                      <Link to="/create-patient">Add New Patient</Link>
                    </AnimatedButton>
                  </div>
                )}
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="glass-card rounded-lg p-6 h-full backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300 shadow-glow-subtle">
                <h2 className="text-xl font-semibold text-white bg-clip-text text-transparent bg-gradient-to-r from-neon-cyan to-white mb-6">Quick Actions</h2>
                <div className="space-y-4">
                  <Link to="/create-patient" className="glass-card group flex items-center p-4 rounded-md border border-white/10 hover:border-neon-cyan transition-all duration-300 bg-gradient-to-r from-transparent to-transparent hover:from-neon-cyan/10 hover:to-neon-magenta/10">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-neon-cyan/20 to-neon-magenta/20 flex items-center justify-center mr-4 group-hover:from-neon-cyan/40 group-hover:to-neon-magenta/40 transition-colors">
                      <UserPlus size={20} className="text-neon-cyan" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white group-hover:text-neon-cyan transition-colors">Create New Patient</h3>
                      <p className="text-sm text-white/60">Add a new patient record</p>
                    </div>
                  </Link>
                  
                  <Link to="/patients" className="glass-card group flex items-center p-4 rounded-md border border-white/10 hover:border-neon-cyan transition-all duration-300 bg-gradient-to-r from-transparent to-transparent hover:from-neon-cyan/10 hover:to-neon-magenta/10">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-neon-cyan/20 to-neon-magenta/20 flex items-center justify-center mr-4 group-hover:from-neon-cyan/40 group-hover:to-neon-magenta/40 transition-colors">
                      <UserRound size={20} className="text-neon-cyan" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white group-hover:text-neon-cyan transition-colors">Patient History</h3>
                      <p className="text-sm text-white/60">View all patient records</p>
                    </div>
                  </Link>
                </div>
                
                <div className="mt-6 p-4 rounded-md bg-gradient-to-r from-neon-cyan/5 to-neon-magenta/5 border border-white/10 hover:border-neon-cyan/20 transition-all">
                  <h3 className="font-medium text-white mb-2 flex items-center">
                    <Activity size={18} className="mr-2 text-neon-cyan" />
                    Today's Schedule
                  </h3>
                  <p className="text-sm text-white/60 mb-4">
                    {stats.activePatients > 0 
                      ? `You have ${stats.activePatients} active cases`
                      : "No active cases today"}
                  </p>
                  <AnimatedButton variant="outline" size="sm" className="w-full bg-white/5 hover:bg-gradient-to-r hover:from-neon-cyan/20 hover:to-neon-magenta/20">
                    <Link to="/patients" className="w-full inline-block">View Active Cases</Link>
                  </AnimatedButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
