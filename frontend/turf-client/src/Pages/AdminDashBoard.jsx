import React, { useEffect, useState } from "react";
import "../CSS/AdminDashBoard.css";
import { axiosInstance } from "../utils/CustomFetch";
import { useAuth } from "../context/Authcontext";
import { toast, Bounce } from "react-toastify";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const { user, token, setToken, setUser, setIsAuthenticated } = useAuth();

  const logout = () => {
    if (token) {
      delete axiosInstance.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isAddSlot, setIsAddSlot] = useState(false);
  const [currTurf, setCurrTurf] = useState();
  const [slots, setSlots] = useState([]);
  const [slot, setSlot] = useState({ start_time: "", end_time: "" });
  const [turfImage, setTurfImage] = useState(null);
  const [adminData, setAdminData] = useState({});
  const [formData, setFormData] = useState({
    turf_name: "",
    description: "",
    city: "",
    zipcode: 0,
    open_time: "",
    close_time: "",
    price: 0,
    image: "",
    state: "",
  });

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  const addSlot = async () => {
    try {
      const response = await axiosInstance.post("/turf/add/slot/", {
        turf: currTurf,
        start_time: slot.start_time,
        end_time: slot.end_time,
      });

      if (response.status === 200) {
        // Assuming response.data contains the updated list of slots
        setSlots(response.data);
        setSlot({ start_time: "", end_time: "" });
        toast.success("Slot added successfully", {
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
    } catch (error) {
      toast.error("Error adding slot", {
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
  };

  const removeSlot = async (slotId) => {
    try {
      const response = await axiosInstance.delete(`/turf/slot/${slotId}/delete/`);
      if (response.status === 200) {
        setSlots(slots.filter(slot => slot.id !== slotId));
        toast.success("Slot deleted successfully", {
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
    } catch (error) {
      toast.error("Error deleting slot", {
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
  };

  const handleSlotChange = (event) => {
    const { name, value } = event.target;
    setSlot({ ...slot, [name]: value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setTurfImage(file);
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append("turf_name", formData.turf_name);
    data.append("description", formData.description);
    data.append("city", formData.city);
    data.append("state", formData.state);
    data.append("zipcode", formData.zipcode);
    data.append("open_time", formData.open_time);
    data.append("close_time", formData.close_time);
    data.append("price", formData.price);
    data.append("image", turfImage);

    try {
      const response = await axiosInstance.post("/turf/create/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        toast.success(`Turf ${formData.turf_name} has been added`, {
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
      } else {
        toast.error("Error occurred", {
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
        setIsAddSlot(true);
      }
    } catch (error) {
      toast.error("Error occurred", {
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
  };

  const deleteTurf = async (id) => {
    try {
      const response = await axiosInstance.delete(`turf/${id}/delete/`);

      async function fetchData() {
        const response = await axiosInstance.get("/user/profile/");
        if (response.status === 200) {
          setAdminData(response.data);
        } else {
          toast.error("Error loading data", {
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

      if (response.status === 200) {
        toast.success("Turf deleted successfully", {
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
        fetchData();
      } else {
        toast.error("Error occurred", {
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
    } catch (error) {
      toast.error("Error occurred", {
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
  };

  useEffect(() => {
    async function fetchData() {
      const response = await axiosInstance.get("/user/profile/");
      if (response.status === 200) {
        setAdminData(response.data);
      } else {
        toast.error("Error loading data", {
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
    fetchData();
  }, [user]);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Admin Dashboard</h2>
        <nav>
          <ul>
            <li>
              <a><Link to="/admin">Overview</Link></a>
            </li>
            <li>
             <Link to="/admin/analysis"> <a>Reports</a></Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        <header className="header">
          <h1>Welcome, {user.name}</h1>
          <div className="user-info">
            <p>{user.username}</p>
            <button onClick={logout}>Logout</button>
          </div>
        </header>
        <section id="overview" className="section">
          <h2>Overview</h2>
          <div className="card">
            <h3>Total Turfs</h3>
            <p>{adminData?.turfs?.length}</p>
          </div>
          <div className="card">
            <h3>Total Bookings</h3>
            <p>{adminData?.booking?.length}</p>
          </div>
        </section>
        <section id="manage-turfs" className="section">
          <h2>Manage Turfs</h2>
          <button className="add-button" onClick={toggleForm}>
            Add New Turf
          </button>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Location</th>
                <th>Zipcode</th>
                <th>Timings</th>
                <th>Cost</th>
                <th>Actions</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {adminData.turfs?.map((turf, index) => (
                <tr key={index}>
                  <td>{turf.turf_name}</td>
                  <td>{turf.city}</td>
                  <td>{turf.zipcode}</td>
                  <td>{turf.open_time} - {turf.close_time}</td>
                  <td>₹{turf.price}</td>
                  <th>
                    <button onClick={() => deleteTurf(turf.id)}>Delete</button>
                  </th>
                  <th>
                    <button onClick={() => { setIsAddSlot(true); setIsFormVisible(false); setCurrTurf(turf.id); }}>Add Slots</button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
          {isFormVisible && (
            <div className="form-container">
              <h2>Add New Turf</h2>
              <form onSubmit={handleSubmit}>
                <label htmlFor="turf-name">Turf Name:</label>
                <input
                  type="text"
                  id="turf-name"
                  name="turf_name"
                  placeholder="Enter turf name"
                  required
                  onChange={handleChange}
                  value={formData.turf_name}
                />

                <label htmlFor="turf-location">City:</label>
                <input
                  type="text"
                  id="turf-location"
                  name="city"
                  placeholder="Enter city/location"
                  required
                  onChange={handleChange}
                  value={formData.city}
                />

                <label htmlFor="turf-location">State:</label>
                <input
                  type="text"
                  id="turf-location"
                  name="state"
                  placeholder="Enter state"
                  required
                  onChange={handleChange}
                  value={formData.state}
                />

                <label htmlFor="turf-zipcode">Zipcode:</label>
                <input
                  type="number"
                  id="turf-zipcode"
                  name="zipcode"
                  placeholder="Enter zipcode"
                  required
                  onChange={handleChange}
                  value={formData.zipcode}
                />

                <label htmlFor="turf-price">Price:</label>
                <input
                  type="number"
                  id="turf-price"
                  name="price"
                  placeholder="Enter Cost/hr"
                  required
                  onChange={handleChange}
                  value={formData.price}
                />

                <label htmlFor="turf-description">Description:</label>
                <input
                  type="text"
                  id="turf-description"
                  name="description"
                  placeholder="Enter a small description"
                  required
                  onChange={handleChange}
                  value={formData.description}
                />

                <label htmlFor="open-time">Open Time:</label>
                <input
                  type="time"
                  id="open-time"
                  name="open_time"
                  required
                  onChange={handleChange}
                  value={formData.open_time}
                />

                <label htmlFor="close-time">Close Time:</label>
                <input
                  type="time"
                  id="close-time"
                  name="close_time"
                  required
                  onChange={handleChange}
                  value={formData.close_time}
                />

                <label htmlFor="slot-image">Upload Image:</label>
                <input
                  type="file"
                  id="slot-image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                />

                <button type="submit">Add Turf</button>
                <button className="close-slots-button" style={{marginLeft:"7vw"}} onClick={() => { setIsFormVisible(false); setIsAddSlot(false); setCurrTurf(""); setFormData({
    turf_name: "",
    description: "",
    city: "",
    zipcode: 0,
    open_time: "",
    close_time: "",
    price: 0,
    image: "",
    state: "",
  }) }} >close</button>
              </form>
            </div>
          )}

          {isAddSlot && (
            <div className="slot-container">
              <h2>Add Slots</h2>
              {slots.map((slot, index) => (
                <div key={index} className="slot-group">
                  <p>{slot.start_time} - {slot.end_time}</p>
                  <button className="remove-slot-button" onClick={() => removeSlot(slot.id)}>-</button>
                </div>
              ))}
              <div className="slot-group">
                <label htmlFor="start-time">Start Time:</label>
                <input
                  type="time"
                  id="start-time"
                  name="start_time"
                  value={slot.start_time}
                  onChange={handleSlotChange}
                  required
                />
                <label htmlFor="end-time">End Time:</label>
                <input
                  type="time"
                  id="end-time"
                  name="end_time"
                  value={slot.end_time}
                  onChange={handleSlotChange}
                  required
                />
                <button className="add-slot-button" onClick={addSlot}>+</button>
              </div>
              <button className="close-slots-button" onClick={() => { setIsFormVisible(false); setIsAddSlot(false); setCurrTurf(""); setFormData({
    turf_name: "",
    description: "",
    city: "",
    zipcode: 0,
    open_time: "",
    close_time: "",
    price: 0,
    image: "",
    state: "",
  }) }} >close</button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
