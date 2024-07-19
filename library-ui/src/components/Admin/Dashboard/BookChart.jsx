import React, { useState, useEffect } from 'react';
import Chart from "react-apexcharts";
import axios from 'axios';

const BookChart = () => {
  const [chartData, setChartData] = useState({
    options: {
      xaxis: {
        type: 'category',
      },
      plotOptions: {
        bar: {
          distributed: true
        }
      }
    },
    series: []
  });

  useEffect(() => {
    const fetchBookGenres = async () => {
      try {
        const response = await axios.get('http://localhost:6868/api/books/genres');
        const genres = response.data;

        const bookCounts = await Promise.all(
          genres.map(async (genres) => {
            const genreResponse = await axios.post('http://localhost:6868/api/books/genre', { genres });
            return {
              x: genres,
              y: genreResponse.data.length
            };
          })
        );

        setChartData({
          options: {
            xaxis: {
              type: 'category',
            },
            plotOptions: {
              bar: {
                distributed: true
              }
            }
          },
          series: [
            {
              data: bookCounts
            }
          ]
        });
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };

    fetchBookGenres();
  }, []);

  return (
    <div>
      <Chart
          style={
            {
              margin: '0 auto',
              marginTop: '60px',
              display: 'block',
              width: '800px',
              height: '600px'
            }  
          }
        height={800}
        width={1500}
        options={chartData.options}
        series={chartData.series}
        type="bar"
      />
      
    </div>
    
  );
};

export default BookChart;