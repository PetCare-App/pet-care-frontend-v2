import React, { useEffect, useState } from 'react';
import { usePetCareContext } from '../../context';

import {
	Card,
	CardContent,
	Typography,
	Container,
	Box,
	Stack,
	CircularProgress,
} from '@mui/material';
import { ControleParasitario } from '../../types/controleParasitario';
import { StartHere } from '../../components/startHere';
import { dateFormat } from '../../utils/dateFormat';
import SnackbarComponent from '../../components/snackbar/Snackbar';
import { FilterByPet } from '../../components/FilterByPet';
import { Pet } from '../../types/pets';

interface DashboardProps {
}

export const Dashboard = ({
}: DashboardProps) => {
	const { controleParasitarios, getControleParasitarios, user, snackbarOpen } =
		usePetCareContext();

	const [loading, setLoading] = useState(false);

	const fetchData = async () => {
		setLoading(true);
		await getControleParasitarios(user.patients.map((pet: Pet) => pet.id));
		setLoading(false);
	};

	const handleFilter = async (filter: number) => {
		setLoading(true);
		await getControleParasitarios(
			filter !== 0 ? [filter] : user.patients.map((pet: Pet) => pet.id)
		);
		setLoading(false);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<Box
				sx={{
					width: '100%',
					display: 'flex',
					justifyContent: 'space-between',
					padding: '40px 0px',
				}}
			>
				<FilterByPet handleFilter={handleFilter} />
			</Box>
			<Container
				sx={{
					display: 'flex',
					flexWrap: 'wrap',
					justifyContent: 'space-evenly',
					alignItems: 'center',
				}}
			>
				{!!controleParasitarios.length && !loading ? (
					controleParasitarios.map(
						(controleParasitario: ControleParasitario) => {
							const pet = user.patients.find(
								(pet: any) => pet.id === controleParasitario.patientId
							);
							return (
								<Card
									variant='outlined'
									key={controleParasitario?.id}
									sx={{
										height: '150px',
										width: '200px',
										marginBottom: '20px',
										padding: '10px',
									}}
								>
									<CardContent sx={{ padding: '10px' }}>
										<Stack
											direction='row'
											justifyContent='space-between'
											alignItems='center'
										>
											{pet && (
												<Typography
													sx={{ fontSize: 24, fontWeight: 600 }}
													color='text.secondary'
													variant='h3'
													gutterBottom
												>
													{pet?.name}
												</Typography>
											)}
										</Stack>
										<Stack
											direction='row'
											justifyContent='space-between'
											alignItems='center'
										>
											<Typography
												sx={{ fontSize: 16, fontWeight: 600 }}
												color='text.primary'
												variant='h3'
												gutterBottom
											>
												{controleParasitario?.controlType}
											</Typography>
										</Stack>
										<Stack
											direction='column'
											justifyContent='flex-end'
											alignItems='flex-start'
											height='35px'
										>
											<Typography
												sx={{ fontSize: 15 }}
												color='text.primary'
											>
												{`Data: ${dateFormat(controleParasitario.controlDate)}`}
											</Typography>
										</Stack>
									</CardContent>									
								</Card>
							);
						}
					)
				) : !controleParasitarios.length && !loading ? (
					<StartHere
						title={'Não existem registros de medicamentos!'}
					/>
				) : (
					<CircularProgress color='secondary' />
				)}
			</Container>
			{!!snackbarOpen.status && <SnackbarComponent />}
		</>
	);
};
