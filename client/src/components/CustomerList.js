import React from 'react';
import { connect } from 'react-redux';

import { loadUser } from '../store/actions/authActions';
import { getCustomers, deleteCustomer } from '../store/actions/customerActions';

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

const StyledTableCell = withStyles(( theme ) => ({
    head: {
        backgroundColor: theme.palette.grey.A200,
        color: theme.palette.common.black,
        fontWeight: 'bold',
        textDecoration: 'underline',
    },
}))(TableCell);


class CustomerList extends React.Component {
    state = {
        modalOpen: false,
        modalInfo: {
            firstName: null,
            lastName: null,
            phoneNumber: null,
        },
    };

    componentDidMount(){
        this.props.loadUser();
        this.props.getCustomers();
    };
    onEditClick = ( [ _id, firstName, lastName, phoneNumber ] ) => {
        let fName = firstName;
        let lName = lastName;
        let pNumber = phoneNumber;
        
        this.setState({
            ...this.state,
            modalInfo: {
                id: _id,
                firstName: fName,
                lastName: lName,
                phoneNumber: pNumber,
            }
        });
        this.toggleModal();
    };
    toggleModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen,
        });
    };
    onDeleteClick = ( id ) => {
        console.log(id);
        this.props.deleteCustomer(id);
    };

    render(){
        const { toggleTheme, isAuthenticated, user } = this.props;
        const { customers } = this.props.customer;
        const { modalOpen, modalInfo } = this.state;
        return (
            <div id="customer-list-container">
                { isAuthenticated ? null : <Redirect to="/" />}
                <Navbar toggleTheme={toggleTheme} />
                <AddCustomerModal />
                <Container maxWidth="lg">
                    <Paper component={TableContainer} elevation={10}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell scope="col">First Name</StyledTableCell>
                                    <StyledTableCell scope="col"><TableSortLabel direction="desc">Last Name</TableSortLabel></StyledTableCell>
                                    <StyledTableCell scope="col">Phone #</StyledTableCell>
                                    <StyledTableCell scope="col">Edit</StyledTableCell>
                                    <StyledTableCell scope="col">Delete</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { customers.map(( { _id, firstName, lastName, phoneNumber } ) => {
                                    return (
                                        <TableRow key={_id}>
                                            <TableCell scope="row" className="fname">{ firstName }</TableCell>
                                            <TableCell className="lname">{ lastName }</TableCell>
                                            <TableCell className="phoneNumber">{ phoneNumber }</TableCell>
                                            <TableCell><IconButton onClick={this.onEditClick.bind(this, [ _id, firstName, lastName, phoneNumber ])}><EditIcon /></IconButton></TableCell>
                                            <TableCell><IconButton onClick={this.onDeleteClick.bind(this, _id)}><DeleteForeverIcon /></IconButton></TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </Paper>
                </Container>
                { modalOpen ? <EditCustomerModal customer={modalInfo} toggle={this.toggleModal} /> : null}
            </div>
        )
    }
};

const mapStateToProps = state => ({
    customer: state.customer,
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { loadUser, getCustomers, deleteCustomer } )(CustomerList);