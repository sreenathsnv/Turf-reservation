import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const PlayerRadarChart = ({ data }) => {
  const chartData = {
    labels: ['Dribble', 'Shoot', 'Pass Accuracy', 'Defence'],
    datasets: [
      {
        label: 'Player Performance',
        data: [data.dribble, data.shoot, data.pass_acuracy, data.defence],
        backgroundColor: 'rgba(34, 202, 236, 0.2)',
        borderColor: 'rgba(34, 202, 236, 1)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scale: {
      ticks: { beginAtZero: true, max: 5 }, // assuming the scale is from 0 to 5
    },
  };

  return <Radar data={chartData} options={options} />;
};

export default PlayerRadarChart;