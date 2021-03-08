import React from 'react';
import { useDispatch } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';

import BusinessIcon from '@material-ui/icons/Business';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Brightness4Icon from '@material-ui/icons/Brightness4';

import { logout } from '../store/slices/auth.slice';

export default function Navbar({ toggleTheme }) {
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(logout());
	};

	return (
		<AppBar position='static' id='app-bar' color='primary'>
			<BusinessIcon fontSize='large' id='logo' />
			<IconButton id='logout' onClick={handleLogout}>
				<ExitToAppIcon fontSize='large' />
			</IconButton>
			<IconButton id='theme-toggle' onClick={toggleTheme}>
				<Brightness4Icon fontSize='large' />
			</IconButton>
		</AppBar>
	);
}
