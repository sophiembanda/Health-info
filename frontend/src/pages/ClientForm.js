import React, { useState } from 'react';
import '../styles/ClientForm.css';

const ClientForm = () => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const client = { name, dob, contact, address };
    // Send this to the backend later
    console.log('Client registered:', client);
    alert('Client registered (check console for details)!');
  };

  return (
    <div className="form-container">
      <h2>Register Client</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Client Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contact Information:</label>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register Client</button>
      </form>
    </div>
  );
};

export default ClientForm;
