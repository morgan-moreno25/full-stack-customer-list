import { combineReducers } from 'redux';
import customerReducer from './customerReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';

export default combineReducers({
    customer: customerReducer,
    auth: authReducer,
    error: errorReducer,
});