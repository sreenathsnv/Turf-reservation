import React, { useEffect, useState } from "react";
import "../CSS/Turf/TurfMain.css";
import StarRating from "../Components/Turf/StarRating";
import UserReviewComponent from "../Components/Turf/CommentItem";
import { axiosInstance } from "../utils/CustomFetch";
import { Bounce, toast } from "react-toastify";
import { convertTimeToHHMM } from "../utils/formatTime";
import { useParams } from "react-router-dom";

const TurfPage = () => {
  const { id } = useParams();
  const [stars, setStars] = useState(0);
  const [turfData, setTurfData] = useState({});
  const [loading,setLoading] = useState(true)
  const [formData,setformData] = useState({
    comments:'',
    rating:stars
  })

  
  useEffect(() => {
    const fetchData = async (id) => {
        console.log("start");
        
        const response = await axiosInstance.get(`/turf/${id}/view/`);
    
        if (response.status == 200) {
          setTurfData(response.data);
          console.log(response.data);
        } else {
          toast.error("Error Fetching data", {
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
    fetchData(id);
    setLoading(false)
  }, [id]);

  const handleRatingChange = (n) => {
    setStars(n);
  };
  const handleChange = (e)=>{
    let {name,value} = e.target
    setformData({
        ...formData,
        rating:stars,
        [name]:value
    })
  }

  const handleSubmit= async()=>{
    const response = await axiosInstance.post(`/turf/${id}/review/`,formData)
    
    if (response.status=== 200){

        toast.success("Review Posted", {
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



          const fetchData = async (id) => {
            console.log("start");
            
            const response = await axiosInstance.get(`/turf/${id}/view/`);
        
            if (response.status == 200) {
              setTurfData(response.data);
              console.log(response.data);
            } else {
              toast.error("Error Fetching data", {
                position: "top-right",
                autoClose: 1000,
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
        fetchData(id);

    }else{

        toast.error("Could not post the review", {
            position: "top-right",
            autoClose: 1000,
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
    <div className="turfpage-container">
      <div className="turfpage-image-container">
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}${turfData?.turf_data?.image}`}
          alt="Turf Image"
          className="turfpage-turf-image"
        />
      </div>
      {/* Turf Description */}
      <div className="turfpage-description fade-in">
        <p>{turfData?.turf_data?.description}</p>
      </div>
      {/* Turf Details Display Section */}
      <div className="turfpage-details fade-in">
        <h2 className="turfpage-title">Turf Details</h2>
        <div className="turfpage-info">
          <div className="turfpage-info-column">
            <p>
              <strong className="turfpage-strong">Turf Name:</strong>{" "}
              {turfData?.turf_data?.turf_name}
            </p>
            <p>
              <strong className="turfpage-strong">Location:</strong>{" "}
              {turfData?.turf_data?.city}
            </p>
            <p>
              <strong className="turfpage-strong">State:</strong>
              {turfData?.turf_data?.state}
            </p>
            <p>
              <strong className="turfpage-strong">Zipcode:</strong>{" "}
              {turfData?.turf_data?.zipcode}
            </p>
            <p>
              <strong className="turfpage-strong">Owner Name:</strong>
              {turfData?.turf_data?.manager}
            </p>
          </div>
          <div className="turfpage-info-column">
            <p className="turfpage-highlight-cost">
              <strong className="turfpage-strong">Cost:</strong> ₹{turfData?.turf_data?.price}
            </p>
            <p>
              <strong className="turfpage-strong">Phone:</strong>
              {turfData?.turf_data?.phone}
            </p>
            <p>
              <strong className="turfpage-strong">Open Time:</strong>
              {convertTimeToHHMM(String(turfData?.turf_data?.open_time))}
            </p>
            <p>
              <strong className="turfpage-strong">Close Time:</strong>
              {convertTimeToHHMM(String(turfData?.turf_data?.close_time))}
            </p>
            <div>
              <strong className="turfpage-strong">Available Slots:</strong>

              {turfData?.slots_info?.map((slot, index) => (
                <p key={index} className="each-slot">
                  <span>{convertTimeToHHMM(String(slot.start_time))}</span> -{"   "}
                  <span>{convertTimeToHHMM(String(slot.end_time))}</span>
                  
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="turfpage-book-now-container">
          <a
            href="#turfpage-comment-input-container"
            className="turfpage-book-now-button"
          >
            Book Now
          </a>
        </div>
      </div>
      {/* Comment Input Section */}
      <div
        id="turfpage-comment-input-container"
        className="turfpage-comment-input-container fade-in"
      >
        <h4 className="turfpage-comment-title">Add Your Comment</h4>

        {/* Star Rating Component */}
        <StarRating onRatingChange={handleRatingChange} />

        <textarea
          className="turfpage-comment-input"
          placeholder="Enter your comment here..."
          onChange={handleChange}
          value={formData.comments}
          name="comments"
        ></textarea>
        <button className="turfpage-comment-submit-button" onClick={handleSubmit}>Add Review</button>
      </div>
      {/* Turf Review Section */}
      <h3 className="turfpage-review-title fade-in">Turf Reviews</h3>
      <div className="turfpage-review-section fade-in">
        <div className="turfpage-reviews-list">
          {
            turfData?.turf_reviews?.map((review,index)=>(
                <UserReviewComponent key={index} username={review?.username} comment={review?.comments} time={review?.created_at} avatar={review?.avatar} rating={Number(review?.rating)} />
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default TurfPage;
