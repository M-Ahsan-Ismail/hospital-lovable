
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';
import { isToday, parseISO, startOfWeek, isAfter } from 'date-fns';

const SUPABASE_URL = "https://rifbmpunygikolcdicwt.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpZmJtcHVueWdpa29sY2RpY3d0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEzMjgzNTUsImV4cCI6MjA1NjkwNDM1NX0.A5tNJNrT0P6OecJ553Ix4IhzbdUp0qn0HgW8HNsOWnU";

// Create Supabase client with persistent storage
export const supabase = createClient<Database>(
  SUPABASE_URL, 
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      persistSession: true,
      storageKey: 'hms-auth-storage-key',
      autoRefreshToken: true,
    }
  }
);

// Helper function to handle patient creation
export const createPatientRecord = async (patientData: any) => {
  try {
    const { data, error } = await supabase
      .from('patients')
      .insert(patientData)
      .select();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Error creating patient:', error);
    return { data: null, error };
  }
};

// Helper function to fetch patients
export const fetchPatients = async (filter?: string) => {
  try {
    let query = supabase
      .from('patients')
      .select('*');

    // Apply filters if specified
    if (filter === 'today') {
      const { data, error } = await query;
      
      if (error) throw error;
      
      // Filter in JavaScript for today's date
      const todayPatients = data.filter(patient => {
        try {
          return isToday(parseISO(patient.visit_date));
        } catch (e) {
          return false;
        }
      });
      
      return { data: todayPatients, error: null };
    }
    
    // No filter, return all with sorting
    const { data, error } = await query.order('created_at', { ascending: false });
      
    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Error fetching patients:', error);
    return { data: null, error };
  }
};

// Helper function to delete a patient
export const deletePatient = async (patientId: string) => {
  try {
    const { error } = await supabase
      .from('patients')
      .delete()
      .eq('id', patientId);
      
    if (error) throw error;
    return { success: true, error: null };
  } catch (error: any) {
    console.error('Error deleting patient:', error);
    return { success: false, error };
  }
};

// Helper function to update patient status and optionally follow-up date
export const updatePatientStatus = async (patientId: string, status: string, followUpDate?: string) => {
  try {
    const updateData: { status: string; follow_up_date?: string | null } = { status };
    
    // If status is Follow-Up and followUpDate is provided, add it to the update data
    if (status === "Follow-Up" && followUpDate) {
      updateData.follow_up_date = followUpDate;
    } else {
      // If status is not Follow-Up, set follow_up_date to null
      updateData.follow_up_date = null;
    }
    
    const { data, error } = await supabase
      .from('patients')
      .update(updateData)
      .eq('id', patientId)
      .select();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Error updating patient status:', error);
    return { data: null, error };
  }
};

// Helper function to update patient follow-up date only
export const updatePatientFollowUpDate = async (patientId: string, followUpDate: string) => {
  try {
    const { data, error } = await supabase
      .from('patients')
      .update({ follow_up_date: followUpDate })
      .eq('id', patientId)
      .select();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Error updating patient follow-up date:', error);
    return { data: null, error };
  }
};

// Helper function to get patient stats
export const getPatientStats = async () => {
  try {
    const { data, error } = await supabase
      .from('patients')
      .select('*');
      
    if (error) throw error;
    
    const today = new Date();
    const weekStart = startOfWeek(today);
    
    const stats = {
      totalPatients: data.length,
      activePatients: data.filter(p => p.status === 'Active').length,
      followUpPatients: data.filter(p => p.status === 'Follow-Up').length,
      dischargedPatients: data.filter(p => p.status === 'Discharged').length,
      totalVisits: data.reduce((sum, p) => sum + p.visit_count, 0),
      todayActiveCount: data.filter(p => {
        try {
          return isToday(parseISO(p.visit_date)) && p.status === 'Active';
        } catch (e) {
          return false;
        }
      }).length,
      newPatientsThisWeek: data.filter(p => {
        try {
          const createdDate = parseISO(p.created_at);
          return isAfter(createdDate, weekStart);
        } catch (e) {
          return false;
        }
      }).length,
    };
    
    return { stats, error: null };
  } catch (error: any) {
    console.error('Error getting patient stats:', error);
    return { stats: null, error };
  }
};
