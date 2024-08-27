import React, { useEffect, useState } from "react";
import "../CSS/Booking/BookingForm.css";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../utils/CustomFetch";

function BookingForm() {
  const { id } = useParams();

  const [turfData,setTurfData] = useState()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "morning",
  });


  useEffect(()=>{

    async function fetchTurfDetails () {
      
      const response = await axiosInstance.get(`turf/${id}/view/`)
      console.log(response.data.turf_data)
      setTurfData(response.data.turf_data)


    }
    fetchTurfDetails()

  },[])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement form submission logic here
    console.log("Booking data submitted:", formData);
  };

  return (
  
      <section id="turf-booking-form">
        <h2>Book Your Turf</h2>
        <form id="turf-booking-form " onSubmit={handleSubmit}>
          <div className="booking-display-group">
            <div className="display-item">
              <span className="display-label">Turf Name:</span>
              <span className="display-value">{turfData?.turf_name}</span>
            </div>
            <div className="display-item">
              <span className="display-label">City:</span>
              <span className="display-value">{turfData?.city}</span>
            </div>
            <div className="display-item">
              <span className="display-label">State:</span>
              <span className="display-value">{turfData?.state}</span>
            </div>
            <div className="display-item">
              <span className="display-label">Zip Code:</span>
              <span className="display-value">{turfData?.zipcode}</span>
            </div>
            <div className="display-item">
              <span className="display-label">Price:</span>
              <span className="display-value">₹{turfData?.price}</span>
            </div>
          </div>
          <div className="booking-form-group">
            <label htmlFor="date" className="form-label">Date of Booking</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="booking-form-group">
            <label htmlFor="time" className="form-label">Time Slot</label>
            <select
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="form-select"
            >
              <option value="morning">Morning (8 AM - 12 PM)</option>
              <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
              <option value="evening">Evening (4 PM - 8 PM)</option>
            </select>
          </div>
          <button type="submit" className="booking-submit-btn">
            Confirm Booking
          </button>
        </form>
      </section>

  );
}

export default BookingForm;
