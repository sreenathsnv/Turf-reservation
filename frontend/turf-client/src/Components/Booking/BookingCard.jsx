import React from 'react';
import '../../CSS/Booking/BookingCard.css'

const BookingCard = ({ booking, onCancel }) => {
  const handleCancel = () => {
    if (onCancel) {
      onCancel(booking.id);
    }
  };

  return (
    <div className="booking-card">
      <div className="booking-card__info">
        <h3 className="booking-card__title">Booking ID: {booking.id}</h3>
        <p className="booking-card__detail">Turf Name: {booking.turf_name}</p>
        <p className="booking-card__detail">Total Amount: ${booking.total_amount}</p>
        <p className={`booking-card__status booking-card__status--${booking.status.toLowerCase()}`}>
          Status: {booking.status}
        </p>
      </div>
      <button className="booking-card__cancel-button" onClick={handleCancel}>
        Cancel Booking
      </button>
    </div>
  );
};

export default BookingCard;
