import React, { useEffect, useState } from 'react';
import '../../CSS/JoinPlay.css';
import GroupCard from './GroupCard';

import {axiosInstance} from '../../utils/CustomFetch'


const GroupList = () => {
  
  const [plays,setPlays] = useState([])
  const [groupnum,setGroupNum] = useState(5)
  const [refresh,setRefresh] = useState(false)
  const [search,setSearch] = useState("")


  const loadGroups = () => {
    setGroupNum(groupnum + 5);
  };

  const handleSearch = () => {
    if (search === "") {
      

      setRefresh(!refresh);
    } else {
      let searchedItems = plays?.filter(
        (play) =>
          play.group_name
            .toLowerCase().includes(search.toString().toLowerCase().trim()))
            setPlays(searchedItems);
    }
  };

  const refreshComponent = () => {
    setSearch("");
    setRefresh(!refresh);
  };

  useEffect(()=>{

    async function getDetails(){

      const response = await axiosInstance.get('/get-all-rooms/')

      const filtered_group = response.data.filter((group)=> group.is_member !== true)
      console.log(filtered_group)
      setPlays(filtered_group)

    }
    getDetails()
  },[refresh])

  

  return (
    <div className="join-play">
      <main className="main">
        <div className="main-container">
          <h2 className="main-title">{plays.length >0 ? "Game Rooms Available":" No available rooms"}</h2>
          <div className="search">
          <button className="refresh-btn" onClick={refreshComponent}>
            <span className="icon"></span>
          </button>
          <input
            placeholder="Search groups by name"
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              handleSearch();
            }}
          />
        </div>
          <div className="play-list">
            {plays.map((play,index) => {
             return index <= groupnum && <GroupCard key={index} play = {play}/> 
})}
          </div>
        </div>
        {plays.length>3 && <button className="load-more-btn" onClick={loadGroups}>Load More</button>}
      </main>
    </div>
  );
};

export default GroupList;
