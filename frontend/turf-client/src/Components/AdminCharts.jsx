import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { axiosInstance } from '../utils/CustomFetch';
import '../CSS/AdminAnalysis.css'; // Import the CSS file

// Register components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const BookingChart = () => {
  const [chartData, setChartData] = useState({});
  const [view, setView] = useState('daily');

  const fetchBookingData = async (view) => {
    let url = '';
    if (view === 'daily') {
      url = `${import.meta.env.VITE_BACKEND_URL}/analysis/bookings/daily/`;
    } else if (view === 'weekly') {
      url = `${import.meta.env.VITE_BACKEND_URL}/analysis/bookings/weekly/`;
    } else if (view === 'monthly') {
      url = `${import.meta.env.VITE_BACKEND_URL}/analysis/bookings/monthly/`;
    }

    try {
      const response = await axiosInstance.get(url);
      const data = response.data;

      // Check if data exists and is an object
      if (data && typeof data === 'object') {
        const dates = [data.date || '']; // Handle cases where date might be missing
        const counts = [data.count || 0]; // Handle cases where count might be missing

        setChartData({
          labels: dates,
          datasets: [
            {
              label: 'Bookings',
              data: counts,
              fill: false,
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
            },
          ],
        });
      } else {
        console.error('Unexpected data format:', data);
      }
    } catch (error) {
      console.error('Error fetching booking data:', error);
    }
  };

  useEffect(() => {
    fetchBookingData(view);
  }, [view]);

  return (
    <div className="booking-chart-container">
      <div className="booking-chart-buttons">
        <button className="booking-chart-button" onClick={() => setView('daily')}>
          Daily
        </button>
        <button className="booking-chart-button" onClick={() => setView('weekly')}>
          Weekly
        </button>
        <button className="booking-chart-button" onClick={() => setView('monthly')}>
          Monthly
        </button>
      </div>
      <div className="booking-chart">
        {chartData.labels ? <Line data={chartData} /> : <p>Loading chart data...</p>}
      </div>
    </div>
  );
};

export default BookingChart;
