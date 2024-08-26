import React from 'react';


const MemberList = ({props}) => {
  return (
    <ul className="member-list">
      {props?.map((member, index) => (
        <li key={index} className="member-item">
          <img src={`${import.meta.env.VITE_BACKEND_URL}${member.profile_pic}`} alt="Avatar" />
          {member.username}
        </li>
      ))}
    </ul>
  );
};

export default MemberList;
