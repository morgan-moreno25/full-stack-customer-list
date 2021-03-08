import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import tokenConfig from './tokenConfig';
import axios from 'axios';

export const login = createAsyncThunk(
	'auth/login',
	async ({ email, password }, thunkAPI) => {
		const body = JSON.stringify({ email, password });
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const response = await axios.post('/api/auth', body, config);

			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);
export const register = createAsyncThunk(
	'auth/register',
	async ({ name, email, password }, thunkAPI) => {
		const body = JSON.stringify({ name, email, password });
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const response = await axios.post('/api/users', body, config);

			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);
export const loadUser = createAsyncThunk(
	'auth/loadUser',
	async (_, thunkAPI) => {
		const config = tokenConfig(thunkAPI.getState);

		try {
			const response = await axios.get('/api/auth/user', config);

			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		token: localStorage.getItem('token')
			? localStorage.getItem('token')
			: '',
		user: null,
		authenticated: false,
		isLoading: false,
		error: null,
	},
	reducers: {
		logout: (state) => {
			localStorage.removeItem('token');

			state.isLoading = false;
			state.token = '';
			state.user = null;
			state.authenticated = false;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(login.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});
		builder.addCase(login.fulfilled, (state, { payload }) => {
			localStorage.setItem('token', payload.token);

			state.isLoading = false;
			state.authenticated = true;
			state.user = payload.user;
			state.token = payload.token;
		});
		builder.addCase(login.rejected, (state, { payload }) => {
			state.isLoading = false;
			state.error = payload;
		});
		builder.addCase(register.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});
		builder.addCase(register.fulfilled, (state, { payload }) => {
			localStorage.setItem('token', payload.token);

			state.isLoading = false;
			state.authenticated = true;
			state.token = payload.token;
			state.user = payload.user;
		});
		builder.addCase(register.rejected, (state, { payload }) => {
			state.isLoading = false;
			state.error = payload;
		});
		builder.addCase(loadUser.pending, (state) => {
			state.isLoading = true;
			state.authenticated = false;
			state.error = null;
		});
		builder.addCase(loadUser.fulfilled, (state, { payload }) => {
			state.isLoading = false;
			state.authenticated = true;
			state.user = payload;
		});
		builder.addCase(loadUser.rejected, (state, { payload }) => {
			localStorage.removeItem('token');

			state.isLoading = false;
			state.token = '';
			state.user = null;
			state.error = payload;
		});
	},
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
