import React, { useEffect, useState } from 'react';
import {
	Container,
} from '@mui/material';
import { Dashboard } from './Dashboard';

export const PetsCharts = () => {

	return (
		<Container sx={{ display: 'flex', flexDirection: 'column' }}>
				<Dashboard />
		</Container>
	);
};
