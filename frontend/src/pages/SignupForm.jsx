import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const SignupForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', formData);
      localStorage.setItem('token', res.data.token);
      setMessage('✅ Signup successful! Welcome, ' + res.data.user.name);
      setTimeout(() => navigate('/login'), 1500); // Redirect after 1.5s
      // Optionally redirect: window.location.href = '/dashboard';
    } catch (err) {
      setMessage('❌ ' + (err.response?.data?.message || 'Signup failed'));
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="text-center text-warning mb-4">Create a New Account</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
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
                <button type="submit" className="btn btn-warning w-100">Sign Up</button>
              </form>
              {message && <div className="mt-3 text-center text-muted">{message}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;