import React from 'react';
import { connect } from 'react-redux';
import { register } from '../../store/actions/authActions';

import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';

import AccountCircle from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';

const RegisterForm = ({ register}) => {
    const [ name, setName ] = React.useState('');
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
            case 'name':
                setName(e.target.value);
                break;
            default:
                return;
        };
    };

    return (
        <form id="register-form">
            <Typography variant="h2">Register</Typography>
            <FormControl>
                <InputLabel htmlFor="name">Name</InputLabel>
                <Input id="name" name="name" startAdornment={<AccountCircle />} onChange={handleChange} />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input id="email" name="email" startAdornment={<EmailIcon />} onChange={handleChange} />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input id="password" name="password" startAdornment={<LockIcon />} onChange={handleChange} />
            </FormControl>
            <Button type="button" color="secondary" variant="contained">Register</Button>
        </form>
    )
};

export default connect(null, { register })(RegisterForm);