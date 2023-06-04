import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { resetPassword } from '../../services/auth';

import './ResetPasswordForm.css';

const ResetPasswordForm = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
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
      const { email, password } = formData;
      await resetPassword(email, password);
      history.push('/dashboard'); // Redirect to the user's dashboard after successful password reset
    } catch (error) {
      console.error('Error resetting password:', error);
      // Handle error (display error message, show validation errors, etc.)
    }
  };

  return (
    <div className="reset-password-form-container">
      <h2>Reset Password</h2>
      <form className="reset-password-form" onSubmit={handleSubmit}>
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
          placeholder="New Password"
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
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
