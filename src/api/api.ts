import axios from 'axios';
import { API_URL } from '../utils/constants';

const tokenLocal = localStorage.getItem('jwt');

const $api = axios.create({
  baseURL: API_URL,
});

/* $api.interceptors.request.use((config) => {
  config.headers!.Authorization = `Bearer ${tokenLocal}`;
  return config;
}); */

export default $api;
