import { z } from 'zod';
import { NewEntrySchema } from './utils';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn?: string;
  gender: Gender;
  occupation: string;
  entries: Entry[]
}

export type NonSensitivePatientEntry = Omit<Patient, 'ssn' | 'entries'>;
export type NewPatientEntry = z.infer<typeof NewEntrySchema>;