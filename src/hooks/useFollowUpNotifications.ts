
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Patient } from '@/lib/types';

export const useFollowUpNotifications = (userId: string | null) => {
  const [todayFollowUps, setTodayFollowUps] = useState<Patient[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const [hasShownNotification, setHasShownNotification] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const fetchTodayFollowUps = async () => {
      try {
        console.log('Fetching follow-up patients for user:', userId);
        
        const { data, error } = await supabase
          .from('patients')
          .select('*')
          .eq('doctor_id', userId)
          .eq('status', 'Follow-Up')
          .not('follow_up_date', 'is', null);

        if (error) throw error;

        console.log('All follow-up patients from DB:', data);

        // Get today's date in YYYY-MM-DD format
        const today = new Date();
        const todayString = today.getFullYear() + '-' + 
          String(today.getMonth() + 1).padStart(2, '0') + '-' + 
          String(today.getDate()).padStart(2, '0');
        
        console.log('Today\'s date string:', todayString);

        const todayPatients = (data || [])
          .map(item => ({
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
          }))
          .filter(patient => {
            if (!patient.followUpDate) return false;
            console.log(`Checking patient ${patient.name}: follow-up date = ${patient.followUpDate}, today = ${todayString}`);
            return patient.followUpDate === todayString;
          });

        console.log('Filtered today\'s follow-up patients:', todayPatients);
        setTodayFollowUps(todayPatients);

        // Show notification if there are follow-ups and we haven't shown it yet
        if (todayPatients.length > 0 && !hasShownNotification) {
          console.log('Showing notification for', todayPatients.length, 'patients');
          setShowNotification(true);
          setHasShownNotification(true);
          
          // Play notification sound
          try {
            const audio = new Audio('/lovable-uploads/notification-sound.mp3');
            audio.volume = 0.5;
            audio.play().catch(e => {
              console.log('Audio play failed, trying alternative sound:', e);
              // Fallback to a simple beep sound
              const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
              const oscillator = audioContext.createOscillator();
              const gainNode = audioContext.createGain();
              
              oscillator.connect(gainNode);
              gainNode.connect(audioContext.destination);
              
              oscillator.frequency.value = 800;
              oscillator.type = 'sine';
              
              gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
              gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
              
              oscillator.start(audioContext.currentTime);
              oscillator.stop(audioContext.currentTime + 0.5);
            });
          } catch (error) {
            console.log('Audio creation failed:', error);
          }
          
          // Auto-hide notification after 3 seconds
          setTimeout(() => {
            setShowNotification(false);
          }, 3000);
        }
      } catch (error) {
        console.error('Error fetching follow-up patients:', error);
      }
    };

    fetchTodayFollowUps();
  }, [userId, hasShownNotification]);

  const dismissNotification = () => {
    console.log('Dismissing notification');
    setShowNotification(false);
  };

  return {
    todayFollowUps,
    showNotification,
    dismissNotification,
    followUpCount: todayFollowUps.length
  };
};
