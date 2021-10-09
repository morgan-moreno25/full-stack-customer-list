import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './store/slices/auth.slice';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

import Welcome from './components/Welcome';
import CustomerList from './components/CustomerList';
import Alert from './components/Alert';

const themeObject = {
	palette: {
		primary: {
			light: '#8187ff',
			main: '#3d5afe',
			dark: '#0031ca',
			contrastText: '#ffffff',
		},
		secondary: {
			light: '#ffa4a2',
			main: '#e57373',
			dark: '#af4448',
			contrastText: '#000000',
		},
	},
};
const useDarkMode = () => {
	const [theme, setTheme] = React.useState(themeObject);

	const {
		palette: { type },
	} = theme;
	const toggleDarkMode = () => {
		const updatedTheme = {
			...theme,
			palette: {
				...theme.palette,
				type: type === 'light' ? 'dark' : 'light',
			},
		};
		setTheme(updatedTheme);
	};
	return [theme, toggleDarkMode];
};

const App = () => {
	const dispatch = useDispatch();

	const authenticated = useSelector((state) => state.auth.authenticated);
	const alert = useSelector((state) => state.alert.alert);

	useEffect(() => {
		dispatch(loadUser());
	}, [dispatch]);

	const [theme, toggleDarkMode] = useDarkMode();

	const themeConfig = createMuiTheme(theme);

	return (
		<Router>
			<MuiThemeProvider theme={themeConfig}>
				<div id='app'>
					{authenticated ? <Redirect to='/customer-list' /> : null}
					<Route exact path='/'>
						<Welcome />
					</Route>
					<Route path='/customer-list'>
						<CustomerList toggleTheme={toggleDarkMode} />
					</Route>
					{alert ? <Alert /> : null}
				</div>
			</MuiThemeProvider>
		</Router>
	);
};

export default App;
