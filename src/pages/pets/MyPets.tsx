import React, { useEffect, useState } from 'react';
import { usePetCareContext } from '../../context';

import {
	Button,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Dashboard } from './Dashboard';
import { Form } from './Form';
import { Pet } from '../../types/pets';

export const MyPets = () => {
	const navigate = useNavigate();
	const { getPets, getUser, deletePet, getPetPdf } = usePetCareContext();

	const [isFormOpen, setOpenForm] = useState(false);
	const [isDeleteConfirmation, setDeleteConfirmation] = useState(false);

	const [pet, setPet] = useState({} as Pet);

	useEffect(() => {
		!!isFormOpen 
			? navigate('/pets/edit')
			: navigate('/pets/dashboard');
	}, [isFormOpen]);

	const handleOpenEditForm = (pet: Pet) => {
		setOpenForm(true);
		setPet(pet);
	};

	const handleOpenDeleteConfirmation = (pet: Pet) => {
		setDeleteConfirmation(true);
		setPet(pet);
	};

	const handleReturnButton = () => {
		setPet({} as Pet);
		setOpenForm(false);
	};

	const handleDeletePetButton = async (id: string) => {
		await deletePet(id);
		setDeleteConfirmation(false);
		setPet({} as Pet);
		getUser();
	};

	return (
		<Container sx={{ display: 'flex', flexDirection: 'column' }}>
			{!isFormOpen ? (
				<Dashboard
					handleOpenEditForm={handleOpenEditForm}
					handleOpenDeleteConfirmation={handleOpenDeleteConfirmation}
				/>
			) : (
				<Form
					handleReturnButton={handleReturnButton}
					currentPet={pet}
				></Form>
			)}

			{!!isDeleteConfirmation && (
				<Dialog
					open={isDeleteConfirmation}
					onClose={() => setDeleteConfirmation(false)}
				>
					<DialogTitle>Deletar pet</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Você confirma que gostaria de deletar o pet?
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={() => setDeleteConfirmation(false)}>
							Cancelar
						</Button>
						<Button onClick={() => handleDeletePetButton(pet.id)}>
							Deletar
						</Button>
					</DialogActions>
				</Dialog>
			)}
		</Container>
	);
};
