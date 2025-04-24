import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProgramForm from './components/ProgramForm';
import ClientForm from './components/ClientForm';
import EnrollmentForm from './components/EnrollmentForm';
import ClientSearch from './components/ClientSearch';
import ClientProfile from './components/ClientProfile';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/create-program">Create Program</Link></li>
            <li><Link to="/register-client">Register Client</Link></li>
            <li><Link to="/enroll-client">Enroll Client</Link></li>
            <li><Link to="/search-client">Search Clients</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<h2>Welcome to the Health Info System</h2>} />
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
