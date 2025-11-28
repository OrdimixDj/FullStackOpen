import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Patient, Diagnosis, Entry } from "../../types";

import patientService from "../../services/patients";

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
// I know transgender !== other, but I couldn't find an "other" logo
import TransgenderIcon from '@mui/icons-material/Transgender';

interface PatientDetailsPageProps {
  diagnoses: Diagnosis[];
}

const PatientDetailsPage = ({diagnoses} : PatientDetailsPageProps) => {
  const [patient, setPatient] = useState<Patient>();

  const id = useParams().id;

  useEffect(() => {
    // id could be undefined
    if(id) {
      const fetchPatientList = async () => {
        const newPatient = await patientService.getById(id);
        setPatient(newPatient);
      };
      void fetchPatientList();
    }
  });

  // patient could be undefined
  if(!diagnoses || !patient) return null;

  const genderIcon = () => {
    switch (patient.gender) {
      case 'male':
        return <MaleIcon />;
      case 'female':
        return <FemaleIcon />;
      case 'other':
        return <TransgenderIcon />;
      default:
        return null;
    }
  };

  return (
    <div>
      <h2>{patient.name} {genderIcon()}</h2>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>

      <h3>entries</h3>

      {patient.entries.length > 0 ? patient.entries.map((entry: Entry) => (
          <div key={entry.id}>
            {entry.date} <em>{entry.description}</em>
            <ul>
              {entry.diagnosisCodes ? entry.diagnosisCodes.map((diagnosisCode: string) => {
                const diagnoseDescription = diagnoses.find(d => d.code === diagnosisCode);

                return (
                  <li key={diagnosisCode}>{diagnosisCode} {diagnoseDescription ? diagnoseDescription.name : ""}</li>
                );
              }) : null}
            </ul>
          </div>
      )) : "There is no entry"}
    </div>
  );
};

export default PatientDetailsPage;