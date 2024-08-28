import React, { useState, useEffect } from 'react';
import '../CSS/Home/Createroom.css';
import { axiosInstance } from '../utils/CustomFetch';

const CreatePlayForm = () => {
  const [turfs, setTurfs] = useState([]);
  const [selectedTurf, setSelectedTurf] = useState('');
  const [numPlayers, setNumPlayers] = useState('');
  const [playDate, setPlayDate] = useState('');
  const [playTime, setPlayTime] = useState('');

  useEffect(() => {
    // Fetch turf data from API
    axiosInstance.get('/get-all-turfs/')
      .then(response => {
        setTurfs(response.data);
      })
      .catch(error => console.error('Error fetching turfs:', error));
  }, []);

  const handleSubmit = (e) => {
    // e.preventDefault();
    // axiosInstance.post('/your-api-endpoint', requestData)
    //   .then(response => {
    //     console.log('Play created successfully:', response.data);
    //   })
    //   .catch(error => console.error('Error creating play:', error));
  };

  return (
    <div className="main-container">
      <div className="form-container">
        <form className="create-play-form" id="create-play-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="turf">Select Turf:</label>
            <select
              className="form-select"
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
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="players">Number of Players:</label>
            <input
              className="form-input-number"
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
            <label className="form-label" htmlFor="date">Date of Play:</label>
            <input
              className="form-input-number"
              type="date"
              id="date"
              name="date"
              value={playDate}
              onChange={(e) => setPlayDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="time">Time of Play:</label>
            <input
              className="form-input-time"
              type="time"
              id="time"
              name="time"
              value={playTime}
              onChange={(e) => setPlayTime(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-button">Create Play</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePlayForm;