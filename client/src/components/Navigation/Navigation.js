import React from 'react';
import './Navigation.css';

const Navigation = () => {
  return (
    <nav className="navigation">
      <ul className="navigation-list">
        <li className="navigation-item">
          <a href="/">Home</a>
        </li>
        <li className="navigation-item">
          <a href="/explore">Explore</a>
        </li>
        <li className="navigation-item">
          <a href="/about">About</a>
        </li>
        <li className="navigation-item">
          <a href="/contact">Contact</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
