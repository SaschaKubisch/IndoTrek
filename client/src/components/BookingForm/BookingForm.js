import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createBooking } from '../../services/booking';

import './BookingForm.css';

const BookingForm = ({ tripId }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    participants: 1,
  });

  const history = useHistory();

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createBooking(tripId, formData);
      history.push('/dashboard/bookings');
    } catch (error) {
      console.error('Error creating booking:', error);
      // Handle error (display error message, redirect, etc.)
    }
  };

  return (
    <div className="booking-form-container">
      <h2>Book this trip</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />

        <label htmlFor="date">Date</label>
        <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} />

        <label htmlFor="participants">Participants</label>
        <input
          type="number"
          id="participants"
          name="participants"
          value={formData.participants}
          onChange={handleChange}
        />

        <button type="submit">Book Now</button>
      </form>
    </div>
  );
};

export default BookingForm;
