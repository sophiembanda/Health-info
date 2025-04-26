import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/ClientSearch.css";

const ClientSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [clients, setClients] = useState([]);

  // Function to handle search
  const handleSearch = async () => {
    const response = await fetch(`/api/clients?name=${searchTerm}`);
    const data = await response.json();
    setClients(data);
  };

  return (
    <div>
      <h2>Search for a Client</h2>
      <input 
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter client name"
      />
      <button onClick={handleSearch}>Search</button>

      {clients.length > 0 ? (
        <ul>
          {clients.map(client => (
            <li key={client.id}>
              <Link to={`/client/${client.id}`}>
                {client.name} (ID: {client.id})
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No clients found</p>
      )}
    </div>
  );
};

export default ClientSearch;
