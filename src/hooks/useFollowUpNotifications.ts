
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Patient } from '@/lib/types';

export const useFollowUpNotifications = (userId?: string) => {
  const [followUpCount, setFollowUpCount] = useState(0);
  const [followUpPatients, setFollowUpPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const checkTodayFollowUps = async () => {
      try {
        setLoading(true);
        const today = new Date().toISOString().split('T')[0];

        const { data, error } = await supabase
          .from('patients')
          .select('*')
          .eq('follow_up_date', today);

        if (error) {
          console.error('Error fetching follow-up patients:', error);
          return;
        }

        const formattedPatients: Patient[] = data.map((p: any) => ({
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
          followUpDate: p.follow_up_date,
        }));

        setFollowUpPatients(formattedPatients);
        setFollowUpCount(formattedPatients.length);
        setShowNotification(formattedPatients.length > 0);
      } catch (error) {
        console.error('Error checking follow-ups:', error);
      } finally {
        setLoading(false);
      }
    };

    checkTodayFollowUps();
  }, [userId]);

  const dismissNotification = () => {
    setShowNotification(false);
  };

  return { 
    followUpCount, 
    followUpPatients, 
    loading, 
    showNotification, 
    dismissNotification 
  };
};
