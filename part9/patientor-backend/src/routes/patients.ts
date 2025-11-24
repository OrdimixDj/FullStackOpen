import express from 'express';
import { Response } from 'express';
import patientsService from '../services/patientsService';
import { Patient } from "../types";

const router = express.Router();

router.get('/', (_req, res: Response<Patient[]>) => {
  res.send(patientsService.getNonSensitiveEntries());
});

export default router;