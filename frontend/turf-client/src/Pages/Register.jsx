import React, { useRef, useState } from 'react';
import '../CSS/Auth/register.css';
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../utils/CustomFetch';
import { toast, Bounce } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const navigate = useNavigate();
  const [formdata, setFormData] = useState({
    email: '',
    username: '',
    name: '',
    password: '',
    re_password: '',
    phone: '',
    is_owner: false,
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePassword = (ref) => {
    const field = ref.current;
    const type = field.getAttribute('type') === 'password' ? 'text' : 'password';
    field.setAttribute('type', type);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    if (formdata.password !== formdata.re_password) {
      setError('Passwords do not match!');
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.post('/auth/users/', formdata);
      if (response.status === 200 || response.status === 201) {
        setSuccess(true);
        toast.success('Registered successfully, Check your mail', {
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

        setFormData({
          email: '',
          username: '',
          name: '',
          password: '',
          re_password: '',
          phone: '',
          is_owner: false,
        });

        setTimeout(() => navigate("/login"), 3000);
      } else {
        setError(response.data.message || 'Registration failed');
        toast.error(response.data.message || 'Registration failed', {
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
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'An error occurred during registration';
      setError(errorMsg);
      toast.error(errorMsg, {
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
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formdata,
      [name]: name === 'is_owner' ? value === 'true' : value,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} action="" className="form_main_reg" id="registrationForm">
        <p className="heading">Register</p>
        <div className="inputContainer">
          <input
            type="text"
            value={formdata.username}
            onChange={handleChange}
            name="username"
            className="inputField"
            id="username"
            placeholder="Username"
            required
            disabled={loading}
          />
        </div>
        <div className="inputContainer">
          <input
            type="text"
            value={formdata.name}
            onChange={handleChange}
            name="name"
            className="inputField"
            id="name"
            placeholder="Name"
            required
            disabled={loading}
          />
        </div>
        <div className="inputContainer">
          <input
            type="email"
            className="inputField"
            name="email"
            value={formdata.email}
            onChange={handleChange}
            id="email"
            placeholder="Email"
            required
            disabled={loading}
          />
        </div>
        <div className="inputContainer">
          <input
            type="text"
            value={formdata.phone}
            onChange={handleChange}
            className="inputField"
            name="phone"
            id="phonenumber"
            placeholder="Phone Number"
            required
            disabled={loading}
          />
        </div>
        <div className="inputContainer">
          <input
            type="password"
            value={formdata.password}
            onChange={handleChange}
            ref={passwordRef}
            name="password"
            className="inputField"
            id="password"
            placeholder="Password"
            required
            disabled={loading}
          />
          <span className="toggle-password" onClick={() => togglePassword(passwordRef)}>&#128065;</span>
        </div>
        <div className="inputContainer">
          <input
            type="password"
            value={formdata.re_password}
            onChange={handleChange}
            name="re_password"
            ref={confirmPasswordRef}
            className="inputField"
            id="confirm_password"
            placeholder="Confirm Password"
            required
            disabled={loading}
          />
          <span className="toggle-password" onClick={() => togglePassword(confirmPasswordRef)}>&#128065;</span>
        </div>
        <div className="inputContainer">
          <label className="radioLabel">
            <input
              type="radio"
              checked={formdata.is_owner === false}
              value="false"
              onChange={handleChange}
              name="is_owner"
              required
              disabled={loading}
            />{' '}
            User
          </label>
          <label className="radioLabel">
            <input
              type="radio"
              checked={formdata.is_owner === true}
              value="true"
              onChange={handleChange}
              name="is_owner"
              required
              disabled={loading}
            />{' '}
            Owner
          </label>
        </div>
        <button id="button" type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Submit'}
        </button>
        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>.
        </p>
      </form>
    </>
  );
};

export default Register;
