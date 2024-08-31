import React, { useEffect, useState } from "react";
import MemberList from "../Components/group/MemberList";
import CommentsSection from "../Components/group/CommentsSection";
import "../CSS/Group.css";
import {  useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import {toast,Bounce} from 'react-toastify'
import { axiosInstance } from "../utils/CustomFetch";
import Loader from "../Components/Loader";

const GroupActivity = () => {
  const {user} = useAuth()
  const { id } = useParams();
  const [groupData, setGroupData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const navigate = useNavigate()

  const leaveGroup = async ()=>{

    const response = await axiosInstance.delete(`/groups/${id}/leave/`)

    if (response.status == 200){

      toast.success("You left", {
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
      navigate('/user/groups')
    }else{

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
    
  }
  const joinGroup = async ()=>{

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
        try {
          
          const response = await axiosInstance.get(`/groups/${id}`);
          setGroupData(response.data);
          
  
        } catch (error) {
          toast.error("Please go to group section", {
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
          
  
        } finally {
          setLoading(false);
          
        }
        
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

      toast.error(`Error Occured! `, {
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
  useEffect(() => {
    async function fetchData() {
      try {
        console.log('Fetching data for group ID:', id);
        const response = await axiosInstance.get(`/groups/${id}`);
        setGroupData(response.data);
        console.log(response.data);

      } catch (error) {
        console.error("Failed to fetch data:", error);
        

      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchData();
    }
  }, [id,refresh]);

  if( loading){return <Loader/>;}

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
                <strong>Date:</strong>{" "}
                <span className="slot-details">{groupInfo.date || 'N/A'}</span>
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
          
          <MemberList members={groupData?.player_info || []} 
          isGroupAdmin={groupData?.is_admin}
           is_member={groupData?.is_member}
           currentUser = {user.id}
           bookingDate = {groupData?.group_info.date}
            slotTime = {groupData?.group_info.slot_details}
            groupId ={id}
            setRefresh={setRefresh}
            refresh={refresh}
             />
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

