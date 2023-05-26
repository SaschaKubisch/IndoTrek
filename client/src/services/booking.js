// booking.js

import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // Replace with your API URL

// Create a new booking
export const createBooking = async (tripId, startDate, endDate, options) => {
  try {
    const response = await axios.post(`${API_URL}/bookings`, { tripId, startDate, endDate, options });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// Get bookings for a specific user
export const getUserBookings = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}/bookings`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// Get booking details by booking ID
export const getBookingById = async (bookingId) => {
  try {
    const response = await axios.get(`${API_URL}/bookings/${bookingId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// Update booking details
export const updateBooking = async (bookingId, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/bookings/${bookingId}`, updatedData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// Delete a booking
export const deleteBooking = async (bookingId) => {
  try {
    const response = await axios.delete(`${API_URL}/bookings/${bookingId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// Get available trips
export const getAvailableTrips = async () => {
  try {
    const response = await axios.get(`${API_URL}/trips/available`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
