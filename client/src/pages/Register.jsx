// client/src/pages/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '', // For password confirmation
  });

  const { username, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // client/src/pages/Register.jsx (inside onSubmit)
const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      console.log('Passwords do not match');
    } else {
      const userData = {
        username,
        email,
        password,
      };
  
      try {
        const user = await authService.register(userData);
        console.log('User registered:', user);
        navigate('/login');
      } catch (error) {
        // --- CHANGE THIS LINE ---
        const errorMessage = error.response && error.response.data && error.response.data.message
                             ? error.response.data.message
                             : error.message; // Fallback to general error message
        console.error('Registration failed:', errorMessage);
        // You'll display this error message in the UI later
      }
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <p>Please create an account</p>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={username}
            placeholder="Enter your username"
            onChange={onChange}
            required
          />
        </div>
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
          <input
            type="password"
            className="form-control"
            id="password2"
            name="password2"
            value={password2}
            placeholder="Confirm password"
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

export default Register;