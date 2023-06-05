import React, { useState, useEffect } from 'react';
import { getUpcomingBookings } from '../../services/user';
import BookingItem from '../BookingItem/BookingItem';

import './UpcomingBookings.css';

const UpcomingBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchUpcomingBookings();
  }, []);

  const fetchUpcomingBookings = async () => {
    try {
      const bookingsData = await getUpcomingBookings();
      setBookings(bookingsData);
    } catch (error) {
      console.error('Error fetching upcoming bookings:', error);
      // Handle error (display error message, etc.)
    }
  };

  return (
    <div className="upcoming-bookings-container">
      <h2>Upcoming Bookings</h2>
      {bookings.length > 0 ? (
        <ul className="booking-list">
          {bookings.map((booking) => (
            <BookingItem key={booking._id} booking={booking} />
          ))}
        </ul>
      ) : (
        <p>No upcoming bookings.</p>
      )}
    </div>
  );
};

export default UpcomingBookings;
