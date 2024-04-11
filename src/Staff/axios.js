import axios from 'axios';

// Create Axios instance with base URL
const instance = axios.create({
  baseURL: 'https://raknaapi.azurewebsites.net',
});

// Add request interceptor
instance.interceptors.request.use(
  (config) => {
    // Add Authorization header to requests
    const accessToken = localStorage.getItem('accessToken');
    
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      console.log('Authorization header added:', config.headers.Authorization);
    }
    
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Add response interceptor
instance.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response;
  },
  (error) => {
    // Handle response errors
    return Promise.reject(error);
  }
);

export default instance;
