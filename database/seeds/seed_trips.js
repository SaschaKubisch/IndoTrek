const Trip = require('../models/Trip');

const trips = [
  {
    title: 'Nature Trekking Adventure',
    location: 'Mountain Range',
    duration: 5,
    description: 'Experience the breathtaking beauty of the Mountain Range with our guided nature trekking adventure.',
    price: 199.99,
    availableSlots: 10,
    // Add more trip fields as needed
  },
  {
    title: 'Cultural Heritage Tour',
    location: 'Historical City',
    duration: 3,
    description: 'Immerse yourself in the rich cultural heritage of the Historical City with our guided tour.',
    price: 149.99,
    availableSlots: 8,
    // Add more trip fields as needed
  },
  // Add more trip objects as needed
];

const seedTrips = async () => {
  try {
    await Trip.deleteMany(); // Clear existing trips
    const createdTrips = await Trip.insertMany(trips); // Insert new trips
    console.log('Trips seeded successfully:', createdTrips);
  } catch (error) {
    console.error('Error seeding trips:', error);
  }
};

module.exports = seedTrips;
