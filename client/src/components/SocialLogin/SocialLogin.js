import React from 'react';
import { loginWithGoogle, loginWithFacebook } from '../../services/auth';

import './SocialLogin.css';

const SocialLogin = () => {
  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      // Handle successful login or redirect to a specific page
    } catch (error) {
      console.error('Error logging in with Google:', error);
      // Handle error (display error message, etc.)
    }
  };

  const handleFacebookLogin = async () => {
    try {
      await loginWithFacebook();
      // Handle successful login or redirect to a specific page
    } catch (error) {
      console.error('Error logging in with Facebook:', error);
      // Handle error (display error message, etc.)
    }
  };

  return (
    <div className="social-login-container">
      <h2>Sign in with</h2>
      <div className="social-login-buttons">
        <button className="google-login-button" onClick={handleGoogleLogin}>
          <i className="fab fa-google"></i> Google
        </button>
        <button className="facebook-login-button" onClick={handleFacebookLogin}>
          <i className="fab fa-facebook"></i> Facebook
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
