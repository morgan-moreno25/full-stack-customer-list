import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import LoginForm from './auth/LoginForm';
import RegisterForm from './auth/RegisterForm';


class Welcome extends React.Component {
    state = {
        login: true,
        regitster: false,
    };

    handleLoginClick = () => {
        this.setState({
            ...this.state,
            login: true,
            register: false,
        });
    };
    handleRegisterClick = () => {
        this.setState({
            ...this.state,
            login: false,
            register: true,
        });
    };


    render(){
        const { login } = this.state;
        return(
            <div id="welcome">
                <Typography variant="h1">WELCOME TO CUSTOMER LIST</Typography>
                <Container id="login-register" maxWidth="sm">
                    <AppBar position="static" color="primary" >
                        <ButtonGroup variant="text" className="btn-group">
                            <Button type="button" onClick={this.handleLoginClick}>Login</Button>
                            <Button type="button" onClick={this.handleRegisterClick}>Register</Button>
                        </ButtonGroup>
                    </AppBar>
                    { login ? <LoginForm /> : <RegisterForm /> }
                </Container>
            </div>
        );
    }
    
};

export default Welcome;