
import { Patient } from "./types";

// Generate a unique ID for patients
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 11);
};

// Save patient to localStorage
export const savePatient = (patient: Omit<Patient, "id">): Patient => {
  const newPatient: Patient = {
    ...patient,
    id: generateId()
  };
  
  const patients = getPatients();
  patients.push(newPatient);
  localStorage.setItem("patients", JSON.stringify(patients));
  
  return newPatient;
};

// Get all patients from localStorage
export const getPatients = (): Patient[] => {
  const patients = localStorage.getItem("patients");
  return patients ? JSON.parse(patients) : [];
};

// Get patient stats
export const getPatientStats = (patientList?: Patient[]) => {
  const patients = patientList || getPatients();
  
  const activePatients = patients.filter(p => p.status === "Active").length;
  const followUpPatients = patients.filter(p => p.status === "Follow-Up").length;
  const dischargedPatients = patients.filter(p => p.status === "Discharged").length;
  const totalVisits = patients.reduce((sum, patient) => sum + (patient.previousVisits || 0) + 1, 0);
  
  return {
    totalPatients: patients.length,
    activePatients,
    followUpPatients,
    dischargedPatients,
    totalVisits
  };
};
