import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import ProgramForm from './pages/ProgramForm';
import ClientForm from './pages/ClientForm';
import EnrollmentForm from './pages/EnrollmentForm';
import ClientSearch from './pages/ClientSearch';
import ClientProfile from './pages/ClientProfile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';

// Protected Route component to handle authentication
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token') !== null;
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    setIsLoggedIn(token !== null);
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div>
        <nav className='navbar'>
          <h1 className='logo'>Health Info System</h1>
          <ul className='nav-links'>
            <li><Link to="/">Home</Link></li>
            
            {isLoggedIn ? (
              // Show these links only when logged in
              <>
                <li><Link to="/create-program">Create Program</Link></li>
                <li><Link to="/register-client">Register Client</Link></li>
                <li><Link to="/search-client">Search Clients</Link></li>
                <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
              </>
            ) : (
              // Show these links only when logged out
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Signup</Link></li>
              </>
            )}
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected routes */}
          <Route path="/create-program" element={
            <ProtectedRoute>
              <ProgramForm />
            </ProtectedRoute>
          } />
          <Route path="/register-client" element={
            <ProtectedRoute>
              <ClientForm />
            </ProtectedRoute>
          } />
          <Route path="/client/:id/enroll" element={
            <ProtectedRoute>
              <EnrollmentForm />
            </ProtectedRoute>
          } />
          <Route path="/search-client" element={
            <ProtectedRoute>
              <ClientSearch />
            </ProtectedRoute>
          } />
          <Route path="/client/:id" element={
            <ProtectedRoute>
              <ClientProfile />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
