import express from 'express';
import { Response } from 'express';
import diagnosesService from '../services/diagnosesService';
import { Diagnose } from "../types";

const router = express.Router();

router.get('/', (_req, res: Response<Diagnose[]>) => {
  res.send(diagnosesService.getEntries());
});

export default router;