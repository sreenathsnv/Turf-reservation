import React, { useState } from "react";
import "../../CSS/Auth/ForgotPassword.css";
import { axiosInstance } from "../../utils/CustomFetch";

const ForgotPasswordConfirm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    let response = axiosInstance
      .post("/auth/users/reset_password/", { email })
      .then((response) => {
        if (response.status == 204) {
          setMessage("");
          return toast.error(
            "If your email is registered, you will receive a password reset link.",
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Bounce,
            }
          );
        } else {
          toast.error("Error occured check your credenetials again", {
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
      })
      .catch((error) => {
        toast.error("Error occured. Check again", {
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
      });
  };

  return (
    <div className="forgot-password-container">
      <h2 className="forgot-password-title">Forgot Password?</h2>
      <p className="forgot-password-subtitle">
        Enter your email address and we'll send you a link to reset your
        password.
      </p>
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <input
          type="email"
          className="forgot-password-input"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="forgot-password-button" type="submit">
          Send Reset Link
        </button>
      </form>
      {message && <p className="forgot-password-message">{message}</p>}
    </div>
  );
};

export default ForgotPasswordConfirm;
