import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makePayment } from '../../services/payment';

import './PaymentForm.css';

const PaymentForm = ({ amount, currency }) => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    name: '',
    email: '',
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
      await makePayment(amount, currency, formData);
      history.push('/dashboard/bookings');
    } catch (error) {
      console.error('Error making payment:', error);
      // Handle error (display error message, redirect, etc.)
    }
  };

  return (
    <div className="payment-form-container">
      <h2>Make a Payment</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="cardNumber">Card Number</label>
        <input
          type="text"
          id="cardNumber"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleChange}
        />

        <label htmlFor="expirationDate">Expiration Date</label>
        <input
          type="text"
          id="expirationDate"
          name="expirationDate"
          value={formData.expirationDate}
          onChange={handleChange}
        />

        <label htmlFor="cvv">CVV</label>
        <input type="text" id="cvv" name="cvv" value={formData.cvv} onChange={handleChange} />

        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />

        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
};

export default PaymentForm;
