
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://rifbmpunygikolcdicwt.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpZmJtcHVueWdpa29sY2RpY3d0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEzMjgzNTUsImV4cCI6MjA1NjkwNDM1NX0.A5tNJNrT0P6OecJ553Ix4IhzbdUp0qn0HgW8HNsOWnU";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

// Add this helper function to handle patient creation without security issues
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

// Helper function to fetch patients with no security constraints
export const fetchPatients = async () => {
  try {
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Error fetching patients:', error);
    return { data: null, error };
  }
};
