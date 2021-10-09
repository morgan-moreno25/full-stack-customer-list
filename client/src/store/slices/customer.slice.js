import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import tokenConfig from './tokenConfig';
import { api } from '../api';

export const getAllCustomers = createAsyncThunk(
	'customer/getAll',
	async (_, thunkAPI) => {
		try {
			const response = await api.get('/customers');

			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);
export const addCustomer = createAsyncThunk(
	'customer/add',
	async ({ firstName, lastName, phoneNumber }, thunkAPI) => {
		const body = JSON.stringify({ firstName, lastName, phoneNumber });
		const config = tokenConfig(thunkAPI.getState);

		try {
			const response = await api.post('/customers', body, config);

			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);
export const udpateCustomer = createAsyncThunk(
	'customer/update',
	async ({ id, customer }, thunkAPI) => {
		const { firstName, lastName, phoneNumber } = customer;
		const body = JSON.stringify({ firstName, lastName, phoneNumber });
		const config = tokenConfig(thunkAPI.getState);

		try {
			const response = await api.put(`/customers/${id}`, body, config);

			const payload = {
				id,
				customer: response.data,
			};

			return payload;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);
export const deleteCustomer = createAsyncThunk(
	'customer/deleteOne',
	async ({ id }, thunkAPI) => {
		const config = tokenConfig(thunkAPI.getState);

		try {
			const response = await api.delete(`/customers/${id}`, config);

			const payload = {
				id,
				customer: response.data.customer,
			};

			return payload;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

const customerSlice = createSlice({
	name: 'customer',
	initialState: {
		customers: [],
		isLoading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getAllCustomers.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getAllCustomers.fulfilled, (state, { payload }) => {
			state.isLoading = false;
			state.customers = payload;
		});
		builder.addCase(getAllCustomers.rejected, (state, { payload }) => {
			state.isLoading = false;
			state.error = payload;
		});
		builder.addCase(addCustomer.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(addCustomer.fulfilled, (state, { payload }) => {
			state.isLoading = false;
			state.customers.push(payload);
		});
		builder.addCase(addCustomer.rejected, (state, { payload }) => {
			state.isLoading = false;
			state.error = payload;
		});
		builder.addCase(udpateCustomer.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(udpateCustomer.fulfilled, (state, { payload }) => {
			state.isLoading = false;
			const index = state.customers.findIndex(
				(customer) => customer.id === payload.id
			);
			if (index !== -1) {
				state.customers.splice(index, 1, payload.customer);
			}
		});
		builder.addCase(udpateCustomer.rejected, (state, { payload }) => {
			state.isLoading = false;
			state.error = payload;
		});
		builder.addCase(deleteCustomer.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(deleteCustomer.fulfilled, (state, { payload }) => {
			state.isLoading = false;
			state.customers = state.customers.filter(
				(customer) => customer.id !== payload.id
			);
		});
		builder.addCase(deleteCustomer.rejected, (state, { payload }) => {
			state.isLoading = false;
			state.error = payload;
		});
	},
});

export default customerSlice.reducer;
