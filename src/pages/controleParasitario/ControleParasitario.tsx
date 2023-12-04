import React from 'react';

import {
	Container,

} from '@mui/material';

import { Dashboard } from './Dashboard';

export const PetsControleParasitario = () => {

	return (
		<Container sx={{ display: 'flex', flexDirection: 'column' }}>
				<Dashboard/>
		</Container>
	);
};
