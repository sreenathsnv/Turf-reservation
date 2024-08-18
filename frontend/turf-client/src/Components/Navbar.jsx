import React from "react";
import { Link } from "react-router-dom";
import "../CSS/nav.css";
import { useAuth } from "../context/Authcontext";

const AuthNav = () => {
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
            <button>Logout</button>
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
          <Link to="/home">
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

  return (
    <header>
      <div class="container">
        <h1>4play</h1>
        {isAuthenticated ? <AuthNav /> : <NotauthNav />}
      </div>
    </header>
  );
};

export default Navbar;
