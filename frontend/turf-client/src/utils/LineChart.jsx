import React, { useEffect, useState } from 'react';
import { axiosInstance } from './CustomFetch';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../CSS/LineChartElement.css';

const LineChartElement = ({ id }) => {
  const [data, setData] = useState([]);
  const [attribute, setAttribute] = useState('shoot'); // Default attribute

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosInstance.get(`/analysis/player-performance/${id}/${attribute}/`);
        // console.log(response.data);
        
        if (response.status === 200) {
          setData(response.data);
        }
      } catch (err) {
        console.error("Error occurred:", err);
      }
    }

    fetchData();
  }, [id, attribute]); // Fetch data whenever id or attribute changes

  const handleAttributeChange = (attr) => {
    setAttribute(attr);
  };

  return (
    <div className="line-chart-container">
      <h2>Player Performance Analysis</h2>

      {/* Buttons to change the attribute */}
      <div className="line-chart-buttons">
        <button className='btn-attr' onClick={() => handleAttributeChange('shoot')}>Shooting</button>
        <button onClick={() => handleAttributeChange('dribble')}>Dribbling</button>
        <button onClick={() => handleAttributeChange('pass_accuracy')}>Passing Accuracy</button>
        <button onClick={() => handleAttributeChange('defence')}>Defense</button>
      </div>
        <h1 className='attr-head'>{attribute}</h1>
      {/* Chart to visualize data */}
      <ResponsiveContainer width="90%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="ds" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="forecast" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartElement;
