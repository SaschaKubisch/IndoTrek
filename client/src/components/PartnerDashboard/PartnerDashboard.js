import React, { useState, useEffect } from 'react';
import { getBookings, updateBookingStatus } from '../../services/partner';
import BookingItem from '../BookingItem/BookingItem';

import './PartnerDashboard.css';

const PartnerDashboard = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const bookingsData = await getBookings();
      setBookings(bookingsData);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      // Handle error (display error message, etc.)
    }
  };

  const handleUpdateStatus = async (bookingId, newStatus) => {
    try {
      await updateBookingStatus(bookingId, newStatus);
      fetchBookings();
      alert('Booking status updated successfully!');
    } catch (error) {
      console.error('Error updating booking status:', error);
      // Handle error (display error message, etc.)
    }
  };

  return (
    <div className="partner-dashboard-container">
      <h2>Partner Dashboard</h2>
      {bookings.length > 0 ? (
        <ul className="booking-list">
          {bookings.map((booking) => (
            <BookingItem
              key={booking._id}
              booking={booking}
              onUpdateStatus={handleUpdateStatus}
            />
          ))}
        </ul>
      ) : (
        <p>No bookings available.</p>
      )}
    </div>
  );
};

export default PartnerDashboard;
