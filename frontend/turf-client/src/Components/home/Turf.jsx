import React from "react";
import "../../CSS/Turf/turfcard.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';


const formatTime = (time) => {
  let [hours, minutes] = time.split(":");

  hours = parseInt(hours, 10);

  return `${hours}:${minutes}`;
};
const Turf = ({ props }) => {
  return (
    <div class="turf-card">
      <div class="turf-image">
        <img src="/turfimage.jpg" alt="Turf Image" />
      </div>
      <div class="turf-info">
        <h3 class="turf-name">{props.turf_name}</h3>
        <p class="turf-location">
          <FontAwesomeIcon
            icon={faMapMarkerAlt}
            style={{ color: "#2f7500", marginRight:'1vw'}}
          />
          {props.city}
        </p>
        <p class="turf-phone">
          <a href="tel:{props.phone}">
            <i class="phone-icon"></i> {props.phone}
          </a>
        </p>
        <p className="turf-phone">
          <a href={`tel:${props.phone}`}>
            <FontAwesomeIcon icon={faPhone} style={{ marginRight: '0.5vw' }} />
            {props.phone}
          </a>
        </p>
        <p className="turf-time">
          {props.is_open? (
            <span style={{ color: 'green' }}>Open Now</span>
          ) : (
            <span style={{ color: 'red' }}>Closed</span>
          )}
          <br />
          Open: {formatTime(props.open_time)} AM - Close: {formatTime(props.close_time)} PM
        </p>
        <p class="turf-city">{props.state}</p>
        <p class="turf-zipcode">Zipcode: {props.zipcode}</p>
        <p class="turf-price">₹{props.price}</p>
        <button class="book-now-btn">Book Now</button>
      </div>
    </div>
  );
};

export default Turf;
