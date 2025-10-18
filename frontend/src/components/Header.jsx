import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // بررسی وضعیت ورود و گوش دادن به تغییرات login/logout
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    const handleAuthChange = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };

    // گوش دادن به login و logout
    window.addEventListener('login', handleAuthChange);
    window.addEventListener('logout', handleAuthChange);

    return () => {
      window.removeEventListener('login', handleAuthChange);
      window.removeEventListener('logout', handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    window.dispatchEvent(new Event('logout'));
    navigate('/login');
  };

  // Scroll to Footer
  const scrollToFooter = () => {
    const footer = document.getElementById('ftr');
    if (footer) footer.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Our Menu', path: '/menu' },
  ];

  return (
    <header className="shadow-sm">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
        <a className="navbar-brand fw-bold text-warning" href="#">
          Arum
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
          aria-controls="navbarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarMenu">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {navLinks.map(({ label, path }, index) => (
              <li key={index} className="nav-item">
                <Link className="nav-link position-relative text-light mx-2" to={path}>
                  {label}
                  <span className="nav-underline"></span>
                </Link>
              </li>
            ))}

            {/* Contact Us scroll */}
            <li className="nav-item">
              <button
                onClick={scrollToFooter}
                className="nav-link position-relative text-light mx-2 btn btn-link"
                style={{ textDecoration: 'none' }}
              >
                Contact Us
                <span className="nav-underline"></span>
              </button>
            </li>

            {/* Login / Dashboard */}
            <li className="nav-item">
              {isLoggedIn ? (
                <Link to="/dashboard" className="btn btn-outline-warning rounded-pill ms-3">
                  Dashboard
                </Link>
              ) : (
                <Link to="/login" className="btn btn-warning rounded-pill ms-3">
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <div
        className="bg-dark text-white text-center py-5"
        style={{ backgroundImage: 'url(https://res.cloudinary.com/dfs2sqkxy/image/upload/v1760813754/Banner_x2fafn.jpg)' }}
      >
        <h1 className="display-4 fw-bold text-warning">Arum Restaurant and Takeaway</h1>
        <Link to="/menu" className="btn btn-outline-warning mt-3">
          VIEW MENU
        </Link>
      </div>

      {/* Custom CSS */}
      <style>{`
        .nav-link {
          transition: color 0.3s ease;
        }
        .nav-link:hover {
          color: #ffc107;
        }
        .nav-underline {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0%;
          height: 2px;
          background-color: #ffc107;
          transition: width 0.3s ease;
        }
        .nav-link:hover .nav-underline {
          width: 100%;
        }
      `}</style>
    </header>
  );
};

export default Header;
