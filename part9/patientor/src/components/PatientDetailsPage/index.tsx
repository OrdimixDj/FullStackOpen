import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Patient, Diagnosis, Entry } from "../../types";
import { Box } from '@mui/material';
import { Work, LocalHospital, Favorite } from '@mui/icons-material';

import patientService from "../../services/patients";

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
// I know transgender !== other, but I couldn't find an "other" logo
import TransgenderIcon from '@mui/icons-material/Transgender';

interface PatientDetailsPageProps {
  diagnoses: Diagnosis[];
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry, diagnoses: Diagnosis[] }> = ({entry, diagnoses}) => {
  switch (entry.type) {
    case "Hospital":
      return (
        <div>
          {entry.date} <LocalHospital/><br/>
          <em>{entry.description}</em><br/>
          <ul>
              {entry.diagnosisCodes ? entry.diagnosisCodes.map((diagnosisCode: string) => {
                const diagnoseDescription = diagnoses.find(d => d.code === diagnosisCode);

                return (
                  <li key={diagnosisCode}>{diagnosisCode} {diagnoseDescription ? diagnoseDescription.name : ""}</li>
                );
              }) : null}
          </ul>
          discharge on the {entry.discharge.date}: {entry.discharge.criteria}<br/>
          diagnose by {entry.specialist}
        </div>
      );
    case "HealthCheck":
      let heartColor;

      switch (entry.healthCheckRating) {
        case 1:
          heartColor="yellow";
          break;
        case 2:
          heartColor="orange";
          break;
        case 3:
          heartColor="red";
          break;
        default:
          heartColor="green";
      }
      return (
        <div>
          {entry.date} <LocalHospital/><br/>
          <em>{entry.description}</em><br/>
          <Favorite sx={{color:heartColor}}/><br/>
          diagnose by {entry.specialist}
        </div>
      );
    case "OccupationalHealthcare":
      return (
        <div>
          {entry.date} <Work/> <em>{entry.employerName}</em><br/>
          <em>{entry.description}</em><br/>
          diagnose by {entry.specialist}
        </div>
      );
    default:
      return assertNever(entry);
  }
};

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
        <Box key={entry.id} sx={{border: '1px solid black'}}>
            <EntryDetails diagnoses={diagnoses} entry={entry}/>
        </Box>
      )) : "There is no entry"}
    </div>
  );
};

export default PatientDetailsPage;