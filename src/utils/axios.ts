import axios from 'axios';

axios.interceptors.request.use((config: any) => {
  const jwt = localStorage.getItem('projmural_jwt');
  if (jwt === null) return config;
  // eslint-disable-next-line no-param-reassign
  config.headers = {
    Authorization: `Bearer ${jwt}`,
  };
  console.log(config);
  return config;
});

axios.interceptors.response.use((response) => {
  if (response.data.retc === -1) {
    console.log(response);
    window.location.href = 'localhost:3000';
  }
  return response;
});

export default axios;
