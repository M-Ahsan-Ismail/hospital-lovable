
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { FileText, User, Calendar as CalendarIcon, Trash2, Check } from "lucide-react";
import { Patient } from "@/lib/types";
import { updatePatientStatus, deletePatient } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format, addDays } from "date-fns";

interface PatientCardProps {
  patient: Patient;
  className?: string;
  onStatusChange?: (patientId: string, newStatus: string, followUpDate?: string) => void;
  onDeletePatient?: (patientId: string) => void;
  selected?: boolean;
  onSelect?: (patientId: string) => void;
  userRole?: string;
}

const PatientCard: React.FC<PatientCardProps> = ({ 
  patient, 
  className,
  onStatusChange,
  onDeletePatient,
  selected = false,
  onSelect,
  userRole = 'doctor'
}) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [showFollowUpDialog, setShowFollowUpDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    patient.followUpDate ? new Date(patient.followUpDate) : addDays(new Date(), 7)
  );
  const { toast } = useToast();
  
  // Format date from YYYY-MM-DD to readable format
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleStatusChange = async (newStatus: string) => {
    if (patient.status === newStatus) return;
    
    // If changing to follow-up, show the follow-up date dialog
    if (newStatus === "Follow-Up") {
      setShowFollowUpDialog(true);
      return;
    }
    
    await updatePatientStatusInternal(newStatus);
  };
  
  const updatePatientStatusInternal = async (newStatus: string, followUpDate?: string) => {
    setIsUpdating(true);
    try {
      const { data, error } = await updatePatientStatus(patient.id, newStatus, followUpDate);
      
      if (error) throw error;
      
      toast({
        title: "Status Updated",
        description: `Patient status changed to ${newStatus}`,
      });
      
      if (onStatusChange) {
        onStatusChange(patient.id, newStatus, followUpDate);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update status",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };
  
  const handleFollowUpConfirm = async () => {
    if (!selectedDate) return;
    
    const formattedDate = format(selectedDate, "yyyy-MM-dd");
    await updatePatientStatusInternal("Follow-Up", formattedDate);
    setShowFollowUpDialog(false);
  };
  
  const handleDelete = async () => {
    try {
      const { success, error } = await deletePatient(patient.id);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Patient deleted successfully",
      });
      
      if (onDeletePatient) {
        onDeletePatient(patient.id);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete patient",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div
      className={cn(
        "glass-card rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] group border-2",
        selected ? "border-neon-cyan" : "border-transparent",
        className
      )}
      onClick={() => onSelect && onSelect(patient.id)}
    >
      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium text-white group-hover:text-neon-cyan transition-colors duration-300">
            {patient.name}
          </h3>
          
          <Popover>
            <PopoverTrigger asChild>
              <div className={cn(
                "px-2 py-1 text-xs rounded-full cursor-pointer",
                isUpdating && "opacity-50",
                patient.status === "Active" && "bg-green-500/20 text-green-400",
                patient.status === "Discharged" && "bg-blue-500/20 text-blue-400",
                patient.status === "Follow-Up" && "bg-yellow-500/20 text-yellow-400"
              )}>
                {isUpdating ? "Updating..." : patient.status}
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-40 p-0 bg-[#0C1824] border border-white/10">
              <div className="py-1">
                <button
                  className="flex items-center w-full px-3 py-2 text-sm text-white/80 hover:bg-white/5"
                  onClick={() => handleStatusChange("Active")}
                >
                  <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
                  Active
                  {patient.status === "Active" && <Check size={14} className="ml-auto" />}
                </button>
                <button
                  className="flex items-center w-full px-3 py-2 text-sm text-white/80 hover:bg-white/5"
                  onClick={() => handleStatusChange("Follow-Up")}
                >
                  <div className="w-2 h-2 rounded-full bg-yellow-400 mr-2"></div>
                  Follow-Up
                  {patient.status === "Follow-Up" && <Check size={14} className="ml-auto" />}
                </button>
                <button
                  className="flex items-center w-full px-3 py-2 text-sm text-white/80 hover:bg-white/5"
                  onClick={() => handleStatusChange("Discharged")}
                >
                  <div className="w-2 h-2 rounded-full bg-blue-400 mr-2"></div>
                  Discharged
                  {patient.status === "Discharged" && <Check size={14} className="ml-auto" />}
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-white/70">
            <User size={16} className="mr-2 text-neon-cyan" />
            <span className="text-sm">
              Age: {patient.age} | Gender: {patient.gender}
            </span>
          </div>
          
          <div className="flex items-center text-white/70">
            <FileText size={16} className="mr-2 text-neon-cyan" />
            <span className="text-sm">
              {patient.disease}
            </span>
          </div>
          
          {patient.email && (
            <div className="flex items-center text-white/70">
              <span className="mr-2 text-neon-cyan">@</span>
              <span className="text-sm">
                {patient.email}
              </span>
            </div>
          )}
          
          <div className="flex items-center text-white/70">
            <CalendarIcon size={16} className="mr-2 text-neon-cyan" />
            <span className="text-sm">
              Last Visit: {formatDate(patient.visitDate)}
            </span>
          </div>

          {patient.status === "Follow-Up" && patient.followUpDate && (
            <div className="flex items-center text-white/70 bg-yellow-500/10 px-3 py-2 rounded-md">
              <CalendarIcon size={16} className="mr-2 text-yellow-400" />
              <span className="text-sm text-yellow-300">
                Follow-Up Date: {formatDate(patient.followUpDate)}
              </span>
            </div>
          )}
        </div>
        
        {patient.diseaseDescription && (
          <div className="mt-4 p-3 bg-white/5 rounded border-l-2 border-neon-cyan text-sm text-white/80">
            <p>{patient.diseaseDescription}</p>
          </div>
        )}
      </div>
      
      <div className="p-4 bg-white/5 border-t border-white/10 flex justify-between">
        <span className="text-xs text-white/50">
          Previous Visits: {patient.visitCount || 1}
        </span>
      </div>

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
              disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
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
    </div>
  );
};

export default PatientCard;
