import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadUser } from '../store/slices/auth.slice';
import {
	getAllCustomers,
	deleteCustomer,
} from '../store/slices/customer.slice';

import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import Navbar from './Navbar';
import AddCustomerModal from './AddCustomerModal';
import EditCustomerModal from './EditCustomerModal';
import { Redirect } from 'react-router-dom';

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.grey.A200,
		color: theme.palette.common.black,
		fontWeight: 'bold',
		textDecoration: 'underline',
	},
}))(TableCell);

export default function CustomerList({ toggleTheme }) {
	const dispatch = useDispatch();

	const authenticated = useSelector((state) => state.auth.authenticated);
	const customers = useSelector((state) => state.customer.customers);

	useEffect(() => {
		dispatch(getAllCustomers());
	}, [dispatch]);

	const [modalInfo, setModalInfo] = useState({
		id: '',
		firstName: '',
		lastName: '',
		phoneNumber: '',
	});
	const [editModalOpen, setEditModalOpen] = useState(false);

	const toggleEditModal = () => setEditModalOpen(!editModalOpen);
	const handleEditClick = (id, firstName, lastName, phoneNumber) => {
		setModalInfo({
			id,
			firstName,
			lastName,
			phoneNumber,
		});

		toggleEditModal();
	};
	const handleDeleteClick = async (id) => {
		const resultAction = await dispatch(deleteCustomer({ id }));

		console.log(resultAction.payload);
	};

	return (
		<div id='customer-list-container'>
			{authenticated ? null : <Redirect to='/' />}
			<Navbar toggleTheme={toggleTheme} />
			<AddCustomerModal />
			<Container maxWidth='lg'>
				<Paper component={TableContainer} elevation={10}>
					<Table>
						<TableHead>
							<TableRow>
								<StyledTableCell scope='col'>
									First Name
								</StyledTableCell>
								<StyledTableCell scope='col'>
									<TableSortLabel direction='desc'>
										Last Name
									</TableSortLabel>
								</StyledTableCell>
								<StyledTableCell scope='col'>
									Phone #
								</StyledTableCell>
								<StyledTableCell scope='col'>
									Edit
								</StyledTableCell>
								<StyledTableCell scope='col'>
									Delete
								</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{customers.map(
								({ id, firstName, lastName, phoneNumber }) => {
									return (
										<TableRow key={id}>
											<TableCell
												scope='row'
												className='fname'
											>
												{firstName}
											</TableCell>
											<TableCell className='lname'>
												{lastName}
											</TableCell>
											<TableCell className='phoneNumber'>
												{phoneNumber}
											</TableCell>
											<TableCell>
												<IconButton
													onClick={() =>
														handleEditClick(
															id,
															firstName,
															lastName,
															phoneNumber
														)
													}
												>
													<EditIcon />
												</IconButton>
											</TableCell>
											<TableCell>
												<IconButton
													onClick={() =>
														handleDeleteClick(id)
													}
												>
													<DeleteForeverIcon />
												</IconButton>
											</TableCell>
										</TableRow>
									);
								}
							)}
						</TableBody>
					</Table>
				</Paper>
			</Container>
			<EditCustomerModal
				open={editModalOpen}
				customer={modalInfo}
				toggle={toggleEditModal}
			/>
		</div>
	);
}
