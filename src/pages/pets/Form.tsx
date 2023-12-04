import {
	Container,
	Box,
	IconButton,
	Avatar,
	Typography,
	useTheme,
	Stack,
	Alert,
	Snackbar,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { usePetCareContext } from '../../context';
import { Pet } from '../../types/pets';

import Paw from './../../assets/paw.png';
import Dog from './../../assets/dog.png';
import Cat from './../../assets/cat.png';
import { useState, useEffect } from 'react';
import Option from '@mui/joy/Option';
import { Select, Input, FormControl, FormLabel, Button } from '@mui/joy';

interface FormWrapperProps {
	theme: any;
}

const schema = yup.object().shape({
	name: yup.string().required('Campo nome é obrigatório'),
	animalType: yup.string(),
	breed: yup.string().required('Campo raça obrigatório'),
	gender: yup.string().required('Campo genero obrigatório'),
	weight: yup.number(),
	birthday: yup.string(),
});

interface FormProps {
	handleReturnButton: () => void;
	currentPet: Pet;
}

export const Form = ({
	handleReturnButton,
	currentPet,
}: FormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<Pet>({
		mode: 'onChange',
		resolver: yupResolver(schema),
	});
	const theme = useTheme();
	const { createPet, updatePet, errorMessage, setErrorMessage } =
		usePetCareContext();
	const [pet, setPet] = useState<Pet>(currentPet);

	const handleCloseSnackbar = () => {
		setErrorMessage(false);
	};

	const submitEdit = async (data: Pet) => {
		const response = await updatePet(data);
		if (response?.status === 200) {
			handleReturnButton();
		}
	};

	return (
		<>
			<Box
				sx={{
					width: '100%',
					display: 'flex',
					justifyContent: 'flex-start',
					padding: '40px 0px',
				}}
			>
				<IconButton onClick={handleReturnButton}>
					<ArrowBackIcon sx={{ fontSize: '30px' }} />
				</IconButton>
			</Box>
			<Container>
				<Container
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						flexWrap: 'wrap',
					}}
				>
					<Typography variant='h5'>
						Edite seu pet
					</Typography>
					<Avatar
						src={
							pet?.species == 'Cat'
								? Cat
								: pet?.species == 'Dog'
								? Dog
								: Paw
						}
						sx={{ height: '150px', width: '150px', paddingBottom: '16px' }}
					/>
					<Stack
						spacing={3}
						direction='column'
						flexWrap='wrap'
						sx={{
							justifyContent: 'center',
							marginBottom: '20px',
						}}
					>
						<FormControl>
							<FormLabel>Nome</FormLabel>
							<Input
								{...register('name')}
								onChange={(e) => setPet({ ...pet, name: e.target.value })}
								value={pet.name}
							/>
						</FormControl>
						<FormControl>
							<FormLabel>Espécie</FormLabel>
							<Select
								placeholder='Escolha a espécie do seu pet'
								value={pet.species}
								onChange={(_, newValue) =>
									setPet({ ...pet, species: newValue })
								}
								sx={{ width: '250px' }}
							>
								<Option value='cat'>Gato</Option>
								<Option value='dog'>Cachorro</Option>
							</Select>
						</FormControl>
						<FormControl>
							<FormLabel>Aniversário</FormLabel>
							<Input
								type='date'
								value={pet.dateOfBirth?.split('T')[0]}
								slotProps={{
									input: {
										min: '2018-06-07T00:00',
										max: '2018-06-14T00:00',
									},
								}}
								onChange={(e) => setPet({ ...pet, dateOfBirth: e.target.value })}
							/>
						</FormControl>
						<FormControl>
							<FormLabel>Peso</FormLabel>
							<Input
								{...register('weight')}
								endDecorator={'KG'}
								value={pet.weight}
								onChange={(e) => setPet({ ...pet, weight: e.target.value })}
							/>
						</FormControl>
						<FormControl>
							<FormLabel>Raça</FormLabel>
							<Input
								{...register('breed')}
								value={pet.breed}
								onChange={(e) => setPet({ ...pet, breed: e.target.value })}
							/>
						</FormControl>
						<FormControl>
							<FormLabel>Gênero</FormLabel>
							<Input
								{...register('sex')}
								value={pet.sex == 'male' ? 'Macho' : 'Fêmea'}
								onChange={(e) => setPet({ ...pet, sex: e.target.value })}
							/>
						</FormControl>
					</Stack>
					<Stack>
						<Button
							color='neutral'
							variant='soft'
							onClick={() => {
								submitEdit(pet);
							}}
							sx={{ width: '80px', marginBottom: '20px' }}
						>
							Salvar
						</Button>
					</Stack>
				</Container>
			</Container>
			{!!errorMessage && (
				<Snackbar
					anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
					open={!!errorMessage}
					autoHideDuration={3000}
					onClose={handleCloseSnackbar}
				>
					<Alert severity='error'>Error ao salvar pet!</Alert>
				</Snackbar>
			)}
		</>
	);
};
