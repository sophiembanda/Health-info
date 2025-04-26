import React, { useState } from 'react';
import '../styles/ClientForm.css';
import { fetchData } from '../utils/api';

const ClientForm = () => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    const client = { 
      name, 
      date_of_birth: dob, 
      gender, 
      email, 
      phone 
    };
    
    try {
      await fetchData('/api/clients/register/', {
        method: 'POST',
        body: JSON.stringify(client),
      });
      
      setSuccess(true);
      // Clear form
      setName('');
      setDob('');
      setGender('');
      setEmail('');
      setPhone('');
    } catch (err) {
      console.error('Error registering client:', err);
      setError('Failed to register client. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Register Client</h2>
      
      {success && (
        <div className="success-message">
          Client registered successfully!
        </div>
      )}
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Client Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div>
          <label>Gender:</label>
          <select 
            value={gender} 
            onChange={(e) => setGender(e.target.value)} 
            required
            disabled={loading}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register Client'}
        </button>
      </form>
    </div>
  );
};

export default ClientForm;
