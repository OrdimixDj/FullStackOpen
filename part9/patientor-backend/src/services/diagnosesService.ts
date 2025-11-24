import diagnose from '../../data/diagnoses';
import { Diagnose } from "../types";

const getEntries = (): Diagnose[] => {
  return diagnose;
};

export default {
  getEntries
};