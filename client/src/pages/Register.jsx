import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });

  const { username, email, password, password2 } = formData;
  const navigate = useNavigate();
  const { register } = useAuth();
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      setError('Passwords do not match');
      return;
    } else {
      const userData = {
        username,
        email,
        password,
      };

      try {
        const user = await register(userData);
        console.log('User registered:', user);
        navigate('/');
      } catch (error) {
        const errorMessage = error.message || 'Registration failed';
        setError(errorMessage);
        console.error('Registration failed:', errorMessage);
      }
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <p>Please create an account</p>
      {error && <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
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
            type={showPassword ? "text" : "password"}
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
            type={showPassword ? "text" : "password"}
            className="form-control"
            id="password2"
            name="password2"
            value={password2}
            placeholder="Confirm password"
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group" style={{ marginBottom: '1rem' }}>
          <input
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={() => setShowPassword((prev) => !prev)}
          />
          <label htmlFor="showPassword" style={{ marginLeft: '0.5rem' }}>
            Show Password
          </label>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-block">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;