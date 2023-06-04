import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { registerUser } from '../../services/auth';

import './RegistrationForm.css';

const RegistrationForm = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, email, password } = formData;
      await registerUser(name, email, password);
      history.push('/dashboard'); // Redirect to the user's dashboard after successful registration
    } catch (error) {
      console.error('Error registering user:', error);
      // Handle error (display error message, show validation errors, etc.)
    }
  };

  return (
    <div className="registration-form-container">
      <h2>Register</h2>
      <form className="registration-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
