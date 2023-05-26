// bookingRoutes.js

const express = require('express');
const router = express.Router();

const Booking = require('../models/Booking');
const Trip = require('../models/Trip');
const { requireAuth } = require('../middleware/auth');

// Get all bookings
router.get('/', requireAuth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate('trip');
    res.json(bookings);
  } catch (error) {
    console.error('Error getting bookings', error);
    res.status(500).json({ error: 'Failed to get bookings' });
  }
});

// Create a new booking
router.post('/', requireAuth, async (req, res) => {
  try {
    const { tripId, startDate, endDate, transportation, accommodations, additionalServices } = req.body;

    // Check if the trip exists
    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    // Check if the trip has available slots
    if (trip.availableSlots <= 0) {
      return res.status(409).json({ error: 'No available slots for this trip' });
    }

    // Create a new booking
    const newBooking = new Booking({
      user: req.user._id,
      trip: tripId,
      startDate,
      endDate,
      transportation,
      accommodations,
      additionalServices,
      totalPrice: trip.price,
    });

    await newBooking.save();

    // Update the available slots for the trip
    trip.availableSlots -= 1;
    await trip.save();

    res.status(201).json({ message: 'Booking created successfully' });
  } catch (error) {
    console.error('Error creating booking', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

module.exports = router;
