
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HexagonBackground from "@/components/HexagonBackground";
import AnimatedButton from "@/components/AnimatedButton";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Patient } from "@/lib/types";
import { Trash2, RefreshCw, FilterIcon, Search, X, ChevronUp, ChevronDown, Check, Calendar } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { isToday, parseISO, format, addDays } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { updatePatientStatus } from "@/integrations/supabase/client";

const PatientHistory = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Patient[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [patientDialogOpen, setPatientDialogOpen] = useState(false);
  const [showFollowUpDialog, setShowFollowUpDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(addDays(new Date(), 7));
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [updatingPatientId, setUpdatingPatientId] = useState<string | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    
    const urlParams = new URLSearchParams(location.search);
    const filterParam = urlParams.get('filter');
    
    if (filterParam === 'today') {
      setStatusFilter('Today');
    }
    
    fetchPatients();

    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [location]);
  
  useEffect(() => {
    if (patients.length > 0) {
      let results = [...patients];
      
      if (statusFilter === 'Today') {
        results = results.filter(patient => {
          try {
            return isToday(parseISO(patient.visitDate));
          } catch (e) {
            return false;
          }
        });
      } else if (statusFilter !== "All") {
        results = results.filter(patient => patient.status === statusFilter);
      }
      
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        results = patients.filter(patient => 
          patient.name.toLowerCase().includes(query)
        );
        setSearchResults(results.slice(0, 5)); // Limit to 5 suggestions
        setShowSearchResults(true);
      } else {
        setSearchResults([]);
        setShowSearchResults(false);
      }
      
      setFilteredPatients(results);
    } else {
      setFilteredPatients([]);
    }
  }, [patients, searchQuery, statusFilter]);
  
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
      
      if (user.role === 'doctor') {
        query = query.eq('doctor_id', user.id);
      }
      
      query = query.order('created_at', { ascending: false });
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      const mappedData: Patient[] = (data || []).map(item => ({
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
      
      setPatients(mappedData);
      
      const urlParams = new URLSearchParams(location.search);
      const filterParam = urlParams.get('filter');
      
      if (filterParam === 'today') {
        const todayPatients = mappedData.filter(patient => {
          try {
            return isToday(parseISO(patient.visitDate));
          } catch (e) {
            return false;
          }
        });
        setFilteredPatients(todayPatients);
      } else {
        setFilteredPatients(mappedData);
      }
    } catch (error: any) {
      console.error('Error fetching patients:', error);
      toast({
        title: "Error",
        description: "Failed to load patient records",
        variant: "destructive",
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
        variant: "destructive",
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

  const handlePatientSelect = (patient: Patient) => {
    setSelectedPatient(patient);
    setPatientDialogOpen(true);
    setSearchQuery("");
    setShowSearchResults(false);
  };

  const handlePatientClick = (patient: Patient) => {
    setSelectedPatient(patient);
    setPatientDialogOpen(true);
  };

  const handleSearchFocus = () => {
    if (searchQuery.trim() !== '' && searchResults.length > 0) {
      setShowSearchResults(true);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const handleStatusChange = (patient: Patient, newStatus: string) => {
    if (patient.status === newStatus) return;
    
    // If changing to follow-up, show the follow-up date dialog
    if (newStatus === "Follow-Up") {
      setSelectedPatient(patient);
      setSelectedDate(patient.followUpDate ? new Date(patient.followUpDate) : addDays(new Date(), 7));
      setShowFollowUpDialog(true);
      return;
    }
    
    updatePatientStatusInternal(patient.id, newStatus);
  };
  
  const handleFollowUpConfirm = async () => {
    if (!selectedPatient || !selectedDate) return;
    
    const formattedDate = format(selectedDate, "yyyy-MM-dd");
    await updatePatientStatusInternal(selectedPatient.id, "Follow-Up", formattedDate);
    setShowFollowUpDialog(false);
  };
  
  const updatePatientStatusInternal = async (patientId: string, newStatus: string, followUpDate?: string) => {
    setUpdatingStatus(true);
    setUpdatingPatientId(patientId);
    
    try {
      const { data, error } = await updatePatientStatus(patientId, newStatus, followUpDate);
      
      if (error) throw error;
      
      // Update the patient in the local state
      setPatients(prevPatients => 
        prevPatients.map(p => 
          p.id === patientId 
            ? { 
                ...p, 
                status: newStatus as 'Active' | 'Discharged' | 'Follow-Up',
                followUpDate: followUpDate
              } 
            : p
        )
      );
      
      // If the dialog is open with this patient, update the selected patient
      if (selectedPatient && selectedPatient.id === patientId) {
        setSelectedPatient({
          ...selectedPatient,
          status: newStatus as 'Active' | 'Discharged' | 'Follow-Up',
          followUpDate
        });
      }
      
      toast({
        title: "Status Updated",
        description: `Patient status changed to ${newStatus}`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update status",
        variant: "destructive",
      });
    } finally {
      setUpdatingStatus(false);
      setUpdatingPatientId(null);
    }
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
                  <SelectItem value="Today">Today's Patients</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Follow-Up">Follow-Up</SelectItem>
                  <SelectItem value="Discharged">Discharged</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="relative w-full sm:w-auto" ref={searchRef}>
              <Input
                placeholder="Search patients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={handleSearchFocus}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40 pr-8"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
              
              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-dark-secondary border border-white/10 rounded-md shadow-lg z-50 max-h-60 overflow-auto">
                  <div className="p-1">
                    {searchResults.map((patient) => (
                      <div 
                        key={patient.id}
                        className="px-4 py-2 hover:bg-white/10 rounded cursor-pointer flex items-center transition-colors"
                        onClick={() => handlePatientSelect(patient)}
                      >
                        <div className="flex-grow">
                          <div className="text-white font-medium">{patient.name}</div>
                          <div className="text-white/60 text-sm flex items-center gap-2">
                            <span>{patient.disease}</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-white/30"></span>
                            <span>{patient.gender}</span>
                          </div>
                        </div>
                        <div 
                          className={`px-2 py-1 text-xs rounded-full ml-2 ${
                            patient.status === 'Active' ? 'bg-neon-cyan/20 text-neon-cyan' : 
                            patient.status === 'Follow-Up' ? 'bg-neon-purple/20 text-neon-purple' : 
                            'bg-neon-magenta/20 text-neon-magenta'
                          }`}
                        >
                          {patient.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
        ) : filteredPatients.length === 0 ? (
          <div className="glass-card rounded-lg p-8 text-center">
            <p className="text-xl text-white/70 mb-4">No patient records found</p>
            {searchQuery ? (
              <p className="text-white/50 mb-4">
                No results for: <span className="text-neon-cyan">"{searchQuery}"</span>
              </p>
            ) : statusFilter !== "All" ? (
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
            {filteredPatients.map((patient) => (
              <div 
                key={patient.id} 
                className="glass-card rounded-lg border border-white/10 hover:border-neon-cyan/30 transition-colors duration-300 overflow-hidden flex flex-col cursor-pointer hover:scale-[1.01] transition-transform"
                onClick={() => handlePatientClick(patient)}
              >
                <div className="p-6 flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-white">{patient.name}</h3>
                    <div className="relative">
                      <div 
                        className={`px-2 py-1 rounded-full text-xs font-medium cursor-pointer ${
                          patient.status === 'Active' 
                            ? 'bg-neon-cyan/20 text-neon-cyan' 
                            : patient.status === 'Follow-Up'
                              ? 'bg-neon-purple/20 text-neon-purple'
                              : 'bg-neon-magenta/20 text-neon-magenta'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          // Toggle status selection dropdown
                          const dropdown = e.currentTarget.nextElementSibling;
                          if (dropdown) {
                            dropdown.classList.toggle('hidden');
                          }
                        }}
                      >
                        {updatingStatus && updatingPatientId === patient.id ? "Updating..." : patient.status}
                      </div>
                      <div className="absolute right-0 top-full mt-1 bg-dark-secondary z-10 border border-white/10 rounded shadow-lg hidden w-40">
                        <div className="py-1">
                          <button
                            className="flex items-center w-full px-3 py-2 text-sm text-white/80 hover:bg-white/5"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStatusChange(patient, "Active");
                              e.currentTarget.parentElement?.parentElement?.classList.add('hidden');
                            }}
                          >
                            <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
                            Active
                            {patient.status === "Active" && <Check size={14} className="ml-auto" />}
                          </button>
                          <button
                            className="flex items-center w-full px-3 py-2 text-sm text-white/80 hover:bg-white/5"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStatusChange(patient, "Follow-Up");
                              e.currentTarget.parentElement?.parentElement?.classList.add('hidden');
                            }}
                          >
                            <div className="w-2 h-2 rounded-full bg-yellow-400 mr-2"></div>
                            Follow-Up
                            {patient.status === "Follow-Up" && <Check size={14} className="ml-auto" />}
                          </button>
                          <button
                            className="flex items-center w-full px-3 py-2 text-sm text-white/80 hover:bg-white/5"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStatusChange(patient, "Discharged");
                              e.currentTarget.parentElement?.parentElement?.classList.add('hidden');
                            }}
                          >
                            <div className="w-2 h-2 rounded-full bg-blue-400 mr-2"></div>
                            Discharged
                            {patient.status === "Discharged" && <Check size={14} className="ml-auto" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <p className="text-white/70">
                      <span className="text-white/50">Age:</span> {patient.age}
                    </p>
                    <p className="text-white/70">
                      <span className="text-white/50">Gender:</span> {patient.gender}
                    </p>
                    {patient.email && (
                      <p className="text-white/70">
                        <span className="text-white/50">Email:</span> {patient.email}
                      </p>
                    )}
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
                    
                    {patient.status === "Follow-Up" && patient.followUpDate && (
                      <div className="flex items-center text-yellow-300 bg-yellow-500/10 px-3 py-2 rounded-md">
                        <Calendar size={16} className="mr-2 text-yellow-400" />
                        <span className="text-sm">
                          Follow-Up Date: {formatDate(patient.followUpDate)}
                        </span>
                      </div>
                    )}
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
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(patient);
                      }}
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

        <Dialog open={patientDialogOpen} onOpenChange={setPatientDialogOpen}>
          <DialogContent className="bg-[#071620] border border-white/10 max-w-3xl max-h-[90vh] overflow-y-auto">
            {selectedPatient && (
              <>
                <DialogHeader>
                  <div className="flex justify-between items-center mb-4">
                    <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-cyan to-neon-magenta">
                      Patient Details
                    </DialogTitle>
                    <div className="relative inline-block">
                      <div 
                        className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer ${
                          selectedPatient.status === 'Active' 
                            ? 'bg-neon-cyan/20 text-neon-cyan' 
                            : selectedPatient.status === 'Follow-Up'
                              ? 'bg-neon-purple/20 text-neon-purple'
                              : 'bg-neon-magenta/20 text-neon-magenta'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          // Toggle status selection dropdown
                          const dropdown = e.currentTarget.nextElementSibling;
                          if (dropdown) {
                            dropdown.classList.toggle('hidden');
                          }
                        }}
                      >
                        {updatingStatus && updatingPatientId === selectedPatient.id ? "Updating..." : selectedPatient.status}
                      </div>
                      <div className="absolute right-0 top-full mt-1 bg-dark-secondary z-10 border border-white/10 rounded shadow-lg hidden w-40">
                        <div className="py-1">
                          <button
                            className="flex items-center w-full px-3 py-2 text-sm text-white/80 hover:bg-white/5"
                            onClick={() => {
                              handleStatusChange(selectedPatient, "Active");
                              document.querySelector('.status-dropdown')?.classList.add('hidden');
                            }}
                          >
                            <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
                            Active
                            {selectedPatient.status === "Active" && <Check size={14} className="ml-auto" />}
                          </button>
                          <button
                            className="flex items-center w-full px-3 py-2 text-sm text-white/80 hover:bg-white/5"
                            onClick={() => {
                              handleStatusChange(selectedPatient, "Follow-Up");
                              document.querySelector('.status-dropdown')?.classList.add('hidden');
                            }}
                          >
                            <div className="w-2 h-2 rounded-full bg-yellow-400 mr-2"></div>
                            Follow-Up
                            {selectedPatient.status === "Follow-Up" && <Check size={14} className="ml-auto" />}
                          </button>
                          <button
                            className="flex items-center w-full px-3 py-2 text-sm text-white/80 hover:bg-white/5"
                            onClick={() => {
                              handleStatusChange(selectedPatient, "Discharged");
                              document.querySelector('.status-dropdown')?.classList.add('hidden');
                            }}
                          >
                            <div className="w-2 h-2 rounded-full bg-blue-400 mr-2"></div>
                            Discharged
                            {selectedPatient.status === "Discharged" && <Check size={14} className="ml-auto" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <DialogDescription className="text-white/70">
                    Full medical record for {selectedPatient.name}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                  <div className="space-y-6">
                    <div className="glass-card rounded-lg border border-white/10 p-4">
                      <h3 className="text-lg font-semibold text-white mb-3">Personal Information</h3>
                      
                      <div className="space-y-3">
                        <div>
                          <p className="text-white/50 text-sm">Full Name</p>
                          <p className="text-white text-lg">{selectedPatient.name}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-white/50 text-sm">Age</p>
                            <p className="text-white">{selectedPatient.age} years</p>
                          </div>
                          
                          <div>
                            <p className="text-white/50 text-sm">Gender</p>
                            <p className="text-white">{selectedPatient.gender}</p>
                          </div>
                        </div>
                        
                        {selectedPatient.email && (
                          <div>
                            <p className="text-white/50 text-sm">Email</p>
                            <p className="text-white">{selectedPatient.email}</p>
                          </div>
                        )}
                        
                        {selectedPatient.address && (
                          <div>
                            <p className="text-white/50 text-sm">Address</p>
                            <p className="text-white">{selectedPatient.address}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="glass-card rounded-lg border border-white/10 p-4 bg-gradient-to-br from-neon-cyan/5 to-neon-magenta/5">
                      <h3 className="text-lg font-semibold text-white mb-3">Medical Information</h3>
                      
                      <div className="space-y-3">
                        <div>
                          <p className="text-white/50 text-sm">Diagnosis</p>
                          <p className="text-white text-lg">{selectedPatient.disease}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-white/50 text-sm">Visit Date</p>
                            <p className="text-white">{formatDate(selectedPatient.visitDate)}</p>
                          </div>
                          
                          <div>
                            <p className="text-white/50 text-sm">Visit Count</p>
                            <p className="text-white">{selectedPatient.visitCount}</p>
                          </div>
                        </div>
                        
                        {selectedPatient.status === "Follow-Up" && selectedPatient.followUpDate && (
                          <div className="bg-yellow-500/10 p-3 rounded-md">
                            <p className="text-white/50 text-sm">Follow-Up Date</p>
                            <p className="text-yellow-300">{formatDate(selectedPatient.followUpDate)}</p>
                          </div>
                        )}
                        
                        {selectedPatient.diseaseDescription && (
                          <div>
                            <p className="text-white/50 text-sm">Description</p>
                            <p className="text-white">{selectedPatient.diseaseDescription}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {selectedPatient.doctorNotes && (
                      <div className="glass-card rounded-lg border border-neon-cyan/20 p-4">
                        <h3 className="text-lg font-semibold text-white mb-3">Doctor's Notes</h3>
                        <p className="text-white/90 bg-white/5 p-3 rounded border border-white/5">
                          {selectedPatient.doctorNotes}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                <DialogFooter className="mt-6 pt-4 border-t border-white/10">
                  <div className="text-white/50 text-sm mr-auto">
                    Patient ID: {selectedPatient.id}
                  </div>
                  <AnimatedButton 
                    variant="outline" 
                    onClick={() => setPatientDialogOpen(false)}
                  >
                    Close
                  </AnimatedButton>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Follow-Up Date Dialog */}
        <Dialog open={showFollowUpDialog} onOpenChange={setShowFollowUpDialog}>
          <DialogContent className="bg-[#071620] border border-white/10 sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-white">Set Follow-Up Date</DialogTitle>
              <DialogDescription className="text-white/70">
                Please select the next visit date for this patient.
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4 flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => setSelectedDate(date)}
                disabled={(date) => date < new Date()}
                className="bg-[#0C1824] border border-white/10 rounded-md p-2 pointer-events-auto"
              />
            </div>
            
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setShowFollowUpDialog(false)}
                className="border-white/20 text-white hover:bg-white/10"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleFollowUpConfirm}
                className="bg-gradient-to-r from-neon-cyan to-neon-magenta text-white"
              >
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
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
