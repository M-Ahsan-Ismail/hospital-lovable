import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HexagonBackground from "@/components/HexagonBackground";
import AnimatedButton from "@/components/AnimatedButton";
import FollowUpNotification from "@/components/FollowUpNotification";
import { FileText, UserPlus, Activity, Calendar, User, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Patient } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { useFollowUpNotifications } from "@/hooks/useFollowUpNotifications";

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
  
  // Get current user from localStorage
  const storedUser = localStorage.getItem('currentUser');
  const currentUser = storedUser ? JSON.parse(storedUser) : null;
  const userName = currentUser?.fullName || 'Doctor';
  const userId = currentUser?.id;

  // Use follow-up notifications hook
  const { followUpCount, followUpPatients, showNotification, dismissNotification } = useFollowUpNotifications(userId);

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
      
      {/* Follow-up notification popup */}
      {showNotification && (
        <FollowUpNotification 
          count={followUpCount}
          patients={followUpPatients}
          onDismiss={dismissNotification}
        />
      )}
      
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
