import { v1 as uuid } from "uuid";
import patientsData from '../../data/patients';
import { Patient, NonSensitivePatientEntry, NewPatientEntry, NewEntry, Entry } from "../types";

const getEntries = (): Patient[] => {
  return patientsData;
};

const findById = (id: string): Patient | undefined => {
  const entry = patientsData.find(p => p.id === id);
  return entry;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patientsData.map(({ id, name, dateOfBirth, ssn, gender, occupation }) => ({
  id,
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation
  }));
};

const addPatient = ( entry: NewPatientEntry ): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
    entries: [] as Entry[]
  };

  patientsData.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = ( entry: NewEntry, id: string ): Entry => {
  const patient = patientsData.find(p => p.id === id);

  if (!patient) {
    throw new Error("Patient not found");
  }

  const newEntry: Entry = {
    id: uuid(),
    ...entry
  };

  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  addEntry,
  findById
};