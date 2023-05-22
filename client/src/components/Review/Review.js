import React from 'react';
import PropTypes from 'prop-types';
import './Review.css';

const Review = ({ author, content, rating }) => {
  return (
    <div className="review">
      <div className="review-header">
        <span className="review-author">{author}</span>
        <span className="review-rating">{rating}</span>
      </div>
      <p className="review-content">{content}</p>
    </div>
  );
};

Review.propTypes = {
  author: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
};

export default Review;
