export interface User {
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
  dateOfBirth?: string;
  gender: string;
  maritalStatus: string;
  occupation: string;
  photoUrl?: string | null;
  preferredPaymentMethod?: string;
  petInsuranceDetails?: string;
  additionalNotes?: string;
  registrationDate: string | Date;
  password?: string;
}
