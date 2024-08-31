import React, { useEffect } from "react";
import "../CSS/Home/home.css";
import { useAuth } from "../context/Authcontext";
import { axiosInstance } from "../utils/CustomFetch";

import Turflist from "../Components/home/Turflist";
import { useNavigate } from "react-router-dom";



const fetchUserData = async (token, setUser) => {

  try {
    const response = await axiosInstance.get('/auth/users/',);
    // setUser(response.data[0]);
    setUser(response.data[0]);
    
    if(response.data[0].is_owner){
      
    }
    
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};



const Home = () => {
  const {
    token,
    user,
    isAuthenticated,
    setUser,
  } = useAuth();
  useEffect(() => {
    if (token && isAuthenticated) {
      fetchUserData(token, setUser);
      // console.log(user)

      

      
    }
  }, [token, isAuthenticated]);
  return (
    
    <main>
      <div className="container-main">
        <section id="hero">
          <h2>Book Your Turf Easily and Quickly</h2>
          <p>Find the best turfs near you and book online.</p>
          <button
            
            className="cta-button"
          >
            Book Now
          </button>
        </section>
        <Turflist/>
      </div>
    </main>
    
  );
};

export default Home;
