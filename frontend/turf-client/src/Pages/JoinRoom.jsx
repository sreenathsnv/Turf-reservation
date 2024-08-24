import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/Home/Joinroom.css'; // Import the CSS file for styling

const JoinPlayRoom = () => {
  const [plays, setPlays] = useState([]);
  const [jwtToken, setJwtToken] = useState(''); // Get JWT token from your auth context or state

  useEffect(() => {
    // Fetch available plays
    axios.get('groups/{group_id}/join/', {
      headers: {
        'Authorization': `JWT ${jwtToken}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      setPlays(response.data);
    })
    .catch(error => console.error('Error fetching plays:', error));
  }, [jwtToken]);

  const handleJoinPlay = (groupId) => {
    axios.post(`/groups/${groupId}/join/`, {}, {
      headers: {
        'Authorization': `JWT ${jwtToken}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log('Joined play successfully:', response.data);
      // Update plays list or show a success message
    })
    .catch(error => {
      if (error.response.status === 400) {
        alert('User already exists.');
      } else {
        console.error('Error joining play:', error);
      }
    });
  };

  return (
    <main>
      <div className="container">
        <h2>Plays Available to Join</h2>
        <div id="play-list">
          {plays.map(play => (
            <div key={play.id} className="play-card">
              <h3>{play.group_name}</h3>
              <p><strong>Players Required:</strong> {play.req_players}</p>
              <p><strong>Time Slot:</strong> {new Date(play.time_slot).toLocaleString()}</p>
              <button className="join-button" onClick={() => handleJoinPlay(play.id)}>Join</button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default JoinPlayRoom;
