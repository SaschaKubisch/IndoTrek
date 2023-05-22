import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Explore and Discover</h1>
        <p className="hero-description">
          Book your next adventure and immerse yourself in the wonders of nature and culture.
        </p>
        <button className="hero-button">Get Started</button>
      </div>
    </section>
  );
};

export default HeroSection;
