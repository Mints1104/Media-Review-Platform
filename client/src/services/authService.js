import axios from 'axios';
import API_BASE_URL from './api'; 
const USER_API_URL = `${API_BASE_URL}/api/users/`; 

const register = async(userData) => {
  try {
    const response = await axios.post(USER_API_URL + 'register', userData);
    return response.data;
  } catch (error) {
    const message = error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : error.message;
    throw new Error(message);
  }
};


const login = async(userData) => {
  try {
    const response = await axios.post(USER_API_URL + 'login', userData);
    return response.data;
  } catch (error) {
    const message = error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : error.message;
    throw new Error(message);
  }
};

const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  register,
  logout,
  login
};

export default authService;