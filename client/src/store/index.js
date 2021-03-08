import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/auth.slice';
import customerReducer from './slices/customer.slice';

export default configureStore({
    reducer: {
        auth: authReducer,
        customer: customerReducer,
    }
})