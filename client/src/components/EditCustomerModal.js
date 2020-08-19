import React from 'react';
import { connect } from 'react-redux';

import Button from "@material-ui/core/Button";
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Typography from '@material-ui/core/Typography';

import { updateCustomer } from '../store/actions/customerActions';

class EditCustomerModal extends React.Component {
    state = {
        open: false,
        firstName: '',
        lastName: '',
        phoneNumber: '',
    };

    componentDidMount(){
        const { customer } = this.props; 
        this.setState({
            open: true,
            firstName: customer.firstName,
            lastName: customer.lastName,
            phoneNumber: customer.phoneNumber,
        });
    };

    toggle = () => {
        this.setState({ open: !this.state.open });
        this.props.toggle();
    };
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    };
    onSubmit = (e) => {
        e.preventDefault();
        
        const { firstName, lastName, phoneNumber } = this.state;

        const newCustomer = { firstName, lastName, phoneNumber };

        this.props.updateCustomer(this.props.customer.id, newCustomer)

        this.toggle();
    };

    render(){
        const { open, firstName, lastName, phoneNumber } = this.state;
        return (
            <div>
                <Modal open={open} onClose={this.toggle}>
                    <Paper component="form" elevation={10} className="modal-content">
                        <Typography variant="h5">Edit Customer Info</Typography>
                        <FormControl>
                            <InputLabel htmlFor="firstName">First Name</InputLabel>
                            <Input type="text" name="firstName" id="firstName" value={firstName} onChange={this.onChange} />
                        </FormControl>                        
                        <FormControl>
                            <InputLabel htmlFor="lastName">Last Name</InputLabel>
                            <Input type="text" name="lastName" id="lastName" value={lastName} onChange={this.onChange} />
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="phoneNumber">Phone Number</InputLabel>
                            <Input type="text" name="phoneNumber" id="phoneNumber" value={phoneNumber} onChange={this.onChange} aria-describedby="phone-helper"/>
                            <FormHelperText id="phone-helper">EX: ###-###-#### (Please enter dashes)</FormHelperText>
                        </FormControl>
                        <Button type="button" color="primary" variant="contained" onClick={this.onSubmit}>Submit Changes</Button>
                    </Paper>
                </Modal>            
            </div>
        );
    };
};

export default connect(null, { updateCustomer })(EditCustomerModal);