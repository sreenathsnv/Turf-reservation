import React from 'react';
import '../../CSS/Turf/StarRating.css'

const StarRating = ({ onRatingChange }) => {
  return (
    <div className="star-rating">
      <input type="radio" id="star5" name="rating" value="5" onChange={() => onRatingChange(5)} />
      <label htmlFor="star5" title="5 stars"></label>
      <input type="radio" id="star4" name="rating" value="4" onChange={() => onRatingChange(4)} />
      <label htmlFor="star4" title="4 stars"></label>
      <input type="radio" id="star3" name="rating" value="3" onChange={() => onRatingChange(3)} />
      <label htmlFor="star3" title="3 stars"></label>
      <input type="radio" id="star2" name="rating" value="2" onChange={() => onRatingChange(2)} />
      <label htmlFor="star2" title="2 stars"></label>
      <input type="radio" id="star1" name="rating" value="1" onChange={() => onRatingChange(1)} />
      <label htmlFor="star1" title="1 star"></label>
    </div>
  );
};


export default StarRating