// src/services/imgbb.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_IMAGE_STORAGE_BASE_URL;

console.log(API_BASE_URL)

const imgbbAxios = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  withCredentials: false,
});

export default imgbbAxios;
