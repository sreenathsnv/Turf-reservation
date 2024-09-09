import React, { useState } from "react";
import FeedbackModal from "../ReviewModal";
import { axiosInstance } from "../../utils/CustomFetch";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const MemberList = ({
  members,
  is_member,
  bookingDate,
  slotTime,
  isGroupAdmin,
  currentUser,
  groupId,
  setRefresh,
  refresh
}) => {
  


  const [isModalOpen,setIsModalOpen] = useState(false)
  const [CurrentReviewUser,setCurrentReviewUser] = useState()

  const onRequestClose = ()=>{setIsModalOpen(false)}

  const removeMember = async (id) => {
    try {
      const response = await axiosInstance.delete(`/groups/${groupId}/user/delete/`, {
        data: { user: id }
      });
  
      console.log(response);  // Log response to debug
  
      if (response.status >= 200 && response.status < 300) {
        toast.info("User Removed", {
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
        setRefresh(!refresh)
      } else {
        toast.warn("Unexpected response", {
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
    } catch (error) {
      console.error(error);  // Log error to debug
      toast.error("Error removing user", {
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
  };
  
  const shouldShowReviewButton = (bookingDate, slotTime) => {
    const currentDateTime = new Date().getUTCDate();
    const currentTime = new Date().getTime();
    const bookingDateTime = new Date(bookingDate).getUTCDate();
    const slot_date_data = new Date(bookingDate);
    const { hh, mm, ss } = slotTime?.split(":").reduce((acc, time, idx) => {
      if (idx === 0) acc.hh = Number(time);
      if (idx === 1) acc.mm = Number(time);
      if (idx === 2) acc.ss = Number(time);
      return acc;
    }, {});

    const slotTime_n = new Date(
      slot_date_data.getFullYear(),
      slot_date_data.getMonth(),
      hh,
      mm,
      ss
    ).getTime();
    // console.log(
    //   "cdate",
    //   currentDateTime,
    //   "bdate",
    //   bookingDateTime,
    //   "curretime",
    //   currentTime,
    //   "dltimr",
    //   slotTime_n,
    //   currentDateTime >= bookingDateTime
    // );

    return currentDateTime >= bookingDateTime && slotTime_n <= currentTime;
  };

  return (
    <>
    <FeedbackModal isOpen ={isModalOpen} onRequestClose = {onRequestClose} user={CurrentReviewUser}/>
      <ul className="member-list">
        {members?.map((member, index) => (
        <li key={index} className="member-item">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}${member.profile_pic}`}
              alt="Avatar"
            />
            <Link style={{textDecoration:"none"}} to={`/user/${member.id}/profile`}>{member.username}</Link> 
            {isGroupAdmin && currentUser !== member.id ? (
              <div className="admin-controls">
                <button className="remove-button" onClick={()=>{removeMember(member.id)}}>Remove</button>
                {shouldShowReviewButton(bookingDate, slotTime) && is_member && (
                  <button className="review-button">Review</button>
                )}
              </div>
            ) : (
              shouldShowReviewButton(bookingDate, slotTime) &&
              is_member &&
              currentUser !== member.id && (
                <div className="admin-controls">
                  <button className="review-button" onClick={()=>{setIsModalOpen(true); setCurrentReviewUser(member)}}>Review</button>
                </div>
              )
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default MemberList;
