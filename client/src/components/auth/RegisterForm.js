import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { register } from '../../store/slices/auth.slice';

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

	const onSubmit = async (e) => {
		e.preventDefault();

		const resultAction = await dispatch(
			register({ name, email, password })
		);

		console.log(resultAction.payload);
	};

	return (
		<form id='register-form'>
			{authenticated ? <Redirect to='/customer-list' /> : null}
			<Typography variant='h2'>Register</Typography>
			<FormControl>
				<InputLabel htmlFor='name'>Name</InputLabel>
				<Input
					id='name'
					name='name'
					startAdornment={<AccountCircle />}
					onChange={(e) => setName(e.target.value)}
				/>
			</FormControl>
			<FormControl>
				<InputLabel htmlFor='email'>Email</InputLabel>
				<Input
					id='email'
					name='email'
					startAdornment={<EmailIcon />}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</FormControl>
			<FormControl>
				<InputLabel htmlFor='password'>Password</InputLabel>
				<Input
					id='password'
					name='password'
					startAdornment={<LockIcon />}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</FormControl>
			<Button color='secondary' variant='contained' onClick={onSubmit}>
				Register
			</Button>
		</form>
	);
}
