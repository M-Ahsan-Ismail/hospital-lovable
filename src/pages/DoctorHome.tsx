
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import HexagonBackground from "@/components/HexagonBackground";
import { FileText, UserPlus } from "lucide-react";

const DoctorHome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#040D12] text-white font-orbit">
      <HexagonBackground />
      <Navbar isAuth={true} />
      
      <main className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
          Doctor Dashboard
        </h1>
        <p className="text-lg text-white/80 text-center max-w-2xl mx-auto mb-12">
          Manage your patients and medical records efficiently with our Hospital Management System.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-[#0C1824] border border-[#213345] p-6 rounded-lg hover:shadow-lg hover:border-neon-cyan transition-all">
            <UserPlus className="w-12 h-12 mb-4 text-neon-cyan" />
            <h2 className="text-2xl font-bold mb-3">Create New Patient</h2>
            <p className="text-white/70 mb-6">
              Add new patients to your records and begin tracking their medical history.
            </p>
            <Button 
              className="w-full bg-gradient-to-r from-neon-cyan to-neon-blue text-black"
              onClick={() => navigate('/create-patient')}
            >
              Create Patient
            </Button>
          </div>
          
          <div className="bg-[#0C1824] border border-[#213345] p-6 rounded-lg hover:shadow-lg hover:border-neon-cyan transition-all">
            <FileText className="w-12 h-12 mb-4 text-neon-cyan" />
            <h2 className="text-2xl font-bold mb-3">Patient History</h2>
            <p className="text-white/70 mb-6">
              View and manage records of all patients under your care.
            </p>
            <Button 
              className="w-full bg-gradient-to-r from-neon-cyan to-neon-blue text-black"
              onClick={() => navigate('/patients')}
            >
              View Patients
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorHome;
