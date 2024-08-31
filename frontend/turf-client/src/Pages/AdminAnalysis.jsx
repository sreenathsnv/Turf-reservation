import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you use React Router for navigation
import '../CSS/AdminAnalysis.css'; // Import the CSS file
import BookingChart from '../Components/AdminCharts';
import { axiosInstance } from '../utils/CustomFetch';
import Forecast from '../Components/Forcast';

const AdminAnalysis = () => {
  const navigate = useNavigate();


  useEffect(()=>{
    async function fetchData() {

        // const 
        
    }
  })

  // Function to handle the back button
  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  // Function to handle the generate report button
  const handleGenerateReport = async () => {
    try {
      const response = await axiosInstance.get('/analysis/export/bookings/', {
        responseType: 'blob', // Set response type to blob
      });
  
      // Create a URL for the CSV data
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'text/csv' }));
      
      // Create a link element
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'bookings.csv'); // Set the file name
  
      // Append to the DOM and trigger the download
      document.body.appendChild(link);
      link.click();
  
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert('An error occurred while generating the report.');
      console.error('Error:', error);
    }
  };
  

  return (
    <div className="admin-dashboard-container">
      {/* Back Button */}
      <button className="admin-dashboard-back-button" onClick={handleBack}>
        Back
      </button>

      {/* Card Sections */}
      <div className="admin-dashboard-cards-container">
      <BookingChart/>
      <Forecast/>
   
      </div>

      {/* Generate Report Button */}
      <button className="admin-dashboard-generate-report-button" onClick={handleGenerateReport}>
        Generate Report
      </button>
    </div>
  );
};

export default AdminAnalysis;
