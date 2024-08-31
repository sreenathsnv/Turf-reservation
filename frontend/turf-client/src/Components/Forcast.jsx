import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { axiosInstance } from '../utils/CustomFetch';

const Forecast = () => {
  const [forecastData, setForecastData] = useState([]);
  const [trendData, setTrendData] = useState([]);
  const [yearlyData, setYearlyData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await axiosInstance.get('/analysis/forecast/');

        const data = await response.data
        setForecastData(data.forecast);
        setTrendData(data.trend);
        setYearlyData(data.yearly);
        setWeeklyData(data.weekly);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchForecast();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Prepare data for the chart
  const dates = forecastData.map((entry) => entry.ds);
  const forecast = forecastData.map((entry) => entry.yhat);
  const forecastLower = forecastData.map((entry) => entry.yhat_lower);
  const forecastUpper = forecastData.map((entry) => entry.yhat_upper);

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: 'Forecast',
        data: forecast,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },
      {
        label: 'Lower Bound',
        data: forecastLower,
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
      },
      {
        label: 'Upper Bound',
        data: forecastUpper,
        fill: false,
        borderColor: 'rgb(54, 162, 235)',
        tension: 0.1
      }
    ]
  };

  return (
    <div className='forcast-container'>
      <h1>Booking Forecast</h1>
      <Line data={chartData} />
    </div>
  );
};

export default Forecast;