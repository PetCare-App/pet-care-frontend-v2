export interface Pet {
  id: string;
  name: string;
  breed: string;
  species: string | null;
  dateOfBirth: string;
  sex: string;
  weight?: number | string;
  birthDate: string;
  allergies: string;
  medications: string;
  emergencyContact: string;
  photoUrl: string;
  currentStatus: string;
  additionalNotes: string;
  ownerId: number;
}

export const petInit = {
  id: 1,
  name: '',
  species: '',
  breed: '',
  dateOfBirth: '',
  sex: '',
  color: '',
  weight: '',
  allergies: '',
  medications: '',
  emergencyContact: '',
  photoUrl: '',
  currentStatus: 'n/a',
  additionalNotes: '',
  ownerId: 1,
  owner: {},
  parasiteControl: [],
  vaccines: [],
  patientMedicalRecord: [],
};
