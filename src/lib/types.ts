
export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  email?: string;
  address?: string;
  disease: string;
  diseaseDescription?: string;
  visitDate: string;
  visitCount: number;
  doctorNotes?: string;
  status: 'Active' | 'Discharged' | 'Follow-Up';
  doctorId?: string;
  createdAt?: string;
  followUpDate?: string; // Follow-up date field
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: 'doctor' | 'admin';
}
