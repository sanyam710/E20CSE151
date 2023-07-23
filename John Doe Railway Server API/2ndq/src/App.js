import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const API_URL = 'http://20.244.56.144:80/train/trains';
    const headers = {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTAxMDc5NzEsImNvbXBhbnlOYW1lIjoic2FtcCIsImNsaWVudElEIjoiODE0ZjAxNDktNGNjYi00MTM4LWJlYmItZjRkNDJhNWZhZWVhIiwib3duZXJOYW1lIjoiIiwib3duZXJFbWFpbCI6IiIsInJvbGxObyI6ImUyMGNzZTE1MSJ9.OYxDVPZYzrSGjL38EIe8U_uK6YN0MAiOV_QV5XI5hqg',
    };

    axios.get(API_URL, { headers })
      .then((response) => setData(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h2>All Trains</h2>
      <table>
        <thead>
          <tr>
            <th>Train Name</th>
            <th>Train Number</th>
            <th>Departure time hours</th>
            <th>Departure time Minutes</th>
            <th>Departure time Seconds</th>
            {/* <th>Train Number</th> */}
            <th>Seats available in sleeper</th>
            <th>Seats available in ac</th>
            <th>Price of sleeper</th>
            <th>price of ac</th>
            <th>Delayed</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.trainName}>
              <td>{row.trainName}</td>
              <td>{row.trainNumber}</td>
              <td>{row.departureTime.Hours}</td>
              <td>{row.departureTime.Minutes}</td>
              <td>{row.departureTime.Seconds}</td>
              {/* <td>{row.seatsAvailable.sleeper}</td> */}
              <td>{row.seatsAvailable.AC}</td>
              <td>{row.occupation}</td>
              <td>{row.price.sleeper}</td>
              <td>{row.price.AC}</td>
              <td>{row.delayedBy}</td>
              {/* <td>{row.occupation}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default MyComponent;
