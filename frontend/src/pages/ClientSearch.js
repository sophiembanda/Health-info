import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/ClientSearch.css";
import { fetchData } from "../utils/api";

const ClientSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load all clients when component mounts
  useEffect(() => {
    loadClients();
  }, []);

  // Function to fetch all clients
  const loadClients = async () => {
    try {
      setLoading(true);
      const data = await fetchData('/api/clients/');
      setClients(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching clients:', err);
      setError('Failed to load clients. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Function to handle search
  const handleSearch = async () => {
    try {
      setLoading(true);
      const data = await fetchData(`/api/clients/?search=${searchTerm}`);
      setClients(data);
      setError(null);
    } catch (err) {
      console.error('Error searching clients:', err);
      setError('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="client-search-container">
      <h2 className="client-search-title">Client Management</h2>
      <div className="client-search-form">
        <input 
          type="text"
          className="client-search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by client name"
        />
        <button 
          className="client-search-button"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div className="client-search-results">
        {loading ? (
          <p className="client-search-loading">Loading clients...</p>
        ) : error ? (
          <p className="client-search-error">{error}</p>
        ) : clients.length > 0 ? (
          <div>
            <h3 className="client-list-header">All Clients ({clients.length})</h3>
            <ul className="client-list">
              {clients.map(client => (
                <li key={client.id} className="client-list-item">
                  <Link to={`/client/${client.id}`} className="client-list-link">
                    <span className="client-name">{client.name}</span>
                    <div className="client-details">
                      <span>Email: {client.email}</span>
                      <span>Phone: {client.phone}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="client-search-no-results">No clients found</p>
        )}
      </div>
    </div>
  );
};

export default ClientSearch;
