import React from 'react';
import { connect } from 'react-redux';

import Button from "@material-ui/core/Button";
import Container from '@material-ui/core/Container';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';


import { addCustomer } from '../store/actions/customerActions';
import { Typography } from '@material-ui/core';

class AddCustomerModal extends React.Component {
    state = {
        open: false,
        firstName: '',
        lastName: '',
        phoneNumber: '',
    };

    toggle = () => {
        this.setState({
            open: !this.state.open,
        });
    };
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    };
    onSubmit = (e) => {
        e.preventDefault();
        const { firstName, lastName, phoneNumber } = this.state;

        let newCustomer = { firstName, lastName, phoneNumber };

        this.props.addCustomer(newCustomer);

        this.toggle();
    };

    render(){
        const { open } = this.state;
        return (
            <Container id="add-customer">
                <Button type="button" color="secondary" variant="contained" onClick={this.toggle}>Add Customer</Button>
                <Modal open={open} onClose={this.toggle}>
                    <Paper component="form" elevation={10} className="modal-content">
                        <Typography variant="h5">Enter Customer Info</Typography>
                        <FormControl>
                            <InputLabel htmlFor="firstName">First Name</InputLabel>
                            <Input type="text" name="firstName" id="firstName" onChange={this.onChange} />
                        </FormControl>                        
                        <FormControl>
                            <InputLabel htmlFor="lastName">Last Name</InputLabel>
                            <Input type="text" name="lastName" id="lastName" onChange={this.onChange} />
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="phoneNumber">Phone Number</InputLabel>
                            <Input type="text" name="phoneNumber" id="phoneNumber" onChange={this.onChange} aria-describedby="phone-helper"/>
                            <FormHelperText id="phone-helper">EX: ###-###-#### (Please enter dashes)</FormHelperText>
                        </FormControl>
                        <Button type="button" color="primary" variant="contained" onClick={this.onSubmit}>Add Customer</Button>
                    </Paper>
                </Modal>            
            </Container>
        );
    };
};

export default connect(null, { addCustomer })(AddCustomerModal);