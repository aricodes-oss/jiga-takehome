import axios from 'axios';

const baseURL = `${process.env.BACKEND_URL ?? ''}/api`;
const client = axios.create({
  baseURL,
  responseType: 'json',
  headers: {
    'X-REQUESTED-WITH': 'XMLHttpRequest',
    'Content-Type': 'application/json',
  },
});

export default client;
