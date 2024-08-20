import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../CSS/nav.css";
import { useAuth } from "../context/Authcontext";
import { axiosInstance } from "../utils/CustomFetch";
const AuthNav = () => {

  const {user,token,setToken,setUser,setIsAuthenticated} = useAuth()

  const logout = ()=>{
    if(token){
      
      delete axiosInstance.defaults.headers.common["Authorization"];
        localStorage.removeItem('token');
        setToken(null)
        setUser(null)
        setIsAuthenticated(false)
    }
  }
  return (
    <nav>
      <ul>
        <li>
          <Link to="/" exact>
            <button>Home</button>
          </Link>
        </li>
        <li>
          <Link to="/login">
            <button>Groups</button>
          </Link>
        </li>
        <li>
          <Link to="/login">
            <button>Booking</button>
          </Link>
        </li>
        <li>
          <Link to="/login">
            <button onClick={logout}>Logout</button>
          </Link>
        </li>
        <li className="profile-ele">
  <Link to="/">
      <img className="profile-pic" src={user?.profile_pic} alt="Profile" />
  </Link>
</li>

      </ul>
    </nav>
  );
};

const NotauthNav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/" exact>
            <button>Home</button>
          </Link>
        </li>
        <li>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </li>
        <li>
          <Link to="/signup">
            <button>Signup</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const Navbar = () => {
  const { isAuthenticated } = useAuth();

  useEffect(()=>{

    console.log("logout")
    
  },[isAuthenticated])
  return (
    <header>
      <div className="container">
        <h1>4play</h1>
        {isAuthenticated ? <AuthNav /> : <NotauthNav />}
      </div>
    </header>
  );
};

export default Navbar;
