import React from 'react';


import {

	Container,

} from '@mui/material';
import { Dashboard } from './Dashboard';


export const PetsVaccine = () => {

	return (
		<Container sx={{ display: 'flex', flexDirection: 'column' }}>
				<Dashboard />
		</Container>
	);
};
