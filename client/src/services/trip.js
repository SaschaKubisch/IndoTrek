// trip.js

import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // Replace with your API URL

// Get all trips
export const getAllTrips = async () => {
  try {
    const response = await axios.get(`${API_URL}/trips`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// Get trip details by ID
export const getTripById = async (tripId) => {
  try {
    const response = await axios.get(`${API_URL}/trips/${tripId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// Create a new trip
export const createTrip = async (tripData) => {
  try {
    const response = await axios.post(`${API_URL}/trips`, tripData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// Update trip details
export const updateTrip = async (tripId, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/trips/${tripId}`, updatedData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// Delete a trip
export const deleteTrip = async (tripId) => {
  try {
    const response = await axios.delete(`${API_URL}/trips/${tripId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// Search trips based on filters
export const searchTrips = async (filters) => {
  try {
    const response = await axios.post(`${API_URL}/trips/search`, filters);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
