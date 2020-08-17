import React from 'react';
import './App.css';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';


import Welcome from './components/Welcome';


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
    <MuiThemeProvider theme={themeConfig}>
      <div id="app">
        <Welcome />
      </div>
    </MuiThemeProvider>
  );
};

export default App;
