import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../store/actions/authActions';

import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';

import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';

const LoginForm = ({ login }) => {
    const [ email, setEmail ] = React.useState('');
    const [ password, setPassword ] = React.useState('');
    
    const handleChange = (e) => {
        switch(e.target.name){
            case 'email':
                setEmail(e.target.value);
                break;
            case 'password':
                setPassword(e.target.value);
                break;
            default:
                return;
        };
    };

    return (
        <form id="login-form">
            <Typography variant="h2">Login</Typography>
            <FormControl>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input id="email" name="email" startAdornment={<EmailIcon />} onChange={handleChange} />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input id="password" name="password" startAdornment={<LockIcon />} onChange={handleChange} />
            </FormControl>
            <Button type="button" color="secondary" variant="contained">Login</Button>
        </form>
    )
};

export default connect(null, { login })(LoginForm);