import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { register } from '../../store/slices/auth.slice';
import { updateAlert } from '../../store/slices/alert.slice';

import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';

import AccountCircle from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';

export default function RegisterForm() {
	const dispatch = useDispatch();

	const authenticated = useSelector((state) => state.auth.authenticated);

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();

		const resultAction = await dispatch(
			register({ name, email, password })
		);

		if (register.fulfilled.match(resultAction)) {
			console.log('Register successful');
		} else {
			const { msg } = resultAction.payload;

			dispatch(updateAlert({ type: 'danger', msg }));
		}
	};

	return (
		<form id='register-form' onSubmit={handleSubmit}>
			{authenticated ? <Redirect to='/customer-list' /> : null}
			<div className='title-container'>
				<Typography variant='h4'>Register</Typography>
			</div>
			<FormControl>
				<InputLabel htmlFor='name'>Name</InputLabel>
				<Input
					type='text'
					id='name'
					name='name'
					startAdornment={<AccountCircle />}
					onChange={(e) => setName(e.target.value)}
				/>
			</FormControl>
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
				Register
			</Button>
		</form>
	);
}
