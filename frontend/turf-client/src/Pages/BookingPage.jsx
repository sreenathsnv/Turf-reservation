import React, { useState, useEffect } from 'react';

import BookingCard from '../Components/Booking/BookingCard';

import '../CSS/BookingPage.css'
import { axiosInstance } from '../utils/CustomFetch';

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axiosInstance.get('/user/bookings/'); // Adjust the URL as needed
        setBookings(response.data);
        console.log(response.data);
        
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="bookings-page">
      <h1 className='booking_page__heading'>Booking List</h1>
      <div className="booking-cards-container">
        {bookings?.length > 0 ? (
          bookings?.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))
        ) : (
          <p>No bookings available.</p>
        )}
      </div>
    </div>
  );
};

export default BookingsPage;
