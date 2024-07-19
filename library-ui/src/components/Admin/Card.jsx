import React,  { useState, useEffect } from 'react';
import axios from 'axios';
const DashboardCards = () => {
  const [numUser, setNumUser]=useState('');
  const [numBooks, setNumBooks]=useState('');
  const [numGernes, setGernes]=useState('');
  const [numRent, setRent]=useState('');

  useEffect(()=>
    {
      const fetchUser = async()=>
        {
          try {
            const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          console.error('Access token not found in localStorage');
          return;
        }
        const response = await axios.get('http://localhost:6868/api/user/list', {
          headers: {
            'x-access-token': accessToken,
          },
        });
        setNumUser(response.data.length);
       
          }
          catch (error) {
            console.error('Error fetching card data:', error);
          }
        };
        fetchUser();
    }

  )
  useEffect(()=>
    {
      const fetchGenres = async()=>
        {
          try {
            const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          console.error('Access token not found in localStorage');
          return;
        }
        const response = await axios.get('http://localhost:6868/api/books', {
          headers: {
            'x-access-token': accessToken,
          },
        });
        setNumBooks(response.data.length);
       
          }
          catch (error) {
            console.error('Error fetching card data:', error);
          }
        };
        fetchGenres();
    }

  )
  useEffect(()=>
    {
      const fetchBook = async()=>
        {
          try {
            const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          console.error('Access token not found in localStorage');
          return;
        }
        const response = await axios.get('http://localhost:6868/api/books/genres');
        setGernes(response.data.length);
          }
          catch (error) {
            console.error('Error fetching card data:', error);
          }
        };
        fetchBook();
    }

  )

  useEffect(()=>
    {
      const fetchRent = async()=>
        {
          try {
            const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          console.error('Access token not found in localStorage');
          return;
        }
        const response = await axios.get('http://localhost:6868/api/books/genres');
        setRent(response.data.length);
          }
          catch (error) {
            console.error('Error fetching card data:', error);
          }
        };
        fetchRent();
    }

  )


  

  const cards = [
    {
      title: 'No. Users',
      value: numUser,
      color: '#4CAF50',
    },
    {
      title: 'No. Books',
      value: numBooks,
      color: '#2196F3',
    },
    {
      title: 'No. Gernes',
      value: numGernes,
      color: '#FF9800',
    },
    {
      title: 'No. Rental Checking',
      value: numRent,
      color: '#E91E63',
    },
  ];

  return (
    <div 
      style={{
        marginLeft: '14vw',
        marginTop: '-16vw',
        display: 'flex', // Use flex display for the container
        flexWrap: 'wrap', // Allow items to wrap to the next line
        justifyContent: 'space-around' // Distribute space around items
      }}
      className="dashboard-cards">
      {cards.map((card, index) => (
        <div
          key={index}
          className="dashboard-card"
          style={{
           
            width: '19%',
            borderTop: `100px solid ${card.color}`,
            
          }}
        >
          <div className="dashboard-card-content"
              style={{
                marginLeft: '0.4vw',
                marginTop: '-9vw',
              }}>
            <h3 
              style={
                {
                  fontSize: '1.5rem',
                  color: 'white',
                }
              }>{card.title}</h3>
            <p
              style={
                {
                  fontSize: '1.3rem',
                  color: 'white',
                }
              }
              >{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;