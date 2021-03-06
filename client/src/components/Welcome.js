import React, { useState } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import LoginForm from './auth/LoginForm';
import RegisterForm from './auth/RegisterForm';

export default function Welcome() {
	const [authForm, setAuthForm] = useState('login');

	return (
		<div id='welcome'>
			<Typography variant='h1'>Welcome to Customer List</Typography>
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
