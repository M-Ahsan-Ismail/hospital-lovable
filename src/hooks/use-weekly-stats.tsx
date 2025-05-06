
import { useEffect, useState } from "react";
import { startOfWeek, endOfWeek, isWithinInterval, parseISO } from "date-fns";
import { supabase } from "@/integrations/supabase/client";

interface WeeklyStats {
  patientCheckInPercentage: number;
  medicalRecordsPercentage: number;
  appointmentSchedulePercentage: number;
  isLoading: boolean;
  growthRate: number;
  recoveryRate: number;
  satisfaction: number;
}

export function useWeeklyStats() {
  const [stats, setStats] = useState<WeeklyStats>({
    patientCheckInPercentage: 0,
    medicalRecordsPercentage: 0,
    appointmentSchedulePercentage: 0,
    isLoading: true,
    growthRate: 0,
    recoveryRate: 94.2,
    satisfaction: 96.8
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const now = new Date();
        const weekStart = startOfWeek(now);
        const weekEnd = endOfWeek(now);

        // Fetch all patients
        const { data: patients, error } = await supabase
          .from('patients')
          .select('*');
        
        if (error) throw error;

        // Calculate patients created this week
        const patientsThisWeek = patients?.filter(patient => {
          try {
            const createdDate = parseISO(patient.created_at);
            return isWithinInterval(createdDate, { start: weekStart, end: weekEnd });
          } catch (e) {
            return false;
          }
        }) || [];

        // Calculate percentages (max 100%)
        // We'll use different thresholds for different metrics
        const checkInPercentage = Math.min(Math.round((patientsThisWeek.length / 100) * 100), 100);
        
        // For medical records, we'll use patients with disease_description
        const medicalRecordsCount = patients?.filter(p => p.disease_description)?.length || 0;
        const medicalRecordsPercentage = Math.min(Math.round((medicalRecordsCount / 100) * 100), 100);
        
        // For appointments, we'll use patients with follow_up_date
        const appointmentsCount = patients?.filter(p => p.follow_up_date)?.length || 0; 
        const appointmentPercentage = Math.min(Math.round((appointmentsCount / 100) * 100), 100);

        // Calculate growth rate compared to previous period (if we had historical data)
        // For now, we'll use a placeholder calculation based on total patients
        const growthRate = patients && patients.length > 0 
          ? +(((patientsThisWeek.length / patients.length) * 100).toFixed(1))
          : 0;

        setStats({
          patientCheckInPercentage: checkInPercentage,
          medicalRecordsPercentage: medicalRecordsPercentage,
          appointmentSchedulePercentage: appointmentPercentage,
          isLoading: false,
          growthRate: growthRate,
          recoveryRate: 94.2, // Could be calculated from real data in the future
          satisfaction: 96.8   // Could be calculated from real data in the future
        });
      } catch (error) {
        console.error("Error fetching weekly stats:", error);
        setStats(prev => ({ ...prev, isLoading: false }));
      }
    }

    fetchData();
  }, []);

  return stats;
}
