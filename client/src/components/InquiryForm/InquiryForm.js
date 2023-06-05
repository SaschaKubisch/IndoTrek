import React, { useState } from 'react';
import { sendInquiry } from '../../services/communication';

import './InquiryForm.css';

const InquiryForm = ({ tripId }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await sendInquiry(tripId, formData);
      alert('Inquiry sent successfully!');
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      console.error('Error sending inquiry:', error);
      // Handle error (display error message, etc.)
    }
  };

  return (
    <div className="inquiry-form-container">
      <h2>Send Inquiry</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />

        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
        />

        <button type="submit">Send Inquiry</button>
      </form>
    </div>
  );
};

export default InquiryForm;
