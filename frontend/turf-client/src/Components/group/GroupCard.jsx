import React from "react";
import { Link } from "react-router-dom";

const GroupCard = ({ play }) => {
  const handleJoin = (play) => {
    alert(`You have joined "${play.name}".`);
  };

  const handleView = (play) => {
    alert(`Viewing details of "${play.name}".`);
  };

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
          className="play-card-button join-button"
          onClick={() => handleJoin(play)}
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
