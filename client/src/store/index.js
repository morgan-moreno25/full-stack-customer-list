import { configureStore } from '@reduxjs/toolkit';

import alertReducer from './slices/alert.slice';
import authReducer from './slices/auth.slice';
import customerReducer from './slices/customer.slice';

export default configureStore({
	reducer: {
		alert: alertReducer,
		auth: authReducer,
		customer: customerReducer,
	},
});
