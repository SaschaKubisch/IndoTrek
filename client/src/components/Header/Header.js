import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">Local Guides</h1>
        <nav className="header-nav">
          <ul className="header-nav-list">
            <li className="header-nav-item">Home</li>
            <li className="header-nav-item">Explore</li>
            <li className="header-nav-item">About</li>
            <li className="header-nav-item">Contact</li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
