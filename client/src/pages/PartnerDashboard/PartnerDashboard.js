import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './partnerDashboard.css'; // Import the CSS file

const PartnerDashboard = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch bookings from the server
    const fetchBookings = async () => {
      try {
        const response = await axios.get('/api/bookings');
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="partner-dashboard">
      <h2>Partner Dashboard</h2>
      <h3>Upcoming Bookings</h3>
      {bookings.length > 0 ? (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id}>
              <div>Booking ID: {booking.id}</div>
              <div>Customer: {booking.customerName}</div>
              <div>Date: {booking.date}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No upcoming bookings</p>
      )}
    </div>
  );
};

export default PartnerDashboard;
