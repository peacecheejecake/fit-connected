import axios from 'axios';

const _axios = axios.create({
  // baseURL: 'http://localhost:3000',
  timeout: 10000,
});

_axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default _axios;
