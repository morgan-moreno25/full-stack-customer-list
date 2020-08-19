import React from 'react';
import { connect } from 'react-redux';

import { loadUser, logout } from '../store/actions/authActions';
import { getCustomers } from '../store/actions/customerActions';

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
        modalInfo: {
            firstName: null,
            lastName: null,
            phoneNumber: null,
        },
    };

    componentDidMount(){
        this.props.getCustomers();
    };
    onEditClick = ( [ firstName, lastName, phoneNumber ] ) => {
        let fName = firstName;
        let lName = lastName;
        let pNumber = phoneNumber;
        
        this.setState({
            ...this.state,
            modalInfo: {
                firstName: fName,
                lastName: lName,
                phoneNumber: pNumber,
            }
        });
    };
    onModalInfoEdit = (e) => {
        this.setState({
            modalInfo: {
                [e.target.name]: e.target.value,
            },
        });
    };
    toggleModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen,
        });
    };

    render(){
        const { toggleTheme } = this.props;
        const { customers } = this.props.customer;
        return (
            <div id="customer-list-container">
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
                                            <TableCell><IconButton onClick={this.onEditClick.bind(this, [ firstName, lastName, phoneNumber ])}><EditIcon /></IconButton></TableCell>
                                            <TableCell><IconButton><DeleteForeverIcon /></IconButton></TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </Paper>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    customer: state.customer,
    user: state.auth.user,
});

export default connect(mapStateToProps, { logout, getCustomers } )(CustomerList);