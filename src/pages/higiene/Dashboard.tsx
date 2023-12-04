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
import { Higiene } from '../../types/higiene';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { StartHere } from '../../components/startHere';
import SnackbarComponent from '../../components/snackbar/Snackbar';
import { dateFormat } from '../../utils/dateFormat';
import { Pet } from '../../types/pets';
import { FilterByPet } from '../../components/FilterByPet';

interface DashboardProps {
}

export const Dashboard = ({
}: DashboardProps) => {
	const { higienes, getHigienes, user, snackbarOpen } = usePetCareContext();

	const [loading, setLoading] = useState(false);

	const fetchData = async () => {
		setLoading(true);
		await getHigienes(user.patients.map((pet: Pet) => pet.id));
		setLoading(false);
	};

	const handleFilter = async (filter: number) => {
		setLoading(true);
		await getHigienes(filter !== 0 ? [filter] : user.patients.map((pet: Pet) => pet.id));
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
				{!!higienes.length && !loading ? (
					higienes.map((higiene: Higiene) => {
						const pet = user.patients.find((pet: any) => pet.id === higiene.patientId);
						return (
							<Card
								variant='outlined'
								key={higiene?.id}
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
											{higiene?.notes}
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
											{`Data: ${dateFormat(higiene.serviceDate)}`}
										</Typography>
									</Stack>
								</CardContent>
							
							</Card>
						);
					})
				) : !higienes.length && !loading ? (
					<StartHere title={'Não existem registros de higiene!'} />
				) : (
					<CircularProgress color='secondary' />
				)}
			</Container>
			{!!snackbarOpen.status && <SnackbarComponent />}
		</>
	);
};
