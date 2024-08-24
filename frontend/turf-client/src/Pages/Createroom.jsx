import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import axios from 'axios';
import '../CSS/Home/Createroom.css'
=======
import '../CSS/Home/Createroom.css';
import { axiosInstance } from '../utils/CustomFetch';
>>>>>>> 1c0a814bf97e2ca0d0175543f704de7814af3443

const CreatePlayForm = () => {
  const [turfs, setTurfs] = useState([]);
  const [selectedTurf, setSelectedTurf] = useState('');
  const [numPlayers, setNumPlayers] = useState('');
  const [playDate, setPlayDate] = useState('');
  const [playTime, setPlayTime] = useState('');

  useEffect(() => {
    // Fetch turf data from API
<<<<<<< HEAD
    axios.get('/get-all-turfs/')
      .then(response => {
        setTurfs(response.data); // Adjust according to API response structure
=======
    axiosInstance.get('/get-all-turfs/')
      .then(response => {
        setTurfs(response.data);
>>>>>>> 1c0a814bf97e2ca0d0175543f704de7814af3443
      })
      .catch(error => console.error('Error fetching turfs:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
<<<<<<< HEAD
    const groupAdminId = 'fcdc93a3-b0db-45b3-8b76-bb70663ad7c1'; // Replace with actual user ID
=======
    const groupAdminId = 'fcdc93a3-b0db-45b3-8b76-bb70663ad7c1';
>>>>>>> 1c0a814bf97e2ca0d0175543f704de7814af3443
    const timeSlot = `${playDate}T${playTime}:00.000Z`;
    const requestData = {
      group_admin: groupAdminId,
      group_name: 'testgroup-1',
      req_players: numPlayers,
      time_slot: timeSlot,
<<<<<<< HEAD
      turf: selectedTurf
    };

    axios.post('/your-api-endpoint', requestData)
=======
      turf: selectedTurf,
    };

    axiosInstance.post('/your-api-endpoint', requestData)
>>>>>>> 1c0a814bf97e2ca0d0175543f704de7814af3443
      .then(response => {
        console.log('Play created successfully:', response.data);
      })
      .catch(error => console.error('Error creating play:', error));
  };

  return (
<<<<<<< HEAD
    <main>
      <div className="container">
        <form id="create-play-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="turf">Select Turf:</label>
            <select id="turf" name="turf" value={selectedTurf} onChange={(e) => setSelectedTurf(e.target.value)} required>
              <option value="">Select Turf</option>
              {turfs.map(turf => (
                <option key={turf.id} value={turf.id}>{turf.name}</option>
=======
    <div className="main">
      <div className="container">
        <form className="form" id="create-play-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label" htmlFor="turf">Select Turf:</label>
            <select
              className="select"
              id="turf"
              name="turf"
              value={selectedTurf}
              onChange={(e) => setSelectedTurf(e.target.value)}
              required
            >
              <option value="">Select Turf</option>
              {turfs.map((turf) => (
                <option key={turf.id} value={turf.id}>
                  {turf.name}
                </option>
>>>>>>> 1c0a814bf97e2ca0d0175543f704de7814af3443
              ))}
            </select>
          </div>
          <div className="form-group">
<<<<<<< HEAD
            <label htmlFor="players">Number of Players:</label>
            <input
=======
            <label className="label" htmlFor="players">Number of Players:</label>
            <input
              className="input-number"
>>>>>>> 1c0a814bf97e2ca0d0175543f704de7814af3443
              type="number"
              id="players"
              name="players"
              min="1"
              value={numPlayers}
              onChange={(e) => setNumPlayers(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
<<<<<<< HEAD
            <label htmlFor="date">Date of Play:</label>
            <input
=======
            <label className="label" htmlFor="date">Date of Play:</label>
            <input
              className="input-number"
>>>>>>> 1c0a814bf97e2ca0d0175543f704de7814af3443
              type="date"
              id="date"
              name="date"
              value={playDate}
              onChange={(e) => setPlayDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
<<<<<<< HEAD
            <label htmlFor="time">Time of Play:</label>
            <input
=======
            <label className="label" htmlFor="time">Time of Play:</label>
            <input
              className="input-time"
>>>>>>> 1c0a814bf97e2ca0d0175543f704de7814af3443
              type="time"
              id="time"
              name="time"
              value={playTime}
              onChange={(e) => setPlayTime(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="create-button">Create Play</button>
        </form>
      </div>
<<<<<<< HEAD
    </main>
=======
    </div>
>>>>>>> 1c0a814bf97e2ca0d0175543f704de7814af3443
  );
};

export default CreatePlayForm;
