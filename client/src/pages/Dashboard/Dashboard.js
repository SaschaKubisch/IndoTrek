import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './dashboard.css'; // Import the CSS file

const Dashboard = () => {
  const [bookedTrips, setBookedTrips] = useState([]);

  useEffect(() => {
    // Fetch booked trips data from the server
    axios.get('/api/bookings')
      .then(response => {
        setBookedTrips(response.data);
      })
      .catch(error => {
        console.error('Error fetching booked trips:', error);
      });
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <h3>Booked Trips:</h3>
      <ul>
        {bookedTrips.map(trip => (
          <li key={trip.id}>{trip.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
