import React, { useState, useEffect } from 'react';
import { getUserBookings } from '../../services/booking';

import './UserDashboard.css';

const UserDashboard = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchUserBookings();
  }, []);

  const fetchUserBookings = async () => {
    try {
      const userBookings = await getUserBookings();
      setBookings(userBookings);
    } catch (error) {
      console.error('Error fetching user bookings:', error);
      // Handle error (display error message, etc.)
    }
  };

  return (
    <div className="user-dashboard-container">
      <h2>My Bookings</h2>
      <div className="booking-list">
        {bookings.map((booking) => (
          <div key={booking.id} className="booking-item">
            <h3>{booking.tripName}</h3>
            <p>Booking ID: {booking.bookingId}</p>
            <p>Date: {booking.date}</p>
            <p>Price: {booking.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
