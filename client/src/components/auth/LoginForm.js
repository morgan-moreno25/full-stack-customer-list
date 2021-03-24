import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { login } from '../../store/slices/auth.slice';
import { updateAlert } from '../../store/slices/alert.slice';

import {
	FormControl,
	Button,
	InputLabel,
	Input,
	Typography,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';

import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';

export default function LoginForm() {
	const dispatch = useDispatch();

	const authenticated = useSelector((state) => state.auth.authenticated);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();

		const resultAction = await dispatch(login({ email, password }));

		if (login.fulfilled.match(resultAction)) {
			console.log('Login successful');
		} else {
			const { msg } = resultAction.payload;

			dispatch(updateAlert({ type: 'danger', msg }));
		}
	};

	return (
		<form id='login-form' onSubmit={handleSubmit}>
			{authenticated ? <Redirect to='/customer-list' /> : null}
			<Typography variant='h2'>Login</Typography>
			<FormControl>
				<InputLabel htmlFor='email'>Email</InputLabel>
				<Input
					type='email'
					id='email'
					name='email'
					startAdornment={<EmailIcon />}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</FormControl>
			<FormControl>
				<InputLabel htmlFor='password'>Password</InputLabel>
				<Input
					type='password'
					id='password'
					name='password'
					startAdornment={<LockIcon />}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</FormControl>
			<Button color='secondary' variant='contained' type='submit'>
				Login
			</Button>
			<Alert severity='info'>
				<AlertTitle>TESTING</AlertTitle>
				Email: example@example.com | Password: 1234
			</Alert>
		</form>
	);
}
