import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return navigate('/login');

    axios.get(`${process.env.REACT_APP_API_URL}/api/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setUser(res.data))
    .catch(() => {
      localStorage.removeItem('token');
      navigate('/login');
    });
  }, [token, navigate]);

  const handleLogout = () => {
  localStorage.removeItem('token');
  window.dispatchEvent(new Event('logout'));
  navigate('/login');
};


  const goToMenuManager = () => {
    navigate('/menu-manager');
  };

  return (
    <section className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg border-0 rounded">
            <div className="card-body text-center">
              <h2 className="text-warning fw-bold mb-3">Welcome to Your Dashboard</h2>
              {user ? (
                <>
                  <p className="lead">👋 Hello, <strong>{user.name}</strong></p>
                  <p>Email: <span className="text-muted">{user.email}</span></p>

                  <hr className="my-4" />

                  <div className="d-flex justify-content-center gap-3">
                    <button onClick={goToMenuManager} className="btn btn-outline-primary rounded-pill px-4">
                      Manage Menu
                    </button>
                    <button onClick={handleLogout} className="btn btn-outline-danger rounded-pill px-4">
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <p>Loading your profile...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
