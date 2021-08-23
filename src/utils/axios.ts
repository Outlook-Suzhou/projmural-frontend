import axios from 'axios';

axios.interceptors.request.use((config: any) => {
  const jwt = localStorage.getItem('projmural_jwt');
  if (jwt === null) return config;
  // eslint-disable-next-line no-param-reassign
  config.header = {
    Authorization: `Bear ${jwt}`,
  };
  return config;
});

axios.interceptors.response.use((response) => {
  if (response.data.retc === -1) {
    window.location.href = 'localhost:3000';
  }
  return response;
});

export default axios;
