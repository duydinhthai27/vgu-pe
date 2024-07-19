import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FeedbackTable.css'; // Import the CSS file

const GoogleSheetTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace the following variables with your own values
        const spreadsheetId = '1WmmBaM9bh9GmmCFS4mJZiqN44jq65wdlqpAw5zjfr3Q';
        const sheetName = '2054256030';
        const apiKey = 'AIzaSyCG0K74Rlw8hiZw4nKCOX8gsj0quM2b06I';

        const response = await axios.get(
          `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}?key=${apiKey}`
        );

        // Assuming the data in the sheet has the following structure:
        // Timestamp,Name,Email,Your Feedback,Your Rating on Our Services
        setData(response.data.values.slice(1)); // Skip the header row
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <table className="google-sheet-table">
      <thead>
        <tr>
          <th>Timestamp</th>
          <th>Name</th>
          <th>Email</th>
          <th>Your Feedback</th>
          <th>Your Rating on Our Services</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{row[0]}</td>
            <td>{row[1]}</td>
            <td>{row[2]}</td>
            <td>{row[3]}</td>
            <td>{row[4]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GoogleSheetTable;