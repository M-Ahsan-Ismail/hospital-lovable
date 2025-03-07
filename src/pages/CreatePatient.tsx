
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HexagonBackground from "@/components/HexagonBackground";
import AnimatedButton from "@/components/AnimatedButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Save, X, FileText } from "lucide-react";
import { savePatient } from "@/lib/patientStorage";
import { Patient } from "@/lib/types";

const CreatePatient = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "" as "" | "Male" | "Female" | "Other",
    cnic: "",
    phoneNumber: "",
    email: "",
    address: "",
    disease: "",
    diseaseDescription: "",
    status: "" as "" | "Active" | "Discharged" | "Follow-Up",
    doctorNotes: "",
    visitDate: new Date().toISOString().split('T')[0],
    previousVisits: 0,
  });
  const [submitting, setSubmitting] = useState(false);
  const [user, setUser] = useState<{full_name: string; role: string} | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
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
      
      // Redirect admins to dashboard
      if (userData.role === "Admin") {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      toast({
        title: "Error",
        description: "Failed to load user data",
        variant: "destructive",
      });
    }
  }, [navigate, toast]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    if (name === "gender") {
      setFormData((prev) => ({ 
        ...prev, 
        [name]: value as "Male" | "Female" | "Other" 
      }));
    } else if (name === "status") {
      setFormData((prev) => ({ 
        ...prev, 
        [name]: value as "Active" | "Discharged" | "Follow-Up" 
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/");
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.age || !formData.gender || !formData.cnic || !formData.phoneNumber || !formData.disease || !formData.status) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setSubmitting(true);
    
    try {
      // Save to localStorage - convert string values to appropriate types
      const patientData: Omit<Patient, "id"> = {
        ...formData,
        age: parseInt(formData.age),
        gender: formData.gender as "Male" | "Female" | "Other",
        status: formData.status as "Active" | "Discharged" | "Follow-Up",
        previousVisits: parseInt(formData.previousVisits.toString())
      };
      
      savePatient(patientData);
      
      toast({
        title: "Success",
        description: "Patient record created successfully",
      });
      
      // Reset form
      setFormData({
        name: "",
        age: "",
        gender: "" as "" | "Male" | "Female" | "Other",
        cnic: "",
        phoneNumber: "",
        email: "",
        address: "",
        disease: "",
        diseaseDescription: "",
        status: "" as "" | "Active" | "Discharged" | "Follow-Up",
        doctorNotes: "",
        visitDate: new Date().toISOString().split('T')[0],
        previousVisits: 0,
      });
    } catch (error) {
      console.error("Error saving patient:", error);
      toast({
        title: "Error",
        description: "Failed to save patient record",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };
  
  if (!user) {
    return null; // Prevent rendering while checking authentication
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <HexagonBackground />
      <Navbar isAuth userRole={user.role} onLogout={handleLogout} />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2 animate-fade-in">Create Patient Record</h1>
              <p className="text-white/70 animate-fade-in" style={{ animationDelay: "100ms" }}>
                Add a new patient to the system
              </p>
            </div>
            
            <div className="flex space-x-3">
              <AnimatedButton 
                variant="outline" 
                size="sm" 
                onClick={() => navigate("/patients")}
                className="hidden sm:flex"
              >
                <X size={16} className="mr-2" />
                Cancel
              </AnimatedButton>
            </div>
          </div>
          
          <div className="glass-card rounded-lg border border-white/10 p-6 lg:p-8">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="md:col-span-2">
                  <h2 className="text-xl font-medium mb-4 pb-2 border-b border-white/10 flex items-center">
                    <FileText size={18} className="mr-2 text-neon-cyan" />
                    Personal Information
                  </h2>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Full Name <span className="text-neon-magenta">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Patient's full name"
                    className="bg-white/5 border-white/10 focus:border-neon-cyan"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="age">
                    Age <span className="text-neon-magenta">*</span>
                  </Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Patient's age"
                    className="bg-white/5 border-white/10 focus:border-neon-cyan"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="gender">
                    Gender <span className="text-neon-magenta">*</span>
                  </Label>
                  <Select onValueChange={(value) => handleSelectChange("gender", value)} value={formData.gender}>
                    <SelectTrigger className="bg-white/5 border-white/10 focus:border-neon-cyan">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-secondary border-white/10">
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cnic">
                    CNIC <span className="text-neon-magenta">*</span>
                  </Label>
                  <Input
                    id="cnic"
                    name="cnic"
                    value={formData.cnic}
                    onChange={handleChange}
                    placeholder="e.g. 12345-6789012-3"
                    className="bg-white/5 border-white/10 focus:border-neon-cyan"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">
                    Phone Number <span className="text-neon-magenta">*</span>
                  </Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="e.g. +92-300-1234567"
                    className="bg-white/5 border-white/10 focus:border-neon-cyan"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email (Optional)</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="patient@example.com"
                    className="bg-white/5 border-white/10 focus:border-neon-cyan"
                  />
                </div>
                
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="address">Address (Optional)</Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Patient's full address"
                    className="bg-white/5 border-white/10 focus:border-neon-cyan min-h-[80px]"
                  />
                </div>
                
                {/* Medical Information */}
                <div className="md:col-span-2 mt-4">
                  <h2 className="text-xl font-medium mb-4 pb-2 border-b border-white/10 flex items-center">
                    <FileText size={18} className="mr-2 text-neon-cyan" />
                    Medical Information
                  </h2>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="disease">
                    Disease/Diagnosis <span className="text-neon-magenta">*</span>
                  </Label>
                  <Input
                    id="disease"
                    name="disease"
                    value={formData.disease}
                    onChange={handleChange}
                    placeholder="Primary diagnosis"
                    className="bg-white/5 border-white/10 focus:border-neon-cyan"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="status">
                    Status <span className="text-neon-magenta">*</span>
                  </Label>
                  <Select onValueChange={(value) => handleSelectChange("status", value)} value={formData.status}>
                    <SelectTrigger className="bg-white/5 border-white/10 focus:border-neon-cyan">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-secondary border-white/10">
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Follow-Up">Follow-Up</SelectItem>
                      <SelectItem value="Discharged">Discharged</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="visitDate">
                    Visit Date <span className="text-neon-magenta">*</span>
                  </Label>
                  <Input
                    id="visitDate"
                    name="visitDate"
                    type="date"
                    value={formData.visitDate}
                    onChange={handleChange}
                    className="bg-white/5 border-white/10 focus:border-neon-cyan"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="previousVisits">
                    Previous Visits
                  </Label>
                  <Input
                    id="previousVisits"
                    name="previousVisits"
                    type="number"
                    value={formData.previousVisits}
                    onChange={handleChange}
                    className="bg-white/5 border-white/10 focus:border-neon-cyan"
                  />
                </div>
                
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="diseaseDescription">Disease Description</Label>
                  <Textarea
                    id="diseaseDescription"
                    name="diseaseDescription"
                    value={formData.diseaseDescription}
                    onChange={handleChange}
                    placeholder="Detailed description of the patient's condition"
                    className="bg-white/5 border-white/10 focus:border-neon-cyan min-h-[120px]"
                  />
                </div>
                
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="doctorNotes">Doctor's Notes</Label>
                  <Textarea
                    id="doctorNotes"
                    name="doctorNotes"
                    value={formData.doctorNotes}
                    onChange={handleChange}
                    placeholder="Additional notes or observations"
                    className="bg-white/5 border-white/10 focus:border-neon-cyan min-h-[120px]"
                  />
                </div>
                
                <div className="md:col-span-2 pt-4 flex flex-col sm:flex-row justify-end gap-3">
                  <AnimatedButton 
                    variant="outline" 
                    type="button" 
                    className="sm:order-1 order-2"
                    onClick={() => navigate("/patients")}
                  >
                    Cancel
                  </AnimatedButton>
                  
                  <AnimatedButton 
                    type="submit" 
                    className="sm:order-2 order-1"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <div className="flex items-center">
                        <div className="h-4 w-4 border-2 border-dark border-t-transparent rounded-full animate-spin mr-2"></div>
                        <span>Saving...</span>
                      </div>
                    ) : (
                      <>
                        <Save size={16} className="mr-2" />
                        Save Patient Record
                      </>
                    )}
                  </AnimatedButton>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreatePatient;
