// Utility function for making authenticated API requests
export const fetchData = async (url, options = {}) => {
    const token = localStorage.getItem('token');
    
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Token ${token}` } : {}),
      ...options.headers
    };
    
    const response = await fetch(url, {
      ...options,
      headers
    });
    
    if (!response.ok) {
      throw new Error('API request failed');
    }
    
    return response.json();
  };
  