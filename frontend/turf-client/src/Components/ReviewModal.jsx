import React, { useState } from "react";
import Modal from "react-modal";
import "../CSS/FeedBackModal.css";
import { axiosInstance } from "../utils/CustomFetch";
import { toast,Bounce } from "react-toastify";

const FeedbackModal = ({ isOpen, onRequestClose, user }) => {
  const [values, setValues] = useState({
    dribble: 0,
    shoot: 0,
    pass_acuracy: 0,
    defence: 0,
    diving: 0,
    reflexes: 0,
    positioning: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
        "player":user.id,
      ...values,
      [name]: parseInt(value),
    });
  };

  const handleSubmit = async () => {
    
    const response = await axiosInstance.post('/player/review/',values);
    console.log(response.data)

    if(response.status == 200){
        toast.success("Review added successfully", {
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
    else if(response.status == 400){
        toast.error("Error occured!", {
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
    else{

        toast.error("Error occured! Try again later", {
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
    onRequestClose();
    setValues({
        dribble: 0,
        shoot: 0,
        pass_acuracy: 0,
        defence: 0,
        diving: 0,
        reflexes: 0,
        positioning: 0,
      })
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Feedback Form"
      className="feedback-modal-content"
      overlayClassName="feedback-modal-overlay"
    >
      <div className="feedback-modal-header">
        <h2>Review {user?.username}</h2>
      </div>
      <form className="feedback-modal-form">
        <div className="feedback-form-group">
          <label htmlFor="range1" className="feedback-form-label">
            Dribble :
          </label>
          <input
            type="range"
            id="range1"
            name="dribble"
            min="0"
            max="5"
            value={values.dribble}
            onChange={handleChange}
            className="feedback-form-range"
          />
          <span className="feedback-form-value">{values.dribble}</span>
        </div>

        <div className="feedback-form-group">
          <label htmlFor="range2" className="feedback-form-label">
            Shoot :
          </label>
          <input
            type="range"
            id="range2"
            name="shoot"
            min="0"
            max="5"
            value={values.shoot}
            onChange={handleChange}
            className="feedback-form-range"
          />
          <span className="feedback-form-value">{values.shoot}</span>
        </div>

        <div className="feedback-form-group">
          <label htmlFor="range3" className="feedback-form-label">
            Pass Acuracy:
          </label>
          <input
            type="range"
            id="range3"
            name="pass_acuracy"
            min="0"
            max="5"
            value={values.pass_acuracy}
            onChange={handleChange}
            className="feedback-form-range"
          />
          <span className="feedback-form-value">{values.pass_acuracy}</span>
        </div>

        <div className="feedback-form-group">
          <label htmlFor="range4" className="feedback-form-label">
            Defence:
          </label>
          <input
            type="range"
            id="range4"
            name="defence"
            min="0"
            max="5"
            value={values.defence}
            onChange={handleChange}
            className="feedback-form-range"
          />
          <span className="feedback-form-value">{values.defence}</span>
        </div>

        <div className="feedback-form-group">
          <label htmlFor="range5" className="feedback-form-label">
            Diving:
          </label>
          <input
            type="range"
            id="range5"
            name="diving"
            min="0"
            max="5"
            value={values.diving}
            onChange={handleChange}
            className="feedback-form-range"
          />
          <span className="feedback-form-value">{values.diving}</span>
        </div>

        <div className="feedback-form-group">
          <label htmlFor="range6" className="feedback-form-label">
            Reflexes:
          </label>
          <input
            type="range"
            id="range6"
            name="reflexes"
            min="0"
            max="5"
            value={values.reflexes}
            onChange={handleChange}
            className="feedback-form-range"
          />
          <span className="feedback-form-value">{values.reflexes}</span>
        </div>

        <div className="feedback-form-group">
          <label htmlFor="range7" className="feedback-form-label">
            Positioning:
          </label>
          <input
            type="range"
            id="range7"
            name="positioning"
            min="0"
            max="5"
            value={values.positioning}
            onChange={handleChange}
            className="feedback-form-range"
          />
          <span className="feedback-form-value">{values.positioning}</span>
        </div>

        <div className="modal-button-groups">
          <button
            type="button"
            className="feedback-close-button"
            onClick={onRequestClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="feedback-submit-button"
            onClick={handleSubmit}
          >
            Add Review
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default FeedbackModal;
