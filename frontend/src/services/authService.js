import axios from 'axios';

const authService = axios.create({
  baseURL: 'http://localhost:3001', // Change to http if you're not using SSL
});

// Signup function with error handling
export const signup = async (data) => {
  try {
    const response = await authService.post('/user/signup', data);
    return response.data; // Return the response data
  } catch (error) {
    console.error('Signup failed:', error.response.data);
    throw error; // Propagate the error to handle it in the UI
  }
};

// Login function with error handling
export const login = async (data) => {
  try {
    const response = await authService.post('/user/login', data);
    return response.data; // Return the response data
  } catch (error) {
    console.error('Login failed:', error.response.data);
    throw error; // Propagate the error to handle it in the UI
  }
};

// Function to upload a transaction, including the token in the headers
export const uploadTransaction = (data, token) =>
  authService.post('/transaction/upload', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export default authService;
