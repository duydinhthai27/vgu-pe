import React, { useEffect, useState } from "react";
import UserProfile from "./UserProfile.js";

const UP = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem('accessToken');
    fetch("http://localhost:6868/api/user/info", {
      headers: {
        'x-access-token': accessToken // Add the authorization header if needed
      }
    })
    .then(response => response.json())
    .then(data => {
      const transformedData = {
        name: data.username,
        email: data.email,
        lname: data.lname,
        fname: data.fname,
        ID: data.id,
        role: data.role,
        address: data.address,
        borrowedBooks: data.borrowedBooks || [], // assuming borrowedBooks is an array
      };
      setUser(transformedData);
    })
    .catch(error => console.error('Error fetching user:', error));
  }, []);

  return (
    <div className="UP">
      {user ? <UserProfile user={user} /> : <p>Loading...</p>}
    </div>
  );
};

export default UP;
