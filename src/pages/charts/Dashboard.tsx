import React, { useEffect, useState } from 'react';
import { usePetCareContext } from '../../context';

import {
	Card,
	CardContent,
	Typography,
	CardActions,
	Container,
	Box,
	IconButton,
	Stack,
	CircularProgress,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Vaccine } from '../../types/vaccines';
import { Pet } from '../../types/pets';
import { StartHere } from '../../components/startHere';
import SnackbarComponent from '../../components/snackbar/Snackbar';
import { dateFormat } from '../../utils/dateFormat';
import { FilterByPet } from '../../components/FilterByPet';
import { Charts } from '../../types/charts';

interface DashboardProps {

}

export const Dashboard = ({
}: DashboardProps) => {
	const {getCharts, user, charts, snackbarOpen, getPetById } =
		usePetCareContext();

	const [loading, setLoading] = useState(false);

	const fetchData = async () => {
		setLoading(true);
		await getCharts(user.patients.map((pet: Pet) => pet.id));
		setLoading(false);
	};

	const handleFilter = async (filter: number) => {
		setLoading(true);
		await getCharts(filter !== 0 ? [filter] : user.patients.map((pet: Pet) => pet.id));
		setLoading(false);
	};

	useEffect(() => {
		fetchData();
	}, []);

	console.log('charts', charts);

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
				{!!charts.length && !loading ? (
					charts.map((chart: Charts) => {
						const pet = user.patients.find((pet: any) => pet.id === chart.patientId);
						return (
							<Card
								variant='outlined'
								key={chart?.id}
								sx={{
									height: '200px',
									width: '200px',
									// marginBottom: '20px',
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
												sx={{ fontSize: 16, fontWeight: 600 }}
												color='text.secondary'
												variant='h3'
												gutterBottom
											>
												{`Data da consulta: ${chart.consultationDate ? dateFormat(chart?.consultationDate) : '-'}`}
											</Typography>
										)}
									</Stack>
									<Stack
										direction='column'
										justifyContent='flex-end'
										alignItems='flex-start'
										height='35px'
										mt='60px'
										
									>
										<Typography
											sx={{ fontSize: 15}}
											color='text.primary'
											variant='h3'
											gutterBottom
										>
											{`Diagnóstico: ${chart?.diagnosis ? chart?.diagnosis : '-'}`}
										</Typography>
										<Typography
											sx={{ fontSize: 15 }}
											color='text.primary'
										>
											{`Prescrição: ${chart?.prescription ? chart?.prescription : '-'}`}
										</Typography>
										<Typography
											sx={{ fontSize: 15 }}
											color='text.primary'
										>
											{`Tratamento: ${chart?.treatment ? chart?.treatment : '-'}`}
										</Typography>
										<Typography
											sx={{ fontSize: 15 }}
											color='text.primary'
										>
											{`Notas: ${chart?.notes ? chart?.notes : '-'}`}
										</Typography>
									</Stack>
								</CardContent>
							</Card>
						);
					})
				) : !charts.length && !loading ? (
					<StartHere title={'Não existem registros de prontuário.'} />
				) : (
					<CircularProgress color='secondary' />
				)}
			</Container>
			{!!snackbarOpen.status && <SnackbarComponent />}
		</>
	);
};
