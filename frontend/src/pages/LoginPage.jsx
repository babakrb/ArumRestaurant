import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage('');
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, formData,{ headers: { "Content-Type": "application/json" } });
    localStorage.setItem('token', res.data.token);
    setMessage('✅ Login successful! Welcome back, ' + res.data.user.name);
    navigate('/dashboard');
    window.location.reload();
  } catch (err) {
    setMessage('❌ ' + (err.response?.data?.message || 'Login failed'));
  }
};

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/google`, {
        token: credentialResponse.credential,
      });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      console.error('Google login failed:', err);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow rounded">
            <div className="card-body">
              <h3 className="text-center text-warning mb-4">Login to Your Account</h3>

              {/* Email/Password Login */}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-warning w-100">Login</button>
              </form>

              

              
              {/* Message */}
              {message && <div className="mt-3 text-center text-muted">{message}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
