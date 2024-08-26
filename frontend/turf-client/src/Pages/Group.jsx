import React, { useEffect, useState } from "react";
import MemberList from "../Components/group/MemberList";
import CommentsSection from "../Components/group/CommentsSection";
import "../CSS/Group.css";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../utils/CustomFetch";
import Loader from "../Components/Loader";

const GroupActivity = () => {
  const { id } = useParams();
  const [groupData, setGroupData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const leaveGroup = async ()=>{

    const response = await axiosInstance.delete(`/groups/${id}/leave/`)
    console.log(response.data,response.status)
  }
  const joinGroup = async ()=>{

    const response = await axiosInstance.post(`/groups/${id}/join/`)
    console.log(response.data,response.status)
  }
  useEffect(() => {
    async function fetchData() {
      try {
        console.log('Fetching data for group ID:', id);
        const response = await axiosInstance.get(`/groups/${id}`);
        setGroupData(response.data);
        console.log(response.data);

      } catch (error) {
        console.error("Failed to fetch data:", error);
        setError(error);

      } finally {
        setLoading(false);
        console.log(groupData?.is_member);
      }
    }

    if (id) {
      fetchData();
    }
  }, [id]);

  if( loading){return <Loader/>;}
  if (error) return <div>Error loading group data.</div>;

  // Ensure groupData and groupData.group_info are defined
  const groupInfo = groupData?.group_info || {};
  const isActive = groupInfo?.is_active ? "Active" : "Inactive";

  return (
    <div className="container-group">
      <div className="main-content">
        <div className="group-activity">
          <div className="card">
            <div className="card-header">Group Details</div>
            <div className="card-content">
              <p>
                <strong>Group Name:</strong>{" "}
                <span className="group-name">{groupInfo.group_name || 'N/A'}</span>
              </p>
              <p>
                <strong>Location:</strong>{" "}
                <span className="location">{groupInfo.location || 'N/A'}</span>
              </p>
              <p>
                <strong>Required Players:</strong>{" "}
                <span className="req-players">{groupInfo.req_players || 'N/A'}</span>
              </p>
              <p>
                <strong>Slot Details:</strong>{" "}
                <span className="slot-details">{groupInfo.slot_details || 'N/A'}</span>
              </p>
              <p>
                <strong>Turf:</strong>{" "}
                <span className="turf">{groupInfo.turf || 'N/A'}</span>
              </p>
            </div>
            <div className="card-footer">
              <span className="status">{isActive}</span>
              
              <div className="membership-info">
                {
                
                groupData?.is_member ? (
                  <button onClick={leaveGroup} className="leave-button">Leave Group</button>
                ) : (
                  <button onClick={joinGroup} className="join-button">Join Group</button>
                )}
              </div>
            </div>
          </div>
          
          <MemberList props={groupData?.player_info || []} />
          <CommentsSection
            group={groupData?.id}
            is_member={groupData?.is_member}
            id={id}
          />
        </div>
      </div>
    </div>
  );
};

export default GroupActivity;
