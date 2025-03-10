
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HexagonBackground from "@/components/HexagonBackground";
import AnimatedButton from "@/components/AnimatedButton";
import PatientCard from "@/components/PatientCard";
import { Input } from "@/components/ui/input";
import { Search, RefreshCw, Trash2, AlertCircle } from "lucide-react";
import { fetchPatients, deletePatient } from "@/integrations/supabase/client";
import { Patient, User } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const PatientHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Get current user
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    
    // Fetch patients data
    const loadPatients = async () => {
      try {
        setLoading(true);
        
        const { data, error } = await fetchPatients();
        
        if (error) throw error;
        
        if (data) {
          setPatients(data);
        }
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to fetch patients",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadPatients();
  }, [toast]);
  
  useEffect(() => {
    // Filter patients based on search term
    const filtered = patients.filter(patient => 
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.disease.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.cnic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredPatients(filtered);
  }, [searchTerm, patients]);
  
  const refreshPatients = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await fetchPatients();
      
      if (error) throw error;
      
      if (data) {
        setPatients(data);
        toast({
          title: "Success",
          description: "Patient list refreshed",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to refresh patients",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handlePatientSelect = (patientId: string) => {
    setSelectedPatient(selectedPatient === patientId ? null : patientId);
  };
  
  const handleDeletePatient = (patientId: string) => {
    setSelectedPatient(patientId);
    setIsDeleteDialogOpen(true);
  };
  
  const confirmDeletePatient = async () => {
    if (!selectedPatient) return;
    
    try {
      const { success, error } = await deletePatient(selectedPatient);
      
      if (error) throw error;
      
      // Remove the deleted patient from state
      setPatients(patients.filter(p => p.id !== selectedPatient));
      
      toast({
        title: "Success",
        description: "Patient deleted successfully",
      });
      
      setSelectedPatient(null);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete patient",
        variant: "magenta",
      });
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };
  
  const handleStatusChange = (patientId: string, newStatus: string) => {
    // Update the patient status in the local state
    setPatients(patients.map(p => 
      p.id === patientId 
        ? { ...p, status: newStatus as 'Active' | 'Discharged' | 'Follow-Up' } 
        : p
    ));
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <HexagonBackground />
      <Navbar isAuth />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Patient History</h1>
              <p className="text-white/70">
                View and manage all patient records
              </p>
            </div>
            
            <div className="flex space-x-3">
              <AnimatedButton 
                variant="outline" 
                size="sm" 
                onClick={refreshPatients}
                disabled={loading}
              >
                <RefreshCw size={16} className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </AnimatedButton>
              
              {currentUser?.role === 'admin' && (
                <AnimatedButton 
                  variant="magenta" 
                  size="sm" 
                  onClick={() => selectedPatient && handleDeletePatient(selectedPatient)}
                  disabled={!selectedPatient}
                >
                  <Trash2 size={16} className="mr-2" />
                  Delete Selected
                </AnimatedButton>
              )}
            </div>
          </div>
          
          <div className="glass-card rounded-lg overflow-hidden mb-8">
            <div className="p-6">
              <div className="relative">
                <Input 
                  type="text" 
                  placeholder="Search by name, disease, CNIC or status..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white/5 border-white/10 pl-10 w-full focus:border-neon-cyan"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
              </div>
            </div>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="h-12 w-12 border-4 border-neon-cyan border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredPatients.length === 0 ? (
            <div className="glass-card rounded-lg p-10 text-center">
              <AlertCircle size={48} className="mx-auto mb-4 text-neon-magenta" />
              <h3 className="text-xl font-medium mb-2">No Patients Found</h3>
              <p className="text-white/70 mb-6">
                {searchTerm 
                  ? `No patients matching "${searchTerm}"`
                  : "There are no patient records yet"
                }
              </p>
              <AnimatedButton onClick={() => navigate('/create-patient')}>
                Create New Patient
              </AnimatedButton>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPatients.map((patient) => (
                <PatientCard
                  key={patient.id}
                  patient={patient}
                  onStatusChange={handleStatusChange}
                  onDeletePatient={() => handleDeletePatient(patient.id)}
                  selected={selectedPatient === patient.id}
                  onSelect={handlePatientSelect}
                  userRole={currentUser?.role}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-[#0C1824] border border-white/10">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription className="text-white/70">
              Are you sure you want to delete this patient record? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-white/5 text-white hover:bg-white/10 border border-white/10">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeletePatient}
              className="bg-red-500/80 hover:bg-red-500 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <Footer />
    </div>
  );
};

export default PatientHistory;
