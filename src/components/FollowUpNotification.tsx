
import React, { useState } from 'react';
import { Bell, Calendar, User, Stethoscope, X } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Patient } from '@/lib/types';

interface FollowUpNotificationProps {
  count: number;
  patients: Patient[];
}

const FollowUpNotification: React.FC<FollowUpNotificationProps> = ({ 
  count, 
  patients 
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (count === 0) return null;

  return (
    <>
      <div 
        onClick={() => setIsModalOpen(true)}
        className="fixed top-24 right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 animate-pulse z-50"
      >
        <div className="flex items-center space-x-2">
          <Bell size={20} className="animate-bounce" />
          <span className="font-semibold">
            {count} patient{count > 1 ? 's' : ''} have follow-up today
          </span>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-[#040D12] border border-white/20">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-neon-cyan flex items-center">
              <Calendar size={24} className="mr-2" />
              Today's Follow-Up Patients ({count})
            </DialogTitle>
            <DialogDescription className="text-white/70">
              Patients scheduled for follow-up today
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            {patients.map((patient) => (
              <div 
                key={patient.id} 
                className="glass-card p-4 border border-white/10 rounded-lg hover:border-neon-cyan/30 transition-all"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <User size={16} className="text-neon-cyan" />
                      <h3 className="font-semibold text-white">{patient.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {patient.gender}, {patient.age}y
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-1">
                      <Stethoscope size={14} className="text-neon-magenta" />
                      <span className="text-sm text-white/80">{patient.disease}</span>
                    </div>
                    
                    {patient.diseaseDescription && (
                      <p className="text-xs text-white/60 ml-6">
                        {patient.diseaseDescription}
                      </p>
                    )}
                    
                    {patient.doctorNotes && (
                      <p className="text-xs text-white/60 ml-6 mt-1">
                        <strong>Notes:</strong> {patient.doctorNotes}
                      </p>
                    )}
                  </div>
                  
                  <div className="text-right">
                    <Badge 
                      className={`
                        ${patient.status === 'Active' ? 'bg-green-500/20 text-green-400' : ''}
                        ${patient.status === 'Follow-Up' ? 'bg-yellow-500/20 text-yellow-400' : ''}
                        ${patient.status === 'Discharged' ? 'bg-blue-500/20 text-blue-400' : ''}
                      `}
                    >
                      {patient.status}
                    </Badge>
                    <p className="text-xs text-white/60 mt-1">
                      Visit #{patient.visitCount}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FollowUpNotification;
