const Booking = require('../models/Booking');
const Trip = require('../models/Trip');

// Get all bookings for a specific user
const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.userId }).populate('trip');
    res.json(bookings);
  } catch (error) {
    console.error('Error getting user bookings', error);
    res.status(500).json({ error: 'Failed to get user bookings' });
  }
};

// Create a new booking
const createBooking = async (req, res) => {
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
      user: req.userId,
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

    res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
  } catch (error) {
    console.error('Error creating booking', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
};

// Update an existing booking
const updateBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { startDate, endDate, transportation, accommodations, additionalServices } = req.body;

    // Find the booking by ID
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Update the booking
    booking.startDate = startDate;
    booking.endDate = endDate;
    booking.transportation = transportation;
    booking.accommodations = accommodations;
    booking.additionalServices = additionalServices;

    await booking.save();

    res.json({ message: 'Booking updated successfully', booking });
  } catch (error) {
    console.error('Error updating booking', error);
    res.status(500).json({ error: 'Failed to update booking' });
  }
};

module.exports = {
  getUserBookings,
  createBooking,
  updateBooking,
};
