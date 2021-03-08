import { createSlice } from '@reduxjs/toolkit';

const alertSlice = createSlice({
	name: 'alert',
	initialState: {
		type: '',
		msg: '',
		alert: false,
	},
	reducers: {
		updateAlert: (state, { payload }) => {
			state.type = payload.type;
			state.msg = payload.msg;
			state.alert = true;
		},
		clearAlert: (state) => {
			state.type = '';
			state.msg = '';
			state.alert = false;
		},
	},
});

export const { updateAlert, clearAlert } = alertSlice.actions;

export default alertSlice.reducer;
