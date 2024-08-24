import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../CSS/Home/Group"; // Assuming you have a separate CSS file for styling

const Group = () => {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [loading, setLoading] = useState(false);

  const jwtToken = "YOUR_JWT_TOKEN_HERE"; // Replace with your actual JWT token

  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/groups/', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${jwtToken}`
          }
        });
        setGroups(response.data);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
      setLoading(false);
    };

    fetchGroups();
  }, []);

  const fetchGroupDetails = async (groupId) => {
    setLoading(true);
    try {
      const response = await axios.get(`/groups/${groupId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${jwtToken}`
        }
      });
      setSelectedGroup(response.data);
    } catch (error) {
      console.error('Error fetching group details:', error);
    }
    setLoading(false);
  };

  return (
    <main>
      <div className="container">
        <h2>Available Game Rooms</h2>
        {loading && <p>Loading...</p>}
        <div className="group-list">
          {groups.map(group => (
            <div
              key={group.id}
              className="group-card"
              onClick={() => fetchGroupDetails(group.id)}
            >
              <h3>{group.group_name}</h3>
              <p>Required Players: {group.req_players}</p>
              <p>Time Slot: {new Date(group.time_slot).toLocaleString()}</p>
            </div>
          ))}
        </div>

        {selectedGroup && (
          <div className="group-details">
            <h2>{selectedGroup.group_info.group_name}</h2>
            <p>Group ID: {selectedGroup.group_info.id}</p>
            <p>Required Players: {selectedGroup.group_info.req_players}</p>
            <p>Time Slot: {new Date(selectedGroup.group_info.time_slot).toLocaleString()}</p>
            <p>Group Admin: {selectedGroup.group_info.group_admin}</p>
            <p>Players: {selectedGroup.group_info.players.join(', ')}</p>
            <h3>Player Details:</h3>
            <ul>
              {selectedGroup.player_info.map(player => (
                <li key={player.id}>{player.name} ({player.username})</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
};

export default Group;
