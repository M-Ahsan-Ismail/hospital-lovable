
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HexagonBackground from "@/components/HexagonBackground";
import AnimatedButton from "@/components/AnimatedButton";
import { FileText, UserPlus, Activity, Calendar, User, RefreshCw, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Patient } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import PatientCard from "@/components/PatientCard";

const DoctorHome = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [stats, setStats] = useState({
    totalPatients: 0,
    activePatients: 0,
    followUpPatients: 0,
    recentVisits: 0,
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  
  // Get current user from localStorage
  const storedUser = localStorage.getItem('currentUser');
  const currentUser = storedUser ? JSON.parse(storedUser) : null;
  const userName = currentUser?.fullName || 'Doctor';
  const userId = currentUser?.id;

  useEffect(() => {
    // Fetch statistics data
    const fetchStats = async () => {
      if (!userId) return;
      
      try {
        setLoading(true);
        
        // Get all patients created by this doctor
        const { data: patientsData, error } = await supabase
          .from('patients')
          .select('*')
          .eq('doctor_id', userId);
        
        if (error) throw error;
        
        if (patientsData) {
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
          const totalPatients = formattedPatients.length;
          const activePatients = formattedPatients.filter(p => p.status === 'Active').length;
          const followUpPatients = formattedPatients.filter(p => p.status === 'Follow-Up').length;
          
          // Get recent visits (within the last 30 days)
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
          
          const recentVisits = formattedPatients.filter(p => {
            const visitDate = new Date(p.visitDate);
            return visitDate >= thirtyDaysAgo;
          }).length;
          
          setStats({
            totalPatients,
            activePatients,
            followUpPatients,
            recentVisits
          });
        }
      } catch (error: any) {
        console.error('Error fetching doctor stats:', error);
        toast({
          title: "Error",
          description: "Failed to load dashboard data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, [userId, toast]);
  
  // Filter patients based on search term
  useEffect(() => {
    if (patients.length > 0) {
      if (searchTerm.trim() === '') {
        // If no search term, show 3 most recent patients
        setFilteredPatients(patients.slice(0, 3));
      } else {
        // Filter by search term
        const query = searchTerm.toLowerCase().trim();
        const filtered = patients.filter(patient => 
          patient.name.toLowerCase().includes(query) ||
          patient.disease.toLowerCase().includes(query) ||
          patient.cnic.includes(query) ||
          (patient.phoneNumber && patient.phoneNumber.includes(query))
        );
        setFilteredPatients(filtered);
      }
    }
  }, [searchTerm, patients]);
  
  const handleStatusChange = (patientId: string, newStatus: string) => {
    // Update patients array with the new status
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
    
    setStats({
      ...stats,
      activePatients,
      followUpPatients,
    });
  };
  
  const refreshData = async () => {
    if (!userId) return;
    
    try {
      setLoading(true);
      
      // Get all patients created by this doctor
      const { data: patientsData, error } = await supabase
        .from('patients')
        .select('*')
        .eq('doctor_id', userId);
      
      if (error) throw error;
      
      if (patientsData) {
        // Calculate stats
        const totalPatients = patientsData.length;
        const activePatients = patientsData.filter(p => p.status === 'Active').length;
        const followUpPatients = patientsData.filter(p => p.status === 'Follow-Up').length;
        
        // Get recent visits (within the last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        const recentVisits = patientsData.filter(p => {
          const visitDate = new Date(p.visit_date);
          return visitDate >= thirtyDaysAgo;
        }).length;
        
        setStats({
          totalPatients,
          activePatients,
          followUpPatients,
          recentVisits
        });
        
        toast({
          title: "Success",
          description: "Dashboard data refreshed",
        });
      }
    } catch (error: any) {
      console.error('Error refreshing doctor stats:', error);
      toast({
        title: "Error",
        description: "Failed to refresh dashboard data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#040D12] to-[#071620]">
      <HexagonBackground />
      <Navbar isAuth={true} />
      
      <main className="container mx-auto px-4 pt-24 pb-16 relative z-10 flex-grow">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3 animate-fade-in bg-clip-text text-transparent bg-gradient-to-r from-neon-cyan to-neon-magenta">
              Welcome, <span className="text-white">{userName}</span>
            </h1>
            <p className="text-lg text-white/80 animate-fade-in" style={{ animationDelay: "100ms" }}>
              Manage your patients and medical records efficiently
            </p>
          </div>
          
          <AnimatedButton
            variant="outline"
            size="sm"
            onClick={refreshData}
            disabled={loading}
            className="mt-4 md:mt-0 shadow-glow-subtle"
          >
            <RefreshCw size={16} className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh Data
          </AnimatedButton>
        </div>
        
        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="glass-card rounded-lg p-6 border border-white/10 hover:border-neon-cyan/40 transition-all duration-300 hover:shadow-glow-cyan group">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-gradient-to-r from-neon-cyan/20 to-neon-cyan/5 text-neon-cyan mr-4 group-hover:from-neon-cyan/30 group-hover:to-neon-cyan/10 transition-colors">
                <User size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white">Total Patients</h3>
            </div>
            <p className="text-3xl font-bold text-neon-cyan mb-1">
              {loading ? <span className="animate-pulse">...</span> : stats.totalPatients}
            </p>
            <p className="text-white/60">Patients under your care</p>
          </div>
          
          <div className="glass-card rounded-lg p-6 border border-white/10 hover:border-neon-magenta/40 transition-all duration-300 hover:shadow-glow-magenta group">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-gradient-to-r from-neon-magenta/20 to-neon-magenta/5 text-neon-magenta mr-4 group-hover:from-neon-magenta/30 group-hover:to-neon-magenta/10 transition-colors">
                <Activity size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white">Active Cases</h3>
            </div>
            <p className="text-3xl font-bold text-neon-magenta mb-1">
              {loading ? <span className="animate-pulse">...</span> : stats.activePatients}
            </p>
            <p className="text-white/60">Currently under treatment</p>
          </div>
          
          <div className="glass-card rounded-lg p-6 border border-white/10 hover:border-neon-cyan/40 transition-all duration-300 hover:shadow-glow-cyan group">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-gradient-to-r from-neon-cyan/20 to-neon-cyan/5 text-neon-cyan mr-4 group-hover:from-neon-cyan/30 group-hover:to-neon-cyan/10 transition-colors">
                <Calendar size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white">Follow-ups</h3>
            </div>
            <p className="text-3xl font-bold text-neon-cyan mb-1">
              {loading ? <span className="animate-pulse">...</span> : stats.followUpPatients}
            </p>
            <p className="text-white/60">Scheduled for follow-up</p>
          </div>
          
          <div className="glass-card rounded-lg p-6 border border-white/10 hover:border-neon-magenta/40 transition-all duration-300 hover:shadow-glow-magenta group">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-gradient-to-r from-neon-magenta/20 to-neon-magenta/5 text-neon-magenta mr-4 group-hover:from-neon-magenta/30 group-hover:to-neon-magenta/10 transition-colors">
                <FileText size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white">Recent Visits</h3>
            </div>
            <p className="text-3xl font-bold text-neon-magenta mb-1">
              {loading ? <span className="animate-pulse">...</span> : stats.recentVisits}
            </p>
            <p className="text-white/60">Last 30 days</p>
          </div>
        </div>
        
        {/* Patient Search Section */}
        <div className="glass-card rounded-lg p-6 mb-10 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300 shadow-glow-subtle">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white bg-clip-text text-transparent bg-gradient-to-r from-neon-cyan to-white">Your Patients</h2>
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
              
              {searchTerm.trim() !== "" && (
                <div className="text-center pt-6">
                  <p className="text-white/70">Found {filteredPatients.length} patient{filteredPatients.length !== 1 ? 's' : ''} matching "{searchTerm}"</p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 bg-white/5 rounded-lg border border-white/10">
              <p className="text-white/60 mb-4">
                {searchTerm.trim() !== "" ? 
                  `No patients found matching "${searchTerm}"` : 
                  "No patients under your care yet"}
              </p>
              <AnimatedButton variant="outline" size="sm">
                <span onClick={() => navigate('/create-patient')}>Add New Patient</span>
              </AnimatedButton>
            </div>
          )}
        </div>
        
        {/* Main Actions */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="glass-card rounded-lg p-8 border border-white/10 hover:border-neon-cyan/30 transition-all duration-300 hover:shadow-glow-subtle bg-gradient-to-br from-neon-cyan/5 to-transparent backdrop-blur-md group">
            <UserPlus className="w-16 h-16 mb-6 text-neon-cyan group-hover:scale-110 transition-transform" />
            <h2 className="text-2xl font-bold mb-3 text-white">Create New Patient</h2>
            <p className="text-white/70 mb-6 group-hover:text-white/90 transition-colors">
              Add new patients to your records and begin tracking their medical history. Record personal details, diagnosis, and treatment plans.
            </p>
            <AnimatedButton 
              className="w-full bg-gradient-to-r from-neon-cyan to-neon-blue text-black shadow-glow-cyan"
              onClick={() => navigate('/create-patient')}
            >
              Create Patient
            </AnimatedButton>
          </div>
          
          <div className="glass-card rounded-lg p-8 border border-white/10 hover:border-neon-magenta/30 transition-all duration-300 hover:shadow-glow-subtle bg-gradient-to-br from-neon-magenta/5 to-transparent backdrop-blur-md group">
            <FileText className="w-16 h-16 mb-6 text-neon-magenta group-hover:scale-110 transition-transform" />
            <h2 className="text-2xl font-bold mb-3 text-white">Patient History</h2>
            <p className="text-white/70 mb-6 group-hover:text-white/90 transition-colors">
              View and manage records of all patients under your care. Update their status, add notes, and track their treatment progress.
            </p>
            <AnimatedButton 
              className="w-full bg-gradient-to-r from-neon-magenta to-neon-purple text-black shadow-glow-magenta"
              onClick={() => navigate('/patients')}
            >
              View Patients
            </AnimatedButton>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DoctorHome;
