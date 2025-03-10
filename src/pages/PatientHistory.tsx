
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HexagonBackground from "@/components/HexagonBackground";
import AnimatedButton from "@/components/AnimatedButton";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Patient } from "@/lib/types";
import { Trash2, RefreshCw, FilterIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PatientHistory = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    
    fetchPatients();
  }, [statusFilter]);
  
  const fetchPatients = async () => {
    try {
      setLoading(true);
      
      const storedUser = localStorage.getItem('currentUser');
      const user = storedUser ? JSON.parse(storedUser) : null;
      
      if (!user) {
        navigate('/signin');
        return;
      }
      
      let query = supabase.from('patients').select('*');
      
      // If user is doctor, only show their patients
      if (user.role === 'doctor') {
        query = query.eq('doctor_id', user.id);
      }
      
      // Apply status filter if not "All"
      if (statusFilter !== "All") {
        query = query.eq('status', statusFilter);
      }
      
      // Order by latest first
      query = query.order('created_at', { ascending: false });
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      // Map database fields to interface properties
      const mappedData: Patient[] = (data || []).map(item => ({
        id: item.id,
        name: item.name,
        age: item.age,
        gender: item.gender as 'Male' | 'Female' | 'Other',
        cnic: item.cnic,
        phoneNumber: item.phone_number,
        email: item.email,
        address: item.address,
        disease: item.disease,
        diseaseDescription: item.disease_description,
        visitDate: item.visit_date,
        visitCount: item.visit_count,
        doctorNotes: item.doctor_notes,
        status: item.status as 'Active' | 'Discharged' | 'Follow-Up',
        doctorId: item.doctor_id,
        createdAt: item.created_at
      }));
      
      setPatients(mappedData);
    } catch (error: any) {
      console.error('Error fetching patients:', error);
      toast({
        title: "Error",
        description: "Failed to load patient records",
        variant: "magenta",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleDelete = (patient: Patient) => {
    setSelectedPatient(patient);
    setShowDeleteDialog(true);
  };
  
  const confirmDelete = async () => {
    if (!selectedPatient) return;
    
    try {
      const { error } = await supabase
        .from('patients')
        .delete()
        .eq('id', selectedPatient.id);
      
      if (error) throw error;
      
      setPatients(prevPatients => 
        prevPatients.filter(p => p.id !== selectedPatient.id)
      );
      
      toast({
        title: "Success",
        description: "Patient record deleted successfully",
      });
      
      setShowDeleteDialog(false);
      setSelectedPatient(null);
    } catch (error: any) {
      console.error('Error deleting patient:', error);
      toast({
        title: "Error",
        description: "Failed to delete patient record",
        variant: "magenta",
      });
    }
  };
  
  const cancelDelete = () => {
    setShowDeleteDialog(false);
    setSelectedPatient(null);
  };
  
  const handleRefresh = () => {
    fetchPatients();
    toast({
      title: "Refreshed",
      description: "Patient list has been refreshed",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <HexagonBackground />
      <Navbar isAuth />
      
      <main className="flex-grow pt-24 pb-16 px-4 container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 animate-fade-in bg-clip-text text-transparent bg-gradient-to-r from-neon-cyan to-neon-magenta">
              Patient History
            </h1>
            <p className="text-white/70 animate-fade-in" style={{ animationDelay: "100ms" }}>
              View and manage all patient records
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
            <div className="w-full sm:w-auto">
              <Select 
                value={statusFilter} 
                onValueChange={setStatusFilter}
              >
                <SelectTrigger className="bg-white/5 border-white/10 text-white w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className="bg-dark-secondary border-white/10">
                  <SelectItem value="All">All Patients</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Follow-Up">Follow-Up</SelectItem>
                  <SelectItem value="Discharged">Discharged</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <AnimatedButton 
              onClick={handleRefresh} 
              variant="outline" 
              size="sm"
              className="w-full sm:w-auto"
            >
              <RefreshCw size={16} className="mr-2" />
              Refresh
            </AnimatedButton>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="h-12 w-12 border-4 border-neon-cyan border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : patients.length === 0 ? (
          <div className="glass-card rounded-lg p-8 text-center">
            <p className="text-xl text-white/70 mb-4">No patient records found</p>
            {statusFilter !== "All" ? (
              <p className="text-white/50">
                No patients with status: <span className="text-neon-cyan">{statusFilter}</span>
              </p>
            ) : (
              <AnimatedButton onClick={() => navigate('/create-patient')}>
                Create Your First Patient
              </AnimatedButton>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {patients.map((patient) => (
              <div 
                key={patient.id} 
                className="glass-card rounded-lg border border-white/10 hover:border-neon-cyan/30 transition-colors duration-300 overflow-hidden flex flex-col"
              >
                <div className="p-6 flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-white">{patient.name}</h3>
                    <span 
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        patient.status === 'Active' 
                          ? 'bg-neon-cyan/20 text-neon-cyan' 
                          : patient.status === 'Follow-Up'
                            ? 'bg-neon-purple/20 text-neon-purple'
                            : 'bg-neon-magenta/20 text-neon-magenta'
                      }`}
                    >
                      {patient.status}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <p className="text-white/70">
                      <span className="text-white/50">Age:</span> {patient.age}
                    </p>
                    <p className="text-white/70">
                      <span className="text-white/50">Gender:</span> {patient.gender}
                    </p>
                    <p className="text-white/70">
                      <span className="text-white/50">CNIC:</span> {patient.cnic}
                    </p>
                    <p className="text-white/70">
                      <span className="text-white/50">Phone:</span> {patient.phoneNumber}
                    </p>
                    <p className="text-white/70">
                      <span className="text-white/50">Diagnosis:</span> {patient.disease}
                    </p>
                    {patient.diseaseDescription && (
                      <p className="text-white/70">
                        <span className="text-white/50">Description:</span> {patient.diseaseDescription}
                      </p>
                    )}
                    <p className="text-white/70">
                      <span className="text-white/50">Visit Date:</span> {new Date(patient.visitDate).toLocaleDateString()}
                    </p>
                  </div>
                  
                  {patient.doctorNotes && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <p className="text-white/50 text-sm mb-1">Doctor's Notes:</p>
                      <p className="text-white/80 text-sm">{patient.doctorNotes}</p>
                    </div>
                  )}
                </div>
                
                {currentUser && currentUser.role === 'admin' && (
                  <div className="p-4 bg-white/5 border-t border-white/10 mt-auto">
                    <AnimatedButton
                      variant="outline"
                      size="sm"
                      className="w-full text-neon-magenta hover:text-white"
                      onClick={() => handleDelete(patient)}
                    >
                      <Trash2 size={16} className="mr-2" />
                      Delete Record
                    </AnimatedButton>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent className="bg-[#071620] border border-white/10">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">Delete Patient Record</AlertDialogTitle>
              <AlertDialogDescription className="text-white/70">
                Are you sure you want to delete the record for {selectedPatient?.name}?
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-transparent border border-white/20 text-white hover:bg-white/10">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmDelete}
                className="bg-gradient-to-r from-neon-magenta to-neon-purple text-white"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
      
      <Footer />
    </div>
  );
};

export default PatientHistory;
