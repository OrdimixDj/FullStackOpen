import { v1 as uuid } from "uuid";
import patientsData from '../../data/patients';
import { Patient, NonSensitivePatientEntry, NewPatientEntry, Entry } from "../types";

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

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  findById
};