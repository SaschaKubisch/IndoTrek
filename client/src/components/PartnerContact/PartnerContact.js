import React, { useState, useEffect } from 'react';
import { getPartnerBookings, sendPartnerMessage } from '../../services/partner';
import BookingItem from '../BookingItem/BookingItem';
import MessageForm from '../MessageForm/MessageForm';

import './PartnerContact.css';

const PartnerContact = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [messageSent, setMessageSent] = useState(false);

  useEffect(() => {
    fetchPartnerBookings();
  }, []);

  const fetchPartnerBookings = async () => {
    try {
      const bookingsData = await getPartnerBookings();
      setBookings(bookingsData);
    } catch (error) {
      console.error('Error fetching partner bookings:', error);
      // Handle error (display error message, etc.)
    }
  };

  const handleBookingSelect = (booking) => {
    setSelectedBooking(booking);
  };

  const handleSendMessage = async (message) => {
    try {
      await sendPartnerMessage(selectedBooking._id, message);
      setMessageSent(true);
    } catch (error) {
      console.error('Error sending message:', error);
      // Handle error (display error message, etc.)
    }
  };

  return (
    <div className="partner-contact-container">
      <h2>Partner Contact</h2>
      {bookings.length > 0 ? (
        <>
          <ul className="booking-list">
            {bookings.map((booking) => (
              <BookingItem
                key={booking._id}
                booking={booking}
                onSelect={handleBookingSelect}
              />
            ))}
          </ul>
          {selectedBooking && (
            <div className="message-form-container">
              <h3>Send Message to Customer</h3>
              <MessageForm
                onSendMessage={handleSendMessage}
                messageSent={messageSent}
              />
            </div>
          )}
        </>
      ) : (
        <p>No bookings available.</p>
      )}
    </div>
  );
};

export default PartnerContact;
