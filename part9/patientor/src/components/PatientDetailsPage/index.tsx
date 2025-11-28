import { useParams } from "react-router-dom";
import { Patient } from "../../types";

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
// I know transgender !== other, but I couldn't find an "other" logo
import TransgenderIcon from '@mui/icons-material/Transgender';

interface PatientDetailsPageProps {
  patients: Patient[];
}

const PatientDetailsPage = (props: PatientDetailsPageProps) => {
  const id = useParams().id;
  const patient = props.patients.find(p => p.id === id);

  // patient could be undefined
  if(!patient) return null;

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
    </div>
  );
};

export default PatientDetailsPage;