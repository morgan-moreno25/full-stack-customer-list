import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Typography from '@material-ui/core/Typography';

import { udpateCustomer } from '../store/slices/customer.slice';

export default function EditCustomerModal({ customer, toggle, open }) {
	const dispatch = useDispatch();

	const [firstName, setFirstName] = useState(customer.firstName);
	const [lastName, setLastName] = useState(customer.lastName);
	const [phoneNumber, setPhoneNumber] = useState(customer.phoneNumber);

	const onSubmit = async (e) => {
		e.preventDefault();

		const resultAction = await dispatch(
			udpateCustomer({ id: customer.id, customer })
		);

		console.log(resultAction.payload);
	};

	return (
		<div>
			<Modal open={open} onClose={toggle}>
				<Paper
					component='form'
					elevation={10}
					className='modal-content'
				>
					<Typography variant='h5'>Edit Customer Info</Typography>
					<FormControl>
						<InputLabel htmlFor='firstName'>First Name</InputLabel>
						<Input
							type='text'
							name='firstName'
							id='firstName'
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
						/>
					</FormControl>
					<FormControl>
						<InputLabel htmlFor='lastName'>Last Name</InputLabel>
						<Input
							type='text'
							name='lastName'
							id='lastName'
							value={lastName}
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
							value={phoneNumber}
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
						Submit Changes
					</Button>
				</Paper>
			</Modal>
		</div>
	);
}
