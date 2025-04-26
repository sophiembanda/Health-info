import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/ClientProfile.css";

const ClientProfile = () => {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [removing, setRemoving] = useState(false);

  // Fetch client data and enrollments
  useEffect(() => {
    const fetchClientData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        };

        // Fetch client details
        const response = await fetch(`/api/clients/${id}/`, { headers });
        if (!response.ok) {
          throw new Error('Failed to fetch client details');
        }
        const data = await response.json();
        setClient(data);
        
        if (data.enrollments) {
          setEnrollments(data.enrollments);
        } else {
        }
        
        setError(null);
      } catch (err) {
        console.error('Error:', err);
        setError('Failed to load client information');
      } finally {
        setLoading(false);
      }
    };

    fetchClientData();
  }, [id]);

  // Handle removing a client from a program
  const handleRemoveFromProgram = async (programId) => {
    if (!window.confirm('Are you sure you want to remove this client from the program?')) {
      return;
    }
    
    try {
      setRemoving(true);
      const token = localStorage.getItem('token');
      
      const response = await fetch(`/api/enrollments/remove/${id}/${programId}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to remove client from program');
      }

      // Update the enrollments list by removing the deleted enrollment
      setEnrollments(enrollments.filter(enrollment => 
        enrollment.program.id !== programId
      ));
      
      alert('Client successfully removed from program');
    } catch (err) {
      console.error('Error:', err);
      alert('Failed to remove client from program');
    } finally {
      setRemoving(false);
    }
  };

  if (loading) {
    return <div className="client-profile">
      <p className="loading-message">Loading client information...</p>
    </div>;
  }

  if (error) {
    return <div className="client-profile">
      <p className="error-message">{error}</p>
    </div>;
  }

  return (
    <div className="client-profile">
      {client ? (
        <div>
          <h2>Client Profile: {client.name}</h2>
          <div className="client-details">
            <p><strong>ID:</strong> {client.id}</p>
            <p><strong>Date of Birth:</strong> {client.date_of_birth}</p>
            <p><strong>Gender:</strong> {client.gender}</p>
            <p><strong>Email:</strong> {client.email}</p>
            <p><strong>Phone:</strong> {client.phone}</p>
          </div>
          
          <h3>Enrolled Programs</h3>
          {enrollments && enrollments.length > 0 ? (
            <ul className="program-list">
              {enrollments.map((enrollment) => (
                <li key={enrollment.id || enrollment.program.id} className="program-item">
                  <div className="program-info">
                    <span className="program-name">{enrollment.program.name}</span>
                    <button 
                      className="remove-button"
                      onClick={() => handleRemoveFromProgram(enrollment.program.id)}
                      disabled={removing}
                    >
                      {removing ? 'Removing...' : 'Remove'}
                    </button>
                  </div>
                  <p className="program-description">{enrollment.program.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No programs enrolled</p>
          )}
          
          <div className="actions">
            <Link to={`/client/${id}/enroll`} className="action-button">
              Enroll in Program
            </Link>
          </div>
        </div>
      ) : (
        <p>Client not found</p>
      )}
    </div>
  );
};

export default ClientProfile;
