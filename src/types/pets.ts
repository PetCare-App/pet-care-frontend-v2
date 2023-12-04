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
