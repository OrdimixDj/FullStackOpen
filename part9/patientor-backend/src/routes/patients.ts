import express from 'express';
import { Response } from 'express';
import patientsService from '../services/patientsService';
import { Patient } from "../types";
import { toNewPatientEntry } from '../utils';


const router = express.Router();

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedEntry = patientsService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});


router.get('/', (_req, res: Response<Patient[]>) => {
  res.send(patientsService.getNonSensitiveEntries());
});


export default router;