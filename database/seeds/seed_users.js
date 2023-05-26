const User = require('../models/User');

const users = [
  {
    username: 'john123',
    email: 'john@example.com',
    password: 'password123',
  },
  {
    username: 'jane456',
    email: 'jane@example.com',
    password: 'password456',
  },
  // Add more user objects as needed
];

const seedUsers = async () => {
  try {
    await User.deleteMany(); // Clear existing users
    const createdUsers = await User.insertMany(users); // Insert new users
    console.log('Users seeded successfully:', createdUsers);
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};

module.exports = seedUsers;
