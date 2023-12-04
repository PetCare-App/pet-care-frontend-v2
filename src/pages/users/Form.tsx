import {
	Container,
	Box,
	useTheme,
	Stack,
	Alert,
	Snackbar,
	TextField,
	Select,
	MenuItem,
	ListItemText,
} from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { usePetCareContext } from '../../context';
import { User } from '../../types/users';
import { useState, useEffect } from 'react';
import { Input, FormControl, FormLabel, Button } from '@mui/joy';
import SnackbarComponent from '../../components/snackbar/Snackbar';

const schema = yup.object().shape({
  name: yup.string().required('Campo nome completo é obrigatório'),
  email: yup.string().email('Email inválido'),
  dateOfBirth: yup.string(), // Add validation as needed
  gender: yup.string(), // Add validation as needed
  maritalStatus: yup.string(), // Add validation as needed
  occupation: yup.string(), // Add validation as needed
  address: yup.string(), // Add validation as needed
  phoneNumber: yup.string(), // Add validation as needed
  photoUrl: yup.string(), // Add validation as needed
  preferredPaymentMethod: yup.string(), // Add validation as needed
  petInsuranceDetails: yup.string(), // Add validation as needed
  additionalNotes: yup.string(), // Add validation as needed
  registrationDate: yup.date().required('Campo data de registro é obrigatório'),
  password: yup.string(), // Add validation as needed
});

interface FormProps {
	currentUser?: User;
}

export const Form = ({}: FormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		setValue,
	} = useForm<User>({
		mode: 'onChange',
		resolver: yupResolver(schema),
	});
	const theme = useTheme();
	const { updateUser, user: currentUser, snackbarOpen } = usePetCareContext();

	const [user, setUser] = useState<User>(currentUser);

	useEffect(() => {
    setValue('name', currentUser.name);
    setValue('email', currentUser.email);
    setValue('dateOfBirth', currentUser.dateOfBirth || ''); // Adjust default value as needed
    setValue('gender', currentUser.gender || '');
    setValue('maritalStatus', currentUser.maritalStatus || '');
    setValue('occupation', currentUser.occupation || '');
    setValue('address', currentUser.address || '');
    setValue('phoneNumber', currentUser.phoneNumber || '');
    setValue('photoUrl', currentUser.photoUrl || '');
    setValue('preferredPaymentMethod', currentUser.preferredPaymentMethod || '');
    setValue('petInsuranceDetails', currentUser.petInsuranceDetails || '');
    setValue('additionalNotes', currentUser.additionalNotes || '');
    setValue('registrationDate', currentUser.registrationDate || ''); // Adjust default value as needed
    setValue('password', currentUser.password || '');
	}, [currentUser, setValue]);

	const submitEdit = async (data: User) => {
		const response = await updateUser(data);
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
			></Box>
			<Container>
				<Container
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						flexWrap: 'wrap',
					}}
				>
					<FormControl>
            <FormLabel>Nome Completo</FormLabel>
            <Input
              {...register('name')}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              value={user.name}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              {...register('email')}
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </FormControl>
					 <FormControl>
        <FormLabel>Endereço</FormLabel>
        <Input
          {...register('address')}
          value={user.address}
          onChange={(e) => setUser({ ...user, address: e.target.value })}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Número de Telefone</FormLabel>
        <Input
          {...register('phoneNumber')}
          value={user.phoneNumber}
          onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
        />
      </FormControl>
			 <FormControl>
				
        <FormLabel>Data de Nascimento</FormLabel>
        <Input
					sx={{ width: '220px' }}
					type='date'
					value={user.dateOfBirth?.split('T')[0]}
					slotProps={{
						input: {
							min: '2018-06-07T00:00',
							max: '2018-06-14T00:00',
						},
					}}
					onChange={(e) => setUser({ ...user, dateOfBirth: e.target.value })}
				/>
      </FormControl>
			<FormControl>
        <FormLabel>Estado Civil</FormLabel>
        <Input
          {...register('maritalStatus')}
          value={user.maritalStatus}
					onChange={(e) => setUser({ ...user, maritalStatus: e.target.value })}

        />
      </FormControl>
			<FormControl>
        <FormLabel>Profissão</FormLabel>
        <Input
          {...register('occupation')}
          value={user.occupation}
          onChange={(e) => setUser({ ...user, occupation: e.target.value })}
        />
      </FormControl>
			<FormControl>
        <FormLabel>Método de pagamento</FormLabel>
        <Input
          {...register('preferredPaymentMethod')}
          value={user.preferredPaymentMethod}
          onChange={(e) => setUser({ ...user, preferredPaymentMethod: e.target.value })}
        />
      </FormControl>
			<FormControl>
        <FormLabel>Seguro Pet</FormLabel>
        <Input
          {...register('petInsuranceDetails')}
          value={user.petInsuranceDetails}
          onChange={(e) => setUser({ ...user, petInsuranceDetails: e.target.value })}
        />
      </FormControl>
				<FormControl>
        <FormLabel>Notas adicionais</FormLabel>
        <Input
          {...register('additionalNotes')}
          value={user.additionalNotes}
          onChange={(e) => setUser({ ...user, additionalNotes: e.target.value })}
        />
      </FormControl>
					<Stack>
						<Button
							color='neutral'
							variant='soft'
							onClick={() => {
								submitEdit(user);
							}}
							sx={{ width: '80px', marginTop: '10px' }}
						>
							Salvar
						</Button>
					</Stack>
				</Container>
			</Container>
			{!!snackbarOpen.status && <SnackbarComponent />}
		</>
	);
};
