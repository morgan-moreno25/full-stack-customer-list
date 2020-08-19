import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { login } from '../../store/actions/authActions';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';

import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';

class LoginForm extends React.Component {
    state = {
        email: '',
        password: '',
        alert: false,
        msg: null,
    };
    static propTypes = {
        login: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object,
    };

    componentDidUpdate(prevProps){
        const { error } = this.props;

        if(error !== prevProps.error){
            if(error.id === 'LOGIN_FAIL'){
                this.setState({ msg: error.msg.msg });
                this.toggleAlert();
            }else{
                this.setState({ msg: null });
            };
        };
    };

    toggleAlert = () => {
        this.setState({  alert: !this.state.alert });
    };
    handleChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value,
        });
    };
    onSubmit = (e) => {
        e.preventDefault();

        const { email, password } = this.state;

        let user = { email, password };

        this.props.login(user);
    };
    alertDialog = () => { 
        return (
            <Dialog open={this.state.alert} onClose={this.toggleAlert}>
                <DialogContent>
                    <DialogContentText>
                        { this.state.msg }
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        );
    };


    render(){
        const { isAuthenticated } = this.props;
        return (
            <form id="login-form" >
                { isAuthenticated ? <Redirect to="/customer-list" /> : null }
                { this.state.alert ? this.alertDialog() : null }
                <Typography variant="h2">Login</Typography>
                <FormControl>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input type="email" id="email" name="email" startAdornment={<EmailIcon />} onChange={this.handleChange} />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input  type="password" id="password" name="password" startAdornment={<LockIcon />} onChange={this.handleChange} />
                </FormControl>
                <Button color="secondary" variant="contained" onClick={this.onSubmit}>Login</Button>
            </form>
        );
    };
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
});
    

export default connect(mapStateToProps, { login })(LoginForm);