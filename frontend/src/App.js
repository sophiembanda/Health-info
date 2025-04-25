import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProgramForm from './pages/ProgramForm';
import ClientForm from './pages/ClientForm';
import EnrollmentForm from './pages/EnrollmentForm';
import ClientSearch from './pages/ClientSearch';
import ClientProfile from './pages/ClientProfile';
import Login from './pages/Login';
import Signup from './pages/Signup';


function App() {
  return (
    <Router>
      <div>
        <nav className='navbar'>
        <h1 className='logo'>Health Info System</h1>
        <ul className='nav-links'>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
            <li><Link to="/create-program">Create Program</Link></li>
            <li><Link to="/register-client">Register Client</Link></li>
            <li><Link to="/enroll-client">Enroll Client</Link></li>
            <li><Link to="/search-client">Search Clients</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<h2>Welcome to the Health Info System</h2>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/create-program" element={<ProgramForm />} />
          <Route path="/register-client" element={<ClientForm />} />
          <Route path="/enroll-client" element={<EnrollmentForm />} />
          <Route path="/search-client" element={<ClientSearch />} />
          <Route path="/client/:id" element={<ClientProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
