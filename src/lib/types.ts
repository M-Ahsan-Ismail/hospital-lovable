
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
  previousVisits: number;
  doctorNotes?: string;
  status: 'Active' | 'Discharged' | 'Follow-Up';
}
