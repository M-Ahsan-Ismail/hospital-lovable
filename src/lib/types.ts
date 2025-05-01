
export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  cnic: string;
  phoneNumber: string;
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
  followUpDate?: string; // New field for follow-up date
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: 'doctor' | 'admin';
}
