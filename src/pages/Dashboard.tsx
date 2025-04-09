
import React, { useState, useEffect, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
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
  Hospital,
  BarChart3
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { supabase, fetchPatients } from "@/integrations/supabase/client";
import { Patient, User } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { format, startOfWeek, isToday, parseISO } from "date-fns";

const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [todayPatients, setTodayPatients] = useState<Patient[]>([]);
  const [stats, setStats] = useState({
    totalPatients: 0,
    activePatients: 0,
    followUpPatients: 0,
    dischargedPatients: 0,
    totalVisits: 0,
    todayActiveCount: 0,
    newPatientsThisWeek: 0,
  });
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const { toast } = useToast();
  
  // Memoize fetchData function to prevent unnecessary renders
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      
      const { data: patientsData, error } = await supabase
        .from('patients')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
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
      
      // Calculate today's active patients
      const today = new Date();
      const activePatientsToday = formattedPatients.filter(p => {
        try {
          const visitDate = parseISO(p.visitDate);
          return isToday(visitDate) && p.status === 'Active';
        } catch (e) {
          return false;
        }
      });
      
      setTodayPatients(activePatientsToday);
      
      // Calculate this week's new patients
      const weekStart = startOfWeek(today);
      const newPatientsThisWeek = formattedPatients.filter(p => {
        try {
          const createdDate = parseISO(p.createdAt || '');
          return createdDate >= weekStart && createdDate <= today;
        } catch (e) {
          return false;
        }
      }).length;
      
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
        todayActiveCount: activePatientsToday.length,
        newPatientsThisWeek,
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
  }, [toast]);
  
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    
    fetchData();
  }, [fetchData]);
  
  useEffect(() => {
    let filtered = patients;
    
    // Apply filter based on status
    if (activeFilter === "active") {
      filtered = filtered.filter(patient => patient.status === 'Active');
    } else if (activeFilter === "follow-up") {
      filtered = filtered.filter(patient => patient.status === 'Follow-Up');
    } else if (activeFilter === "discharged") {
      filtered = filtered.filter(patient => patient.status === 'Discharged');
    }
    
    // Apply search filter if there's a search term
    if (searchTerm) {
      filtered = filtered.filter(patient => 
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.disease.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredPatients(filtered.slice(0, 3));
  }, [searchTerm, patients, activeFilter]);
  
  const handleStatusChange = (patientId: string, newStatus: string) => {
    setPatients(patients.map(p => 
      p.id === patientId 
        ? { ...p, status: newStatus as 'Active' | 'Discharged' | 'Follow-Up' } 
        : p
    ));
    
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
    await fetchData();
    toast({
      title: "Success",
      description: "Dashboard data refreshed",
    });
  };

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveFilter(value);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#040D12] to-[#071620]">
      <HexagonBackground />
      <Navbar isAuth />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 animate-fade-in glitch-effect" data-text="Welcome">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-cyan via-white to-neon-magenta">
                  Welcome, <span className="text-white">{currentUser?.fullName || 'Admin'}</span>
                </span>
              </h1>
              <p className="text-white/70 animate-fade-in text-lg" style={{ animationDelay: "100ms" }}>
                <span className="relative inline-block">
                  Hospital Management Dashboard
                  <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-gradient-to-r from-neon-cyan to-transparent"></span>
                </span>
              </p>
            </div>
            
            <AnimatedButton 
              variant="outline" 
              size="sm" 
              onClick={refreshData}
              disabled={loading}
              className="shadow-glow-cyan hover:shadow-glow-mixed transition-all duration-300"
            >
              <RefreshCw size={16} className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh Data
            </AnimatedButton>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-10">
            <StatCard 
              title="Total Patients" 
              value={stats.totalPatients} 
              icon={UserRound}
              description="All registered patients"
              variant="cyan"
              className="hover:scale-105 hover:shadow-glow-cyan transition-all duration-300 backdrop-blur-md"
            />
            <StatCard 
              title="Active Cases" 
              value={stats.activePatients} 
              icon={Activity}
              description="Currently under treatment"
              variant="magenta"
              className="hover:scale-105 hover:shadow-glow-magenta transition-all duration-300 backdrop-blur-md"
            />
            <StatCard 
              title="Follow-ups" 
              value={stats.followUpPatients} 
              icon={CalendarDays}
              description="Scheduled for follow-up"
              variant="cyan"
              className="hover:scale-105 hover:shadow-glow-cyan transition-all duration-300 backdrop-blur-md"
            />
            <StatCard 
              title="Discharged" 
              value={stats.dischargedPatients} 
              icon={CheckCircle}
              description="Successfully treated"
              variant="magenta"
              className="hover:scale-105 hover:shadow-glow-magenta transition-all duration-300 backdrop-blur-md"
            />
            <StatCard 
              title="Total Visits" 
              value={stats.totalVisits} 
              icon={Hospital}
              description="Cumulative patient visits"
              variant="mixed"
              className="hover:scale-105 hover:shadow-glow-mixed transition-all duration-300 backdrop-blur-md"
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            <div className="lg:col-span-2">
              <div className="glass-card rounded-lg p-6 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300 shadow-glow-subtle relative overflow-hidden">
                <div className="absolute inset-0 cyber-circuit opacity-5"></div>
                
                <div className="flex justify-between items-center mb-6 relative z-10">
                  <h2 className="text-xl font-semibold cyber-glow flex items-center">
                    <BarChart3 size={20} className="mr-2 text-neon-cyan" />
                    Recent Patients
                  </h2>
                  <div className="relative w-full max-w-xs">
                    <Input 
                      type="text" 
                      placeholder="Search patients..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-white/5 border-white/10 pl-10 focus:border-neon-cyan focus:shadow-glow-cyan"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
                  </div>
                </div>
                
                <Tabs defaultValue="all" className="mb-6" onValueChange={handleTabChange} value={activeFilter}>
                  <TabsList className="bg-white/5 border border-white/10 cyber-border">
                    <TabsTrigger 
                      value="all" 
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-cyan/20 data-[state=active]:to-neon-magenta/20 data-[state=active]:text-white data-[state=active]:shadow-glow-subtle"
                    >
                      All Patients
                    </TabsTrigger>
                    <TabsTrigger 
                      value="active" 
                      className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400 data-[state=active]:shadow-[0_0_10px_rgba(74,222,128,0.3)]"
                    >
                      Active
                    </TabsTrigger>
                    <TabsTrigger 
                      value="follow-up" 
                      className="data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-400 data-[state=active]:shadow-[0_0_10px_rgba(234,179,8,0.3)]"
                    >
                      Follow-Up
                    </TabsTrigger>
                    <TabsTrigger 
                      value="discharged" 
                      className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400 data-[state=active]:shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                    >
                      Discharged
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                
                {loading ? (
                  <div className="text-center py-12 relative">
                    <div className="hexagon inline-block h-16 w-16 relative animate-spin-slow">
                      <div className="absolute inset-2 hexagon border border-neon-cyan/50 animate-pulse"></div>
                    </div>
                    <p className="text-white/60 mt-4">Loading patients...</p>
                  </div>
                ) : filteredPatients.length > 0 ? (
                  <div className="space-y-4 relative z-10">
                    {filteredPatients.map((patient, index) => (
                      <div key={patient.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                        <PatientCard 
                          patient={patient} 
                          onStatusChange={handleStatusChange}
                          userRole={currentUser?.role}
                        />
                      </div>
                    ))}
                    
                    <div className="text-center pt-6">
                      <Link 
                        to={`/patients${activeFilter !== 'all' ? `?status=${activeFilter}` : ''}`}
                        className="relative inline-flex items-center px-6 py-3 overflow-hidden rounded-full group bg-gradient-to-r from-white/5 to-white/10 hover:from-neon-cyan/20 hover:to-neon-magenta/20 transition-all duration-300 shadow-glow-subtle button-glow"
                      >
                        <span className="relative text-neon-cyan group-hover:text-white transition-colors flex items-center">
                          View all patients
                          <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white/5 rounded-lg border border-white/10 relative overflow-hidden">
                    <div className="absolute inset-0 cyber-circuit opacity-5"></div>
                    <p className="text-white/60 mb-4 relative z-10">No patients found matching your criteria</p>
                    <AnimatedButton variant="outline" size="sm" className="relative z-10 shadow-glow-cyan">
                      <Link to="/create-patient">Add New Patient</Link>
                    </AnimatedButton>
                  </div>
                )}
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="glass-card rounded-lg p-6 h-full backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300 shadow-glow-subtle relative overflow-hidden">
                <div className="absolute inset-0 cyber-circuit opacity-5"></div>
                
                <h2 className="text-xl font-semibold cyber-glow mb-6 relative z-10">Quick Actions</h2>
                <div className="space-y-4 relative z-10">
                  <Link to="/create-patient" className="glass-card group flex items-center p-4 rounded-md border border-white/10 hover:border-neon-cyan transition-all duration-300 bg-gradient-to-r from-transparent to-transparent hover:from-neon-cyan/10 hover:to-neon-magenta/10 shadow-glow-subtle hover:shadow-glow-cyan">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-neon-cyan/20 to-neon-magenta/20 flex items-center justify-center mr-4 group-hover:from-neon-cyan/40 group-hover:to-neon-magenta/40 transition-colors shadow-glow-subtle">
                      <UserPlus size={22} className="text-neon-cyan drop-shadow-glow" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white group-hover:text-neon-cyan transition-colors">Create New Patient</h3>
                      <p className="text-sm text-white/60">Add a new patient record</p>
                    </div>
                  </Link>
                  
                  <Link to="/patients" className="glass-card group flex items-center p-4 rounded-md border border-white/10 hover:border-neon-cyan transition-all duration-300 bg-gradient-to-r from-transparent to-transparent hover:from-neon-cyan/10 hover:to-neon-magenta/10 shadow-glow-subtle hover:shadow-glow-cyan">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-neon-cyan/20 to-neon-magenta/20 flex items-center justify-center mr-4 group-hover:from-neon-cyan/40 group-hover:to-neon-magenta/40 transition-colors shadow-glow-subtle">
                      <UserRound size={22} className="text-neon-cyan drop-shadow-glow" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white group-hover:text-neon-cyan transition-colors">Patient History</h3>
                      <p className="text-sm text-white/60">View all patient records</p>
                    </div>
                  </Link>
                </div>
                
                <div className="mt-6 p-5 rounded-md bg-gradient-to-r from-neon-cyan/5 to-neon-magenta/5 border border-white/10 hover:border-neon-cyan/20 transition-all shadow-glow-subtle relative overflow-hidden group hover:shadow-glow-mixed">
                  <div className="absolute inset-0 cyber-circuit opacity-5 group-hover:opacity-10 transition-opacity"></div>
                  <h3 className="font-medium text-white mb-3 flex items-center cyber-glow relative z-10">
                    <Activity size={18} className="mr-2 text-neon-cyan" />
                    Today's Schedule
                  </h3>
                  <p className="text-sm text-white/70 mb-4 relative z-10">
                    {stats.todayActiveCount > 0 
                      ? `You have ${stats.todayActiveCount} active ${stats.todayActiveCount === 1 ? 'case' : 'cases'} today`
                      : "No active cases today"}
                  </p>
                  <AnimatedButton 
                    variant="outline" 
                    size="sm" 
                    className="w-full bg-white/5 hover:bg-gradient-to-r hover:from-neon-cyan/20 hover:to-neon-magenta/20 relative z-10 button-glow"
                  >
                    <Link to="/patients?filter=today" className="w-full inline-block">
                      View Today's Cases
                    </Link>
                  </AnimatedButton>
                </div>
                
                <div className="mt-6 p-5 rounded-md bg-gradient-to-r from-neon-magenta/5 to-neon-cyan/5 border border-white/10 hover:border-neon-magenta/20 transition-all shadow-glow-subtle relative overflow-hidden group hover:shadow-glow-mixed">
                  <div className="absolute inset-0 cyber-circuit opacity-5 group-hover:opacity-10 transition-opacity"></div>
                  <h3 className="font-medium text-white mb-3 flex items-center cyber-glow-magenta relative z-10">
                    <BarChart3 size={18} className="mr-2 text-neon-magenta" />
                    Activity Summary
                  </h3>
                  <div className="space-y-2 relative z-10">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-white/70">New Patients (Week)</span>
                      <span className="text-sm text-neon-magenta font-semibold">{stats.newPatientsThisWeek}</span>
                    </div>
                    <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-neon-magenta to-neon-cyan h-full rounded-full" style={{ width: `${Math.min(Math.max(stats.newPatientsThisWeek * 10, 10), 100)}%` }}></div>
                    </div>
                  </div>
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
