import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';

import BusinessIcon from '@material-ui/icons/Business';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Brightness4Icon from '@material-ui/icons/Brightness4';

class Navbar extends React.Component {
    render(){
        const { toggleTheme } = this.props;
        return (
            <AppBar position="static" id="app-bar" color="primary">
                <BusinessIcon fontSize="large" id="logo"/>
                <IconButton id="logout">
                    <ExitToAppIcon fontSize="large" />
                </IconButton>
                <IconButton id="theme-toggle" onClick={toggleTheme}>
                    <Brightness4Icon fontSize="large" />
                </IconButton>
            </AppBar> 
        );
    };
};

export default Navbar;