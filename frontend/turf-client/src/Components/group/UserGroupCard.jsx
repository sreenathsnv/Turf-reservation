import React from 'react'
import { Link } from 'react-router-dom';

const UserGroupCard = ({play}) => {
    
    
      return (
        <div key={play.id} className="play-card">
          <h3 className="play-card-title">{play.group_name}</h3>
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
          <div className="play-card-buttons-user-group">
            <Link to={`/user/groups/${play.id}`}>
              <button className="play-card-button view-button view-button-user-group">View</button>
            </Link>
          </div>
        </div>
      );
    
}

export default UserGroupCard