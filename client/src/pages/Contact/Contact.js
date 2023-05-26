import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact">
      <h1 className="contact-title">Contact Us</h1>
      <p className="contact-description">
        If you have any questions or inquiries, please feel free to reach out to us using the contact information below:
      </p>
      <ul className="contact-info">
        <li>Email: info@example.com</li>
        <li>Phone: +1234567890</li>
        <li>Address: 123 Street, City, Country</li>
      </ul>
    </div>
  );
};

export default Contact;
