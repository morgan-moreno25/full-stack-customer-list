import { GET_CUSTOMERS, ADD_CUSTOMER, UPDATE_CUSTOMER, DELETE_CUSTOMER, CUSTOMERS_LOADING } from '../actions/types';

const initialState = {
    customers: [],
    isLoading: false,
};


export default function( state = initialState, action){
    switch(action.type){
        case GET_CUSTOMERS:
            return {
                ...state,
                customers: action.customers,
                isLoading: false,
            };
        case ADD_CUSTOMER:
            return {
                ...state,
                customers: [...state.customers, action.customer],
            };
        case UPDATE_CUSTOMER:
            let arr = state.customers;
            let index = arr.indexOf({ _id: action.id});
            if(index){
                arr.splice(index, 1, action.newValue);
            };
            return {
                ...state,
                customers: arr,
            };
        case DELETE_CUSTOMER:
            return {
                ...state,
                customers: state.customers.filter(customer._id !== action.id),
            };
        case ITEMS_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        default:
            return state;
    }
};