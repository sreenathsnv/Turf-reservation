import React, { useState, useEffect } from "react";
import "../CSS/Home/Createroom.css";
import { axiosInstance } from "../utils/CustomFetch";
import { useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import { useAuth } from "../context/Authcontext";
function CreatePlayForm() {

  const {user} = useAuth()
  const [turfs, setTurfs] = useState([]);
  const [turf, setTurf] = useState([]);
  const [slotVisible, setSlotVisible] = useState(false);
  const [slots, setSlots] = useState([]);
  const [slot, setSlot] = useState("");
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    group_admin:user.id,
    group_name: "",
    req_players: "",
    time_slot: "",
    turf: "",
    date:""
  });

  const selectTurf = async (id) => {
    setTurf(id);
    setSlot([])
    try {
      const response = await axiosInstance.get(`/turf/${id}/slots/`);

      if (response.status == 200) {
        setSlots(response.data.slots);
        console.log(response.data.slots)
        setSlotVisible(true)
      }
    } catch (err) {
      console.log("error");
    }
  };
  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({
      ...formData,
      turf: turf,
      group_admin:user.id,
      [name]: value,
    });
  };

  const handleSubmit = async ()=>{

    console.log(formData)
    
    try {
      const response = await axiosInstance.post(`/groups/create/`,formData);

      if (response.status == 201) {
        toast.success(`GameRoom Created`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });

        navigate('/',{replace:true})

      }
    } catch (err) {
      toast.success(`Error Creating`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      setFormData({
        group_name: "",
        req_players: "",
        time_slot: "",
        turf: "",
        date:""
      })
    }
  }

  useEffect(() => {
    async function fetchData() {
      const response = await axiosInstance.get("/turfs/booked/");

      if (response.status == 200) {
        console.log(response.data);
        setTurfs(response.data.turfs);
      } else {
        console.log("error");
      }
    }
    fetchData();
  }, []);

  useEffect(() => {}, [turfs]);

  return (
    <div className="makegroup-container">
      <div className="makegroup-content">
        <div className="makegroup-field-group">
          <label htmlFor="group-name" className="makegroup-label-group-name">
            Group Name
          </label>
          <input
            type="text"
            id="group-name"
            name="group_name"
            value={formData.group_name}
            required
            onChange={handleChange}
            className="makegroup-input-group-name"
            placeholder="Enter your group name"
          />
        </div>
        <div className="makegroup-field-group">
          <label
            htmlFor="required-player"
            className="makegroup-label-required-player"
          >
            Required Players
          </label>
          <input
            type="text"
            id="required-player"
            name="req_players"
            required
            value={formData.req_players}
            onChange={handleChange}
            className="makegroup-input-required-player"
            placeholder="Number of players required"
          />
          <label
            htmlFor="required-player"
            className="makegroup-label-required-player"
          >
            Date
          </label>
          <input
            type="date"
            id="required-player"
            style={{textDecoration:"none"}}
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="makegroup-input-required-player"
            placeholder="Number of players required"
          />
        </div>

        <h3 className="makegroup-label-select-turf">Select Turf</h3>
        <div className="makegroup-turf-selection">
          {turfs?.map((tf, index) => (
            <div
              key={index}
              className="makegroup-turf-card"
              onClick={() => selectTurf(tf.id)}
            >
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/${tf.image}`}
                alt="Turf 1"
                className="makegroup-turf-img"
              />
              <div className="makegroup-turf-info">
                <h3 className="makegroup-turf-name">{tf.turf_name}</h3>
                <p className="makegroup-turf-location">{tf.city}</p>
              </div>
            </div>
          ))}
        </div>

        {
          slotVisible &&(

            <div className="makegroup-field-group">
          <label htmlFor="slot-booked" className="makegroup-label-slot-booked">
            Slot booked
          </label>
          <select required id="slot-booked" name="time_slot" onChange={handleChange} className="makegroup-input-slot-booked">
            <option value="" disabled selected>
              Select your time slot
            </option>

            {
              slots?.map((slotobj,index)=>(
                <option key={index} value={slotobj.id}>{slotobj.start_time} - {slotobj.end_time}</option>
              ))
            }
          </select>
        </div>
          )
        }

        <div className="makegroup-actions">
          <button className="makegroup-button-cancel">Cancel</button>
          <button className="makegroup-button-create" onClick={handleSubmit}>Create</button>
        </div>
      </div>
    </div>
  );
}

export default CreatePlayForm;
