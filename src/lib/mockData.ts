
import { Patient, User } from './types';

// Mock patients data for demo
export const mockPatients: Patient[] = [
  {
    id: "1",
    name: "John Smith",
    age: 45,
    gender: "Male",
    email: "john.smith@example.com",
    address: "123 Main St, New York",
    disease: "Hypertension",
    diseaseDescription: "Stage 1 hypertension with occasional headaches",
    visitDate: "2023-05-15",
    visitCount: 3,
    doctorNotes: "Patient needs to monitor blood pressure daily and reduce salt intake.",
    status: "Active",
    doctorId: "d1",
    createdAt: "2023-01-15T08:30:00Z",
    followUpDate: "2023-06-15"
  },
  {
    id: "2",
    name: "Emily Johnson",
    age: 32,
    gender: "Female",
    email: "emily.johnson@example.com",
    address: "456 Park Ave, Boston",
    disease: "Migraine",
    diseaseDescription: "Chronic migraine with visual aura",
    visitDate: "2023-05-10",
    visitCount: 2,
    doctorNotes: "Prescribed sumatriptan for acute attacks. Avoid triggers like bright lights and stress.",
    status: "Follow-Up",
    doctorId: "d1",
    createdAt: "2023-02-20T10:15:00Z",
    followUpDate: "2023-06-10"
  },
  {
    id: "3",
    name: "Michael Brown",
    age: 58,
    gender: "Male",
    email: "michael.brown@example.com",
    address: "789 Oak Dr, Chicago",
    disease: "Type 2 Diabetes",
    diseaseDescription: "Uncontrolled diabetes with occasional hypoglycemic episodes",
    visitDate: "2023-05-05",
    visitCount: 5,
    doctorNotes: "Adjusted insulin dosage. Continue with diet and exercise regimen.",
    status: "Active",
    doctorId: "d2",
    createdAt: "2022-11-05T14:20:00Z"
  },
  {
    id: "4",
    name: "Sarah Davis",
    age: 29,
    gender: "Female",
    email: "sarah.davis@example.com",
    address: "321 Elm St, San Francisco",
    disease: "Asthma",
    diseaseDescription: "Moderate persistent asthma with occasional exacerbations",
    visitDate: "2023-05-20",
    visitCount: 4,
    doctorNotes: "Continue with maintenance inhaler. Use rescue inhaler as needed for acute symptoms.",
    status: "Discharged",
    doctorId: "d2",
    createdAt: "2023-03-10T09:45:00Z"
  },
  {
    id: "5",
    name: "David Wilson",
    age: 67,
    gender: "Male",
    email: "david.wilson@example.com",
    address: "654 Pine St, Seattle",
    disease: "Osteoarthritis",
    diseaseDescription: "Moderate osteoarthritis affecting both knees",
    visitDate: "2023-04-28",
    visitCount: 2,
    doctorNotes: "Recommended physical therapy. OTC pain relievers for acute pain.",
    status: "Follow-Up",
    doctorId: "d1",
    createdAt: "2023-04-01T11:30:00Z",
    followUpDate: "2023-05-28"
  },
  {
    id: "6",
    name: "Jennifer Miller",
    age: 41,
    gender: "Female",
    email: "jennifer.miller@example.com",
    address: "987 Maple Ave, Denver",
    disease: "Hypothyroidism",
    diseaseDescription: "Subclinical hypothyroidism with mild symptoms",
    visitDate: "2023-05-02",
    visitCount: 1,
    doctorNotes: "Started on levothyroxine. Follow up in 6 weeks for thyroid function tests.",
    status: "Active",
    doctorId: "d3",
    createdAt: "2023-05-02T13:00:00Z"
  }
];

// Mock doctors data
export const mockUsers: User[] = [
  {
    id: "d1",
    fullName: "Dr. Robert Chen",
    email: "robert.chen@hospital.com",
    role: "doctor"
  },
  {
    id: "d2",
    fullName: "Dr. Lisa Wang",
    email: "lisa.wang@hospital.com",
    role: "doctor"
  },
  {
    id: "d3",
    fullName: "Dr. James Peterson",
    email: "james.peterson@hospital.com",
    role: "doctor"
  },
  {
    id: "a1",
    fullName: "Admin User",
    email: "admin@hospital.com",
    role: "admin"
  }
];
