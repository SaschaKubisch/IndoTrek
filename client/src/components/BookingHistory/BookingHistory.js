import React, { useState, useEffect } from 'react';
import { getUserBookingHistory } from '../../services/booking';

import './BookingHistory.css';

const BookingHistory = () => {
  const [bookingHistory, setBookingHistory] = useState([]);

  useEffect(() => {
    fetchBookingHistory();
  }, []);

  const fetchBookingHistory = async () => {
    try {
      const userBookingHistory = await getUserBookingHistory();
      setBookingHistory(userBookingHistory);
    } catch (error) {
      console.error('Error fetching booking history:', error);
      // Handle error (display error message, etc.)
    }
  };

  return (
    <div className="booking-history-container">
      <h2>Booking History</h2>
      <div className="booking-list">
        {bookingHistory.map((booking) => (
          <div key={booking.id} className="booking-item">
            <h3>{booking.tripName}</h3>
            <p>Booking ID: {booking.bookingId}</p>
            <p>Date: {booking.date}</p>
            <p>Price: {booking.price}</p>
            <p>Status: {booking.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingHistory;
