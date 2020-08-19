import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { register } from '../../store/actions/authActions';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';

import AccountCircle from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';

class RegisterForm extends React.Component {
    state = {
        name: '',
        email: '',
        password: '',
        msg: null,
        alert: false,
    };
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object,
        register: PropTypes.func.isRequired
    };

    componentDidUpdate(prevProps){
        const { error } = this.props;

        if(error !== prevProps.error){
            if(error.id === 'REGISTER_FAIL'){
                this.setState({ msg: error.msg.msg });
                this.toggleAlert();
            }else{
                this.setState({ msg: null });
            };
        };
    };

    toggleAlert = () => {
        this.setState({ alert: !this.state.alert });
    };
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };
    handleSubmit = (e) => {
        e.preventDefault();

        const { name, email, password } = this.state;

        const newUser = { name, email, password };

        this.props.register(newUser);
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
        const { alert } = this.state;
        return (
            <form id="register-form">
                { isAuthenticated ? <Redirect to="/customer-list" /> : null }
                { alert ? this.alertDialog() : null }
                <Typography variant="h2">Register</Typography>
                <FormControl>
                    <InputLabel htmlFor="name">Name</InputLabel>
                    <Input id="name" name="name" startAdornment={<AccountCircle />} onChange={this.handleChange} />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input id="email" name="email" startAdornment={<EmailIcon />} onChange={this.handleChange} />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input id="password" name="password" startAdornment={<LockIcon />} onChange={this.handleChange} />
                </FormControl>
                <Button color="secondary" variant="contained" onClick={this.handleSubmit}>Register</Button>
            </form>
        );
    };
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
});

export default connect(mapStateToProps, { register })(RegisterForm);