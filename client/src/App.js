import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';


import Welcome from './components/Welcome';
import CustomerList from './components/CustomerList';


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
  const [ theme, setTheme ] = React.useState(themeObject);

  const { palette: { type }} = theme;
  const toggleDarkMode = () => {
    const updatedTheme = {
      ...theme,
      palette: {
        ...theme.palette,
        type: type === 'light' ? 'dark' : 'light'
      }
    }
    setTheme(updatedTheme);
  }
  return [ theme, toggleDarkMode ];
};


const App = () => {
  const [ theme, toggleDarkMode ] = useDarkMode();

  const themeConfig = createMuiTheme(theme);

  return (
    <Router>
      <MuiThemeProvider theme={themeConfig}>
        <div id="app">
          <Route exact path="/">
            <Welcome />
          </Route>
          <Route path="/customer-list">
            <CustomerList toggleTheme={toggleDarkMode}/>
          </Route>
        </div>
      </MuiThemeProvider>
    </Router>
  );
};

export default App;
