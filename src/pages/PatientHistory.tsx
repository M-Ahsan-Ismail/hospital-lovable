import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HexagonBackground from "@/components/HexagonBackground";
import PatientCard from "@/components/PatientCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Patient } from "@/lib/types";
import { supabase } from "@/integrations/supabase/client";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const PatientHistory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortBy, setSortBy] = useState("date");
  const [loading, setLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [doctorNotes, setDoctorNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  
  // Get current user from localStorage
  const storedUser = localStorage.getItem('currentUser');
  const currentUser = storedUser ? JSON.parse(storedUser) : null;
  const userId = currentUser?.id;

  useEffect(() => {
    const fetchPatients = async () => {
      if (!userId) return;
      
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('patients')
          .select('*')
          .eq('doctor_id', userId)
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        const formattedPatients: Patient[] = (data || []).map(item => ({
          id: item.id,
          name: item.name,
          age: item.age,
          gender: item.gender as 'Male' | 'Female' | 'Other',
          email: item.email,
          address: item.address,
          disease: item.disease,
          diseaseDescription: item.disease_description,
          visitDate: item.visit_date,
          visitCount: item.visit_count,
          doctorNotes: item.doctor_notes,
          status: item.status as 'Active' | 'Discharged' | 'Follow-Up',
          doctorId: item.doctor_id,
          createdAt: item.created_at,
          followUpDate: item.follow_up_date
        }));
        
        setPatients(formattedPatients);
        
        // Check for filter parameter in URL
        const urlParams = new URLSearchParams(location.search);
        const filterParam = urlParams.get('filter');
        if (filterParam === 'today') {
          setFilterStatus('Today\'s Patients');
        }
        
      } catch (error: any) {
        console.error('Error fetching patients:', error);
        toast({
          title: "Error",
          description: error.message || "Failed to fetch patients",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchPatients();
  }, [userId, location.search, toast]);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleFilterChange = (value: string) => {
    setFilterStatus(value);
  };
  
  const handleSortChange = (value: string) => {
    setSortBy(value);
  };
  
  const handleCardSelect = (patient: Patient) => {
    setSelectedPatient(patient);
    setDoctorNotes(patient.doctorNotes || "");
    setIsDialogOpen(true);
  };
  
  const handleNotesSave = async () => {
    if (!selectedPatient) return;
    
    setIsSaving(true);
    
    try {
      const { data, error } = await supabase
        .from('patients')
        .update({ doctor_notes: doctorNotes })
        .eq('id', selectedPatient.id);
      
      if (error) throw error;
      
      // Update local state
      setPatients(patients.map(p => 
        p.id === selectedPatient.id ? { ...p, doctorNotes } : p
      ));
      
      toast({
        title: "Success",
        description: "Doctor's notes saved successfully",
      });
      setIsDialogOpen(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save notes",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const filteredPatients = useMemo(() => {
    let filtered = patients.filter(patient => {
      const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          patient.disease.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (patient.email && patient.email.toLowerCase().includes(searchTerm.toLowerCase()));
      
      if (filterStatus === 'All') return matchesSearch;
      
      if (filterStatus === 'Today\'s Patients') {
        // Get today's date in YYYY-MM-DD format
        const today = new Date();
        const todayString = today.getFullYear() + '-' + 
          String(today.getMonth() + 1).padStart(2, '0') + '-' + 
          String(today.getDate()).padStart(2, '0');
        
        console.log('Filtering for today\'s patients. Today:', todayString);
        console.log('All patients:', patients.map(p => ({ name: p.name, followUpDate: p.followUpDate, status: p.status })));
        
        const todayPatients = matchesSearch && 
          patient.status === 'Follow-Up' && 
          patient.followUpDate === todayString;
        
        console.log(`Patient ${patient.name}: followUpDate=${patient.followUpDate}, status=${patient.status}, isToday=${todayPatients}`);
        
        return todayPatients;
      }
      
      return matchesSearch && patient.status === filterStatus;
    });

    if (sortBy === 'name') {
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'date') {
      filtered = filtered.sort((a, b) => new Date(b.visitDate).getTime() - new Date(a.visitDate).getTime());
    } else if (sortBy === 'disease') {
      filtered = filtered.sort((a, b) => a.disease.localeCompare(b.disease));
    }

    return filtered;
  }, [patients, searchTerm, filterStatus, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#040D12] to-[#071620]">
      <HexagonBackground />
      <Navbar isAuth={true} />
      
      <main className="container mx-auto px-4 pt-24 pb-16 relative z-10 flex-grow">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-4xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-neon-cyan to-neon-magenta">
            Patient History
          </h1>
          <Button onClick={() => navigate('/create-patient')} className="bg-gradient-to-r from-neon-cyan to-neon-magenta text-black">
            Add Patient
          </Button>
        </div>
        
        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex items-center w-full md:w-auto">
            <Input
              type="text"
              placeholder="Search patients..."
              className="bg-[#0C1824] text-white border-white/20 shadow-glow"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <Label htmlFor="filter" className="text-sm text-white/70 mr-2">Filter:</Label>
              <Select value={filterStatus} onValueChange={handleFilterChange}>
                <SelectTrigger className="bg-[#0C1824] text-white/90 border-white/20 w-[180px] shadow-glow">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent className="bg-[#0C1824] text-white/80 border-white/10">
                  <SelectItem value="All">All Patients</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Discharged">Discharged</SelectItem>
                  <SelectItem value="Follow-Up">Follow-Up</SelectItem>
                  <SelectItem value="Today's Patients">Today's Patients</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center">
              <Label htmlFor="sort" className="text-sm text-white/70 mr-2">Sort By:</Label>
              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="bg-[#0C1824] text-white/90 border-white/20 w-[150px] shadow-glow">
                  <SelectValue placeholder="Date" />
                </SelectTrigger>
                <SelectContent className="bg-[#0C1824] text-white/80 border-white/10">
                  <SelectItem value="date">Visit Date</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="disease">Disease</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-48 text-white/50">
            <ReloadIcon className="mr-2 h-6 w-6 animate-spin" /> Loading patients...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <PatientCard
                  key={patient.id}
                  patient={patient}
                  onSelect={() => handleCardSelect(patient)}
                />
              ))
            ) : (
              <div className="text-white/50 text-center w-full py-12">
                No patients found with the current filters.
              </div>
            )}
          </div>
        )}
      </main>
      
      <Footer />
      
      {/* Doctor's Notes Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-[#071620] border border-white/10 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Doctor's Notes</DialogTitle>
            <DialogDescription className="text-white/70">
              Add or edit notes for the selected patient.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="notes" className="text-white/70">Notes</Label>
              <Textarea
                id="notes"
                value={doctorNotes}
                onChange={(e) => setDoctorNotes(e.target.value)}
                placeholder="Type your notes here."
                className="bg-[#0C1824] text-white border-white/20 shadow-glow resize-none"
              />
            </div>
          </div>
          
          <Button 
            onClick={handleNotesSave}
            disabled={isSaving}
            className="bg-gradient-to-r from-neon-cyan to-neon-magenta text-black w-full"
          >
            {isSaving ? (
              <>
                Saving...
                <ReloadIcon className="ml-2 h-4 w-4 animate-spin" />
              </>
            ) : (
              "Save Notes"
            )}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PatientHistory;
