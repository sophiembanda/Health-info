import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/ClientProfile.css";  // Import CSS for styling

const ClientProfile = () => {
  const { id } = useParams();  // Get the client ID from the URL
  const [client, setClient] = useState(null);

  // Fetch client data based on the ID
  useEffect(() => {
    const fetchClient = async () => {
      const response = await fetch(`/api/clients/${id}`);
      const data = await response.json();
      setClient(data);
    };
    fetchClient();
  }, [id]);

  return (
    <div>
      {client ? (
        <div>
          <h2>Client Profile: {client.name}</h2>
          <p><strong>ID:</strong> {client.id}</p>
          <p><strong>Age:</strong> {client.age}</p>
          <p><strong>Gender:</strong> {client.gender}</p>
          <h3>Enrolled Programs</h3>
          <ul>
            {client.programs && client.programs.length > 0 ? (
              client.programs.map((program, index) => (
                <li key={index}>{program}</li>
              ))
            ) : (
              <p>No programs enrolled</p>
            )}
          </ul>
        </div>
      ) : (
        <p>Loading client information...</p>
      )}
    </div>
  );
};

export default ClientProfile;
