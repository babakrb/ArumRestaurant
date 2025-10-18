import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AboutUs from './pages/AboutUs';
import Home from './pages/HomePage'; // your homepage component
import LoginPage from './pages/LoginPage'; // your login page component
import SignupForm from './pages/SignupForm'; // your signup form component
import Dashboard from './pages/Dashboard';
import OurMenu from './components/OurMenu';
import MenuManager from './components/MenuManager';
import { GoogleOAuthProvider } from '@react-oauth/google';


 


function App() {
  return (
    <GoogleOAuthProvider clientId="824927727403-rahcipcb9o41av68hi4m2noh6j9oc925.apps.googleusercontent.com">
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/menu" element={<OurMenu />} />
        <Route path="/menu-manager" element={<MenuManager />} />
      </Routes>
      <a name="ftr"></a>
      <Footer id="ftr" />
    </Router>
    </GoogleOAuthProvider>
  );
}

export default App;