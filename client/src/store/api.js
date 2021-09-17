import axios from 'axios';

const DEV_URL = 'http://localhost:5000/api/v1';
const PROD_URL = 'https://mern-customer-list.herokuapp.com/api/v1';

export const api = axios.create({
	baseURL: process.env.NODE_ENV === 'production' ? PROD_URL : DEV_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});
