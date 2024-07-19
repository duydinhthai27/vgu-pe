// PrivateRoute.js
import { useState, useEffect } from 'react';
import { Route, Navigate } from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = ({ element: Element, roles = [], ...rest }) => {
  const [role, setUser] = useState('');
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    // Fetch user data from the backend
    const fetchUserData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get("http://localhost:6868/api/user/info", {
            headers: {
              "x-access-token": accessToken,
            }});
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);


  return (
    loading ? (
      <div>Loading...</div>
    ) : roles.includes(role.role) ? (
      <Element {...rest} />
    ) : (
      <Navigate to="/" />
    )
  );
};

export default PrivateRoute;