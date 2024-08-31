import React, { useEffect, useState } from 'react';
import '../CSS/UserProfile.css';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../utils/CustomFetch';
import { StarRating } from '../Components/Turf/CommentItem';
import '../CSS/Turf/commentItemReview.css'
import RatingStars from '../utils/RatingStar';
import PlayerRadarChart from '../utils/RadarChart';
import LineChartElement from '../utils/LineChart';

const UserProfile = () => {
  const { id } = useParams();
  const [currMetr,setCurrMetr] = useState({
    overall:{},
    curr:{}

  })
  const [user, setUser] = useState({
    user_details: {},
    groups: { my_groups: [], groups_in: [] },
    booking: [],
    payment: []
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosInstance(`/user/${id}/profile/`);
        const currmetr = await axiosInstance(`/analysis/player/${id}/current-performance-metrics/`);
        const overmetr = await axiosInstance(`/analysis/player/${id}/overall-performance-rating/`);
        if (response.status === 200 && currmetr.status === 200) {
          setUser(response.data);
          setCurrMetr({
            ...currMetr,
            curr:currmetr.data,
            overall:overmetr.data
          });
          console.log(response.data);
          console.log(currmetr);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [id]);

  return (
    <div className="user-profile">
      <div className="user-profile__header">
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/${user.user_details.profile_pic}`}
          alt={`${user.user_details.name}'s profile`}
          className="user-profile__pic"
        />
        <div className="user-profile__info">
          <h1 className="user-profile__name">{user.user_details.name}</h1>
          <p className="user-profile__email">{user.user_details.email}</p>
          <p className="user-profile__location">{user.user_details.location}</p>
        </div>
      </div>

     {
         <div className="user-profile__groups-section">
         <h3 className="user-profile__section-title">Current Player Metrics</h3>
             <div className="user-profile__group">
               <h4 className="user-profile__group-name">Dribble : <RatingStars rating={currMetr?.curr?.avg_dribble}/></h4>
               <h4 className="user-profile__group-name">Shoot : <RatingStars rating={currMetr?.curr?.avg_shoot}/></h4>
               <h4 className="user-profile__group-name">Pass Accuracy : <RatingStars rating={currMetr?.curr?.avg_pass_acuracy}/></h4>
               <h4 className="user-profile__group-name">Defence : <RatingStars rating={currMetr?.curr?.avg_defence}/></h4>
               
             </div>
       </div>
     }


            <div className="user-profile__radar-section">
            <h3 className="user-profile__section-title">Overall Player Metrics</h3>
                <div className="user-radar-section_chart" style={{justifySelf:"center"}}>
                 <PlayerRadarChart  data={currMetr.overall}/>
                 <LineChartElement id={id}/>
                </div>
          </div>
        
     


      <div className="user-profile__details">
        <h2 className="user-profile__section-title">Groups</h2>
        <div className="user-profile__groups">
          <div className="user-profile__groups-section">
            <h3 className="user-profile__section-title">My Groups</h3>
            {user.groups.my_groups.length > 0 ? (
              user.groups.my_groups.map(group => (
                <div key={group.id} className="user-profile__group">
                  <h4 className="user-profile__group-name">{group.group_name}</h4>
                  <p className="user-profile__group-info">Required Players: {group.req_players}</p>
                  <p className="user-profile__group-info">Time Slot: {group.slot_details}</p>
                </div>
              ))
            ) : (
              <p>No groups found.</p>
            )}
          </div>




          

          <div className="user-profile__groups-section">
            <h3 className="user-profile__section-title">Groups In</h3>
            {user.groups.groups_in.length > 0 ? (
              user.groups.groups_in.map(group => (
                <div key={group.id} className="user-profile__group">
                  <h4 className="user-profile__group-name">{group.group_name}</h4>
                  <p className="user-profile__group-info">Required Players: {group.req_players}</p>
                  <p className="user-profile__group-info">Time Slot: {group.slot_details}</p>
                </div>
              ))
            ) : (
              <p>No groups found.</p>
            )}
          </div>
        </div>

        <h2 className="user-profile__section-title">Bookings</h2>
        <div className="user-profile__bookings">
          {user.booking.length > 0 ? (
            user.booking.map(booking => (
              <div key={booking.id} className="user-profile__booking">
                <h4 className="user-profile__booking-title">Turf Name: {booking.turf_name}</h4>
                <p className="user-profile__booking-info">Price: {booking.total_amount}</p>
                <p className="user-profile__booking-info">Date: {booking.date}</p>
                <p className="user-profile__booking-info">Time Slot: {booking.slot_details}</p>
              </div>
            ))
          ) : (
            <p>No bookings found.</p>
          )}
        </div>

        <h2 className="user-profile__section-title">Payments</h2>
        <div className="user-profile__payments">
          {user.payment.length > 0 ? (
            user.payment.map(payment => (
              <div key={payment.id} className="user-profile__payment">
                <h4 className="user-profile__payment-title">Payment ID: {payment.id}</h4>
                <p className="user-profile__payment-info">Amount: ${payment.amount}</p>
                <p className="user-profile__payment-info">Date: {payment.date}</p>
              </div>
            ))
          ) : (
            <p>No payments found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
