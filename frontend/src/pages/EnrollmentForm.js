import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import '../styles/EnrollmentForm.css';

const EnrollmentForm = () => {
  const { id } = useParams();  // Get the client ID from the URL
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [selectedPrograms, setSelectedPrograms] = useState([]); // Define selectedPrograms state
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Fetch client data and available programs
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        };

        // Fetch client details
        const clientResponse = await fetch(`/api/clients/${id}/`, { headers });
        if (!clientResponse.ok) {
          throw new Error('Failed to fetch client details');
        }
        const clientData = await clientResponse.json();
        setClient(clientData);
        
        // Fetch available programs
        const programsResponse = await fetch('/api/programs/', { headers });
        if (!programsResponse.ok) {
          throw new Error('Failed to fetch programs');
        }
        const programsData = await programsResponse.json();
        setPrograms(programsData);
        
        setError(null);
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to load client or program information');
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [id]);

  // Handle program selection - Define handleProgramChange function
  const handleProgramChange = (e) => {
    const { value, checked } = e.target;
    const programId = parseInt(value, 10);
    
    if (checked) {
      setSelectedPrograms(prev => [...prev, programId]);
    } else {
      setSelectedPrograms(prev => prev.filter(id => id !== programId));
    }
  };

  // Submit the enrollment
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (selectedPrograms.length === 0) {
      alert("Please select at least one program");
      return;
    }
    
    try {
      setSubmitting(true);
      setError(null);
      
      const token = localStorage.getItem('token');
      const enrollmentData = { 
        client: parseInt(id, 10), 
        programs: selectedPrograms 
      };
      
      const response = await fetch('/api/enrollments/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify(enrollmentData),
      });

      if (!response.ok) {
        throw new Error('Failed to enroll client');
      }
      
      alert("Client enrolled successfully!");
      navigate(`/client/${id}`);  // Redirect to client profile
    } catch (err) {
      console.error('Error enrolling client:', err);
      setError('Failed to enroll client in programs');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="enrollment-form">
      <p className="loading-message">Loading information...</p>
    </div>;
  }

  if (error) {
    return <div className="enrollment-form">
      <p className="error-message">{error}</p>
    </div>;
  }

  return (
    <div className="enrollment-form">
      {client ? (
        <div>
          <h2>Enroll {client.name} in Programs</h2>
          <form onSubmit={handleSubmit}>
            <div className="program-list">
              {programs.length > 0 ? (
                programs.map((program) => (
                  <div key={program.id} className="program-item">
                    <label>
                      <input 
                        type="checkbox" 
                        value={program.id} 
                        onChange={handleProgramChange}
                        disabled={submitting}
                      />
                      {program.name}
                    </label>
                    <p className="program-description">{program.description}</p>
                  </div>
                ))
              ) : (
                <p>No programs available</p>
              )}
            </div>
            <button 
              type="submit" 
              disabled={submitting || selectedPrograms.length === 0}
            >
              {submitting ? 'Enrolling...' : 'Enroll in Selected Programs'}
            </button>
          </form>
        </div>
      ) : (
        <p>Client not found</p>
      )}
    </div>
  );
};

export default EnrollmentForm;
