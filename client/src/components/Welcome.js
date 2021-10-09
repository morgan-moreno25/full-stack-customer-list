import React, { useState } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import LoginForm from './auth/LoginForm';
import RegisterForm from './auth/RegisterForm';

export default function Welcome() {
	const [authForm, setAuthForm] = useState('login');

	return (
		<div id='welcome'>
			<div className='title-container'>
				<Typography variant='h2'>Welcome to Customer List</Typography>
			</div>
			<Container id='login-register' maxWidth='sm'>
				<AppBar position='static' color='primary'>
					<div className='btn-group'>
						<Button
							className={authForm === 'login' ? 'active' : ''}
							type='button'
							onClick={() => setAuthForm('login')}
						>
							Login
						</Button>
						<Button
							className={authForm === 'register' ? 'active' : ''}
							type='button'
							onClick={() => setAuthForm('register')}
						>
							Register
						</Button>
					</div>
				</AppBar>
				{authForm === 'login' ? <LoginForm /> : <RegisterForm />}
			</Container>
		</div>
	);
}
