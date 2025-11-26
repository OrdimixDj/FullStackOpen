import { v1 as uuid } from "uuid";
import patientsData from '../../data/patients';
import { Patient, NonSensitivePatientEntry, NewPatientEntry } from "../types";

const getEntries = (): Patient[] => {
  return patientsData;
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
    ...entry
  };

  patientsData.push(newPatientEntry);
  return newPatientEntry;
};



export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient
};