import axios from 'axios';

const defaultAxios = axios.create();
defaultAxios.defaults.timeout = 1000 * 600;

defaultAxios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

defaultAxios.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default defaultAxios;
