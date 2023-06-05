const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET, JWT_EXPIRES_IN, JWT_RESET_PASSWORD_SECRET, JWT_RESET_PASSWORD_EXPIRES_IN } = require('../config/auth');
const { sendResetPasswordEmail } = require('../config/email');

// User registration
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'User with this email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
};

// User login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the provided password matches the stored password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate and send the JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.json({ token });
  } catch (error) {
    console.error('Error logging in', error);
    res.status(500).json({ error: 'Failed to log in' });
  }
};

// Password reset request
const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate and send the password reset token
    const resetToken = jwt.sign({ userId: user._id }, JWT_RESET_PASSWORD_SECRET, { expiresIn: JWT_RESET_PASSWORD_EXPIRES_IN });
    await user.updateOne({ resetToken });

    // Send the password reset email
    const resetPasswordLink = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
    await sendResetPasswordEmail(user.email, resetPasswordLink);

    res.json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error('Error requesting password reset', error);
    res.status(500).json({ error: 'Failed to request password reset' });
  }
};

// Password reset
const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    // Verify and decode the reset token
    const decodedToken = jwt.verify(token, JWT_RESET_PASSWORD_SECRET);

    // Find the user by ID and check if the token matches
    const user = await User.findOne({ _id: decodedToken.userId, resetToken: token });
    if (!user) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password and reset token
    await user.updateOne({ password: hashedPassword, resetToken: null });

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Error resetting password', error);
    res.status(500).json({ error: 'Failed to reset password' });
  }
};

// User authentication middleware
const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  // Verify the JWT token
  jwt.verify(token, JWT_SECRET, (error, decodedToken) => {
    if (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Set the authenticated user ID in the request object
    req.userId = decodedToken.userId;
    next();
  });
};

module.exports = {
  register,
  login,
  requestPasswordReset,
  resetPassword,
  authenticateUser,
};
