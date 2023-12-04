import { api } from './api';

export const createPetService = async (petData: any) => {
	return await api.post('/pets/', { ...petData });
};

export const updatePetService = async (petData: any) => {
	return await api.patch(`/patients/${petData.id}`, { ...petData });
};

export const deletePetService = async (id: any) => {
	return await api.delete(`/patients/${id}`);
};

export const getPetsService = async (userId: number) => {
	return await api.get(`/owners/${userId}`);
};

export const getPetByIdService = async (userId: number) => {
	return await api.get(`/patients/${userId}`);
};

export const getPetPdfService = async (petId: string) => {
	return await api.get(`/pets/${petId}/pdf`, {
		headers: {
			'Content-Type': 'application/pdf',
		},
		responseType: 'blob',
	});
};
