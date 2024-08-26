import React, { useEffect, useState } from "react";
import {axiosInstance} from '../../utils/CustomFetch'
import UserGroupCard from "./UserGroupCard";
const UserGroupList = () => {
  const [plays, setPlays] = useState([]);
  const [groupnum, setGroupNum] = useState(5);

  const loadGroups = () => {
    setGroupNum(groupnum + 5);
  };
  useEffect(() => {
    async function getDetails() {
      const response = await axiosInstance.get("/groups/");
      console.log(response.data);
      setPlays(response.data);
    }
    getDetails();
  }, []);

  return (
    <div className="join-play">
      <main className="main">
        <div className="main-container">
          <h2 className="main-title">My Game Rooms</h2>
          <div className="play-list">
            {plays.map((play, index) => {
              return index <= groupnum && <UserGroupCard key={index} play={play} />;
            })}
          </div>
        </div>
        {plays.length>3 && <button className="load-more-btn" onClick={loadGroups}>
          Load More
        </button>}
      </main>
    </div>
  );
};

export default UserGroupList;
