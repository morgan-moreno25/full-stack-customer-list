import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAlert } from '../store/slices/alert.slice';

import {
	Button,
	Dialog,
	DialogTitle,
	DialogActions,
	DialogContent,
	DialogContentText,
} from '@material-ui/core';

export default function Alert({ open, toggle }) {
	const dispatch = useDispatch();

	const { type, msg, alert } = useSelector((state) => state.alert);

	const handleClose = () => {
		dispatch(clearAlert());
	};

	return (
		<Dialog open={alert} onClose={handleClose}>
			<DialogTitle>{type.toUpperCase()}</DialogTitle>
			<DialogContent>
				<DialogContentText>{msg}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color='primary'>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
}
