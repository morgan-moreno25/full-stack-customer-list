import { GET_CUSTOMERS, ADD_CUSTOMER, UPDATE_CUSTOMER, DELETE_CUSTOMER, CUSTOMERS_LOADING } from './types';
import axios from 'axios';
import { tokenConfig } from './authActions';

const setCustomersLoading = () => {
    return {
        type: CUSTOMERS_LOADING,
    };
};

export const getCustomers = () => dispatch => {
    dispatch(setItemsLoading());
    axios.get('/api/customers')
        .then(res => {
            dispatch({
                type: GET_CUSTOMERS,
                customers: res.data,
            });
        });
};

export const addCustomer = ({ firstName, lastName, phoneNumber }) => (dispatch, getState) => {
    let customer = { firstName, lastName, phoneNumber };

    axios.post('/api/customers', customer, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: ADD_CUSTOMER,
                customer: res.data,
            });
        });
};

export const updateCustomer = (id, { firstName, lastName, phoneNumber }) => (dispatch, getState) => {
    let customer = { firstName, lastName, phoneNumber };

    axios.put(`/api/customers/${id}`, customer, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: UPDATE_CUSTOMER,
                newValue: res.data,
            });
        });
};

export const deleteCustomer = id => (dispatch, getState) => {
    axios.delete(`/api/customers/${id}`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: DELETE_CUSTOMER,
                id: id,
            });
        });
};