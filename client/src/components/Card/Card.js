import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

const Card = ({ title, image, description }) => {
  return (
    <div className="card">
      {image && <img src={image} alt={title} className="card-image" />}
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
  description: PropTypes.string.isRequired,
};

export default Card;
