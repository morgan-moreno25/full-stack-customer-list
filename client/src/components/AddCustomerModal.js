import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';

import { addCustomer } from '../store/slices/customer.slice';
import { Typography } from '@material-ui/core';

export default function AddCustomerModal() {
	const dispatch = useDispatch();

	const [open, setOpen] = useState(false);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');

	const toggle = () => setOpen(!open);

	const onSubmit = async (e) => {
		e.preventDefault();

		const resultAction = await dispatch(
			addCustomer({ firstName, lastName, phoneNumber })
		);

		console.log(resultAction.payload);
		toggle();
	};

	return (
		<Container id='add-customer'>
			<Button
				type='button'
				color='secondary'
				variant='contained'
				onClick={toggle}
			>
				Add Customer
			</Button>
			<Modal open={open} onClose={toggle}>
				<Paper
					component='form'
					elevation={10}
					className='modal-content'
				>
					<Typography variant='h5'>Enter Customer Info</Typography>
					<FormControl>
						<InputLabel htmlFor='firstName'>First Name</InputLabel>
						<Input
							type='text'
							name='firstName'
							id='firstName'
							onChange={(e) => setFirstName(e.target.value)}
						/>
					</FormControl>
					<FormControl>
						<InputLabel htmlFor='lastName'>Last Name</InputLabel>
						<Input
							type='text'
							name='lastName'
							id='lastName'
							onChange={(e) => setLastName(e.target.value)}
						/>
					</FormControl>
					<FormControl>
						<InputLabel htmlFor='phoneNumber'>
							Phone Number
						</InputLabel>
						<Input
							type='text'
							name='phoneNumber'
							id='phoneNumber'
							onChange={(e) => setPhoneNumber(e.target.value)}
							aria-describedby='phone-helper'
						/>
						<FormHelperText id='phone-helper'>
							EX: ###-###-#### (Please enter dashes)
						</FormHelperText>
					</FormControl>
					<Button
						type='button'
						color='primary'
						variant='contained'
						onClick={onSubmit}
					>
						Add Customer
					</Button>
				</Paper>
			</Modal>
		</Container>
	);
}
