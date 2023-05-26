const Booking = require('../models/Booking');

const bookings = [
  {
    user: 'user1', // Replace with actual user ID
    trip: 'trip1', // Replace with actual trip ID
    startDate: new Date(),
    endDate: new Date(),
    // Add more booking fields as needed
  },
  {
    user: 'user2', // Replace with actual user ID
    trip: 'trip2', // Replace with actual trip ID
    startDate: new Date(),
    endDate: new Date(),
    // Add more booking fields as needed
  },
  // Add more booking objects as needed
];

const seedBookings = async () => {
  try {
    await Booking.deleteMany(); // Clear existing bookings
    const createdBookings = await Booking.insertMany(bookings); // Insert new bookings
    console.log('Bookings seeded successfully:', createdBookings);
  } catch (error) {
    console.error('Error seeding bookings:', error);
  }
};

module.exports = seedBookings;
