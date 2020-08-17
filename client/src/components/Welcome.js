import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import LoginForm from './auth/LoginForm';
import RegisterForm from './auth/RegisterForm';


const Welcome = () => {
    const [ login, setLogin ] = React.useState(true);
    const [ register, setRegister ] = React.useState(false);

    const handleLoginClick = () => {
        setRegister(false);
        setLogin(true);
    };
    const handleRegisterClick = () => {
        setLogin(false);
        setRegister(true);
    };

    return(
        <div id="welcome">
            <Typography variant="h1">WELCOME TO CUSTOMER LIST</Typography>
            <Container id="login-register" maxWidth="sm">
                <AppBar position="static" color="primary" >
                    <ButtonGroup variant="text" className="btn-group">
                        <Button type="button" onClick={handleLoginClick}>Login</Button>
                        <Button type="button" onClick={handleRegisterClick}>Register</Button>
                    </ButtonGroup>
                </AppBar>
                { login ? <LoginForm /> : <RegisterForm /> }
            </Container>
        </div>
    );
};

export default Welcome;