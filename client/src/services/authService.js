import axios from 'axios';
const API_URL = '/api/users/';

//Register user

const register = async(userData) => {
  try {
    const response = await axios.post(API_URL + 'register', userData);
    return response.data;
  } catch (error) {
    const message = error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : error.message;
    throw new Error(message);
  }
};

//Login user

const login = async(userData) => {
  try {
    const response = await axios.post(API_URL + 'login', userData);
    return response.data;
  } catch (error) {
    const message = error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : error.message;
    throw new Error(message);
  }
};

//Logout user
const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  register,
  logout,
  login
};

export default authService;