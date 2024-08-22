import React, { useState } from "react";
import "../CSS/Auth/login.css";
import { useAuth } from "../context/Authcontext";
import { Link, Navigate } from "react-router-dom";
import { axiosInstance } from "../utils/CustomFetch";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { setToken, setIsAuthenticated, setUser } = useAuth();

  const [formdata, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false); // New loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    setError("");
    setSuccess(false);
    setLoading(true); // Set loading to true when starting form submission

    try {
      const response = await axiosInstance.post("/auth/jwt/create", formdata);
      if (response.status === 200 || response.status === 201) {
        setToken(response.data.access);
        setIsAuthenticated(true);
        setSuccess(true);
        toast.success("Login successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
        setFormData({
          email: "",
          password: "",
        });
      } else {
        setError(response.data || "Login failed");
        toast.error(response.data || "Login failed", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
    } catch (err) {
      const errorMsg =
        err.response?.data || "An error occurred during Login";
      setError(errorMsg);
      toast.error(errorMsg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    } finally {
      setLoading(false); // Set loading to false when done
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formdata,
      [name]: value,
    });
  };

  if (success) {
    return <Navigate to="/" />;
  }

  return (
    <form onSubmit={handleSubmit} className="form_main">
      <p className="heading">Login</p>
      <div className="inputContainer">
        <svg
          className="inputIcon"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="#2e2e2e"
          viewBox="0 0 16 16"
        >
          <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
        </svg>
        <input
          type="email"
          onChange={handleChange}
          className="inputField"
          name="email"
          id="email"
          placeholder="Email"
          disabled={loading} // Disable input if loading
        />
      </div>

      <div className="inputContainer">
        <svg
          className="inputIcon"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="#2e2e2e"
          viewBox="0 0 16 16"
        >
          <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
        </svg>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          className="inputField"
          id="password"
          placeholder="Password"
          disabled={loading} // Disable input if loading
        />
      </div>
      <button id="button" type="submit" disabled={loading}>
        {loading ? "Authenticating..." : "Submit"}
      </button>
      <Link className="forgotLink" to="/password/reset">
        Forgot your password?
      </Link>
      <br />
      <p className="login-link">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </form>
  );
};

export default Login;
