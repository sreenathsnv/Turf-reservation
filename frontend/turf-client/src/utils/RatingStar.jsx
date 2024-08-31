import React from 'react';
import '../CSS/RatingStars.css'; // Assuming you will have CSS for styling the stars

const RatingStars = ({ rating }) => {
  const totalStars = 5;
  const filledStars = Math.round(rating); // Rounding to the nearest whole number

  return (
    <div className="rating-stars">
      {[...Array(totalStars)].map((_, index) => (
        <span
          key={index}
          className={`rating-stars__star ${index < filledStars ? 'rating-stars__star--filled' : ''}`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default RatingStars;
