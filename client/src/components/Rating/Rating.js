import React from 'react';
import PropTypes from 'prop-types';
import './Rating.css';

const Rating = ({ value, max }) => {
  const stars = Array.from({ length: max }, (_, index) => index + 1);

  return (
    <div className="rating">
      {stars.map((star) => (
        <span
          key={star}
          className={`rating-star${star <= value ? ' active' : ''}`}
          aria-label={`Rating ${star} out of ${max}`}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
};

export default Rating;
