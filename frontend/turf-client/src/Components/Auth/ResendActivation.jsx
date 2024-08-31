import React, { useState } from 'react'
import { axiosInstance } from '../../utils/CustomFetch';
import { Bounce, toast } from 'react-toastify';

const ResendActivation = () => {

    const   [email,setEmail] = useState()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axiosInstance.post('/auth/users/resend_activation/',{email})

        if(response.status === 200){
            
            toast.success("Check your mail", {
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
        }else{

            toast.error("Error occured", {
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

        }

  return (
    <div className="forgot-password-container">
      <h2 className="forgot-password-title">Resend Activation</h2>
      <p className="forgot-password-subtitle">
        Enter your email address and we'll send you a link to resend the activation link.
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
          Send activation Link
        </button>
      </form>
    </div>
  )
}

export default ResendActivation