import React, { useState, useEffect } from 'react';
import './UserTable.css'
import axios from 'axios';

const UserTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async (accessToken) => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          console.error('Access token not found in localStorage');
          return;
        }
        const response = await axios.get('http://localhost:6868/api/user/list', {
          headers: {
            'x-access-token': accessToken
          }
        });
        
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Username </th>
          <th>Email </th>
          <th>Verified </th>
          <th>Phone Number </th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.isVerified ? 'Yes' : 'No'}</td>
            <td>{user.phoneNumber || 'N/A'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;