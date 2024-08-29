import React, { useEffect, useState } from "react";
import "../CSS/Booking/BookingForm.css";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../utils/CustomFetch";
import { convertTimeToHHMM } from "../utils/formatTime";
import { Bounce, toast } from "react-toastify";
function BookingForm() {
  const { id } = useParams();

  const [turfData, setTurfData] = useState();
  const [slots, setSlots] = useState([]);
  const navigate = useNavigate();
  const [bookingLoading, setBookingLoading] = useState(false);

  const [formData, setFormData] = useState({
    date: "",
  });

  useEffect(() => {
    async function fetchTurfDetails() {
      const response = await axiosInstance.get(`turf/${id}/view/`);
      // console.log(response.data)
      setTurfData(response.data.turf_data);
      setSlots(response.data.slots_info);
    }

    fetchTurfDetails();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      turf: id,
      total_amount: turfData.price,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBookingLoading(true);
    try {
      const response = await axiosInstance.post("/turf/book/", formData);
  
      const book_id = response.data.data?.id;
  
      if (response.status === 201) {
        setFormData({
          date: "",
        });
  
        setTimeout(() => {
          toast.info("Wait a second", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
  
          toast.info("You will be redirected to payment!", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
  
          navigate(`/turf/${book_id}/payment`, { replace: true });
        }, 1000);
      }
    } catch (error) {
      
      toast.error(
        error.response?.data?.error || "Error Booking", 
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        }
      );
    } finally {
      setBookingLoading(false);
    }
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
          <label htmlFor="date" className="form-label">
            Date of Booking
          </label>
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
          <label htmlFor="time" className="form-label">
            Time Slot
          </label>
          <select
            id="time"
            name="time_slot"
            value={formData.time_slot}
            onChange={handleChange}
            required
            className="form-select"
          >
            <option value={" "}>Choose slot</option>
            {slots.map((slot, index) => (
              <option key={index} value={slot.id}>
                {convertTimeToHHMM(slot.start_time)}-
                {convertTimeToHHMM(slot.end_time)}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="booking-submit-btn">
          {!bookingLoading ? "Confirm Booking" : "Booking..."}
        </button>
      </form>
    </section>
  );
}

export default BookingForm;
