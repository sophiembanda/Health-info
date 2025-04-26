import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  // Check if user is logged in by looking for token in localStorage
  const isLoggedIn = localStorage.getItem('token') !== null;
  
  return (
    <div className="home-container">
      <h1>Welcome to the Health Information System</h1>
      <p>A comprehensive solution for managing health programs and client information</p>
      
      {isLoggedIn ? (
        <div className="dashboard">
          <p>You are logged in. Use the navigation menu to access the system features.</p>
          <div className="quick-links">
            <h3>Quick Links</h3>
            <div className="link-buttons">
              <Link to="/create-program" className="link-button">Create Program</Link>
              <Link to="/register-client" className="link-button">Register Client</Link>
              <Link to="/search-client" className="link-button">Search Clients</Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="login-prompt">
          <p>Please log in or sign up to access the system.</p>
          <div className="auth-buttons">
            <Link to="/login" className="auth-button login">Login</Link>
            <Link to="/signup" className="auth-button signup">Sign Up</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
