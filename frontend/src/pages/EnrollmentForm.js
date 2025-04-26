import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import '../styles/EnrollmentForm.css';


const EnrollmentForm = () => {
  const { id } = useParams();  // Get the client ID from the URL
  const [client, setClient] = useState(null);
  const [selectedPrograms, setSelectedPrograms] = useState([]);

  // Fetch client data for enrollment
  useEffect(() => {
    const fetchClient = async () => {
      const response = await fetch(`/api/clients/${id}`);
      const data = await response.json();
      setClient(data);
    };
    fetchClient();
  }, [id]);

  // Handle program selection
  const handleProgramChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedPrograms((prev) => [...prev, value]);
    } else {
      setSelectedPrograms((prev) => prev.filter((program) => program !== value));
    }
  };

  // Submit the enrollment
  const handleSubmit = async (e) => {
    e.preventDefault();
    const enrollmentData = { programs: selectedPrograms };
    // Make API call to enroll the client in the selected programs
    await fetch(`/api/enroll/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(enrollmentData),
    });
    alert("Client enrolled successfully!");
  };

  return (
    <div>
      {client ? (
        <div>
          <h2>Enroll {client.name} in Programs</h2>
          <form onSubmit={handleSubmit}>
            <label>
              <input 
                type="checkbox" 
                value="Malaria" 
                onChange={handleProgramChange}
              />
              Malaria
            </label>
            <br />
            <label>
              <input 
                type="checkbox" 
                value="HIV" 
                onChange={handleProgramChange}
              />
              HIV
            </label>
            <br />
            <label>
              <input 
                type="checkbox" 
                value="TB" 
                onChange={handleProgramChange}
              />
              TB
            </label>
            <br />
            <button type="submit">Enroll</button>
          </form>
        </div>
      ) : (
        <p>Loading client information...</p>
      )}
    </div>
  );
};

export default EnrollmentForm;
