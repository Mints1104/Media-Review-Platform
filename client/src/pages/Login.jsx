// client/src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // client/src/pages/Login.jsx (inside onSubmit)
const onSubmit = async (e) => {
    e.preventDefault();
  
    const userData = {
      email,
      password,
    };
  
    try {
      const user = await authService.login(userData);
      console.log('User logged in:', user);
      navigate('/');
    } catch (error) {
      // --- CHANGE THIS LINE ---
      const errorMessage = error.response && error.response.data && error.response.data.message
                             ? error.response.data.message
                             : error.message;
      console.error('Login failed:', errorMessage);
      // Display error to the user
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <p>Login to your account</p>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={password}
            placeholder="Enter password"
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-block">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;