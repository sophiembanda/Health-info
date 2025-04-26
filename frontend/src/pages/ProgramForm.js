import React, { useState } from "react";
import '../styles/ProgramForm.css';
import { fetchData } from "../utils/api";

const ProgramForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    const program = { name, description };

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/programs/create/', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify(program),
      });

      if (!response.ok) {
        throw new Error('Failed to create program');
      }
      
      setSuccess(true);
      // Clear form
      setName("");
      setDescription("");
    } catch (err) {
      console.error('Error creating program:', err);
      setError('Failed to create program. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="program-form-container">
      <h2 className="program-form-title">Create Health Program</h2>
      
      {success && (
        <div className="program-form-success">
          Program created successfully!
        </div>
      )}
      
      {error && (
        <div className="program-form-error">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="program-form">
        <div className="program-form-field">
          <label className="program-form-label">
            Program Name:
            <input
              type="text"
              className="program-form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}
            />
          </label>
        </div>
        <div className="program-form-field">
          <label className="program-form-label">
            Description:
            <textarea
              className="program-form-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              disabled={loading}
            />
          </label>
        </div>
        <button 
          type="submit" 
          className="program-form-button"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Program'}
        </button>
      </form>
    </div>
  );
};

export default ProgramForm;
