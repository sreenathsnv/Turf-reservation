import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../../CSS/Auth/UserActivation.css';
import { axiosInstance } from "../../utils/CustomFetch";

function UserActivation() {
  const { uid, token } = useParams();
  const [buttonText, setButtonText] = useState("Verify Account");
  const [isActivated, setIsActivated] = useState(false);
  const navigate = useNavigate();

  const handleActivation = () => {
    axiosInstance
      .post("/auth/users/activation/", {
         uid, token 
        })
      .then((response) => {
        toast.success("Your account has been successfully activated.");
        setButtonText("Go to Login");
        setIsActivated(true);
        setTimeout(() => navigate("/login"), 2000);
      })
      .catch((error) => {
        toast.error("Activation failed. The link may be expired or invalid.");
      });
  };

  return (
    <div className="activation-container">
      <h2 className="activation-title">Account Activation</h2>
      <h4>Thank You for creating an account in 4play</h4>
      <p>Click on the below button to activate your account</p>
      <button
        onClick={handleActivation}
        className="activation-button"
        disabled={isActivated}
      >
        {buttonText}
      </button>
      <ToastContainer />
    </div>
  );
}

export default UserActivation;
