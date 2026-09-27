import axios from 'axios';

const API = axios.create({
  baseURL: 'https://panchal-property.onrender.com/api',
});

export default API;