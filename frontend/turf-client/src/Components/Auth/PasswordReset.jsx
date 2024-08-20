import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PasswordReset = () => {
  const { uid, token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [reNewPassword, setReNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== reNewPassword) {
      setMessage("Passwords do not match.");
      return;
    }
    axios
      .post("/auth/users/reset_password_confirm/", {
        uid,
        token,
        new_password: newPassword,
        re_new_password: reNewPassword,
      })
      .then((response) => {
        toast.success("Password has been reset successfully. Redirecting to login...", {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
            transition: Bounce,
          });
        setTimeout(() => navigate("/login"), 3000);
      })
      .catch((error) => {
        toast.error("Failed to reset password. The link may be expired.", {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
            transition: Bounce,
          });
      });
  };

  return (
    <div className="reset-container">
      <h2 className="reset-title">Set New Password</h2>
      <form onSubmit={handleSubmit} className="reset-form">
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="reset-input"
        />
        <input
          type="password"
          placeholder="Confirm new password"
          value={reNewPassword}
          onChange={(e) => setReNewPassword(e.target.value)}
          required
          className="reset-input"
        />
        <button type="submit" className="reset-button">
          Reset Password
        </button>
      </form>
      {message && <p className="reset-message">{message}</p>}
    </div>
  );
};

export default PasswordReset;
