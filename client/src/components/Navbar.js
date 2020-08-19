import React from 'react';
import { connect } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';

import BusinessIcon from '@material-ui/icons/Business';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Brightness4Icon from '@material-ui/icons/Brightness4';

import { logout } from '../store/actions/authActions';
import { Typography } from '@material-ui/core';

class Navbar extends React.Component {

    logout = () => {
        this.props.logout();
    };

    render(){
        const { toggleTheme, user } = this.props;
        return (
            <AppBar position="static" id="app-bar" color="primary">
                <BusinessIcon fontSize="large" id="logo"/>
                <IconButton id="logout" onClick={this.logout}>
                    <ExitToAppIcon fontSize="large" />
                </IconButton>
                <IconButton id="theme-toggle" onClick={toggleTheme}>
                    <Brightness4Icon fontSize="large" />
                </IconButton>
            </AppBar> 
        );
    };
};


export default connect(null, { logout })(Navbar);