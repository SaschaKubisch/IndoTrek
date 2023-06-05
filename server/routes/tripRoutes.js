const express = require('express');
const router = express.Router();

const Trip = require('../models/Trip');
const { requireAuth } = require('../middleware/auth');

// Get all trips
router.get('/', async (req, res) => {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (error) {
    console.error('Error getting trips', error);
    res.status(500).json({ error: 'Failed to get trips' });
  }
});

// Get a single trip by ID
router.get('/:id', async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }
    res.json(trip);
  } catch (error) {
    console.error('Error getting trip', error);
    res.status(500).json({ error: 'Failed to get trip' });
  }
});

// Create a new trip
router.post('/', requireAuth, async (req, res) => {
  try {
    const { title, description, duration, location, activityType, price, availableSlots, startDate, endDate } = req.body;

    // Create a new trip
    const newTrip = new Trip({
      title,
      description,
      duration,
      location,
      activityType,
      price,
      availableSlots,
      startDate,
      endDate,
    });

    await newTrip.save();

    res.status(201).json({ message: 'Trip created successfully', trip: newTrip });
  } catch (error) {
    console.error('Error creating trip', error);
    res.status(500).json({ error: 'Failed to create trip' });
  }
});

// Update an existing trip
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const { title, description, duration, location, activityType, price, availableSlots, startDate, endDate } = req.body;

    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    trip.title = title;
    trip.description = description;
    trip.duration = duration;
    trip.location = location;
    trip.activityType = activityType;
    trip.price = price;
    trip.availableSlots = availableSlots;
    trip.startDate = startDate;
    trip.endDate = endDate;

    await trip.save();

    res.json({ message: 'Trip updated successfully', trip });
  } catch (error) {
    console.error('Error updating trip', error);
    res.status(500).json({ error: 'Failed to update trip' });
  }
});

// Delete a trip
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const trip = await Trip.findByIdAndDelete(req.params.id);
    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }
    res.json({ message: 'Trip deleted successfully' });
  } catch (error) {
    console.error('Error deleting trip', error);
    res.status(500).json({ error: 'Failed to delete trip' });
  }
});

module.exports = router;
