import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {toast,Bounce} from 'react-toastify'
import { axiosInstance } from "../../utils/CustomFetch";
const GroupCard = ({ play }) => {


  const navigate = useNavigate()

  const joinGroup = async (id)=>{

    try{
      const response = await axiosInstance.post(`/groups/${id}/join/`)
      if (response.status == 200){

        toast.success("joined successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
        navigate(`/groups/${id}`)
      } 
      else{
        toast.error(`Error! ${response.data.error}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
    }catch(error){

      toast.error(`Error Occured! ${error} `, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
    
  }

  return (
    <div key={play.id} className="play-card">
      <h3 className="play-card-title">{play.name}</h3>
      <div className="play-card-detail">
        <span className="detail-label">Turf:</span>
        <span className="detail-value turf-name">{play.turf}</span>
      </div>
      <div className="play-card-detail">
        <span className="detail-label">Location:</span>
        <span className="detail-value">{play.location}</span>
      </div>
      <div className="play-card-detail">
        <span className="detail-label">Players Needed:</span>
        <span className="detail-value">{play.req_players}</span>
      </div>
      <div className="play-card-detail">
        <span className="detail-label">Slot:</span>
        <span className="detail-value">{play.slot_details}</span>
      </div>
      {/* <div className="play-card-detail">
        <span className="detail-label">Created By:</span>
        <span className="detail-value">{play.createdBy}</span>
      </div> */}
      <div className="play-card-buttons">
        <button
          className="play-card-button join-card-button"
          onClick={() => joinGroup(play.id)}
        >
          Join
        </button>
        <Link to={`/groups/${play.id}`}>
          <button className="play-card-button view-button">View</button>
        </Link>
      </div>
    </div>
  );
};

export default GroupCard;
