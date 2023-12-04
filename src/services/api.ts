import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://vetcaredeploy-api.onrender.com/api',
	timeout: 5000,
});

export const api = instance;
