import React, { useEffect,useState } from "react";
import { axiosInstance } from "../../utils/CustomFetch";
import Comment from "./Comment";
import { toast, Bounce } from "react-toastify";

const CommentsSection = ({id,group,is_member}) => {
  const [groupComments, setGroupComments] = useState([]);
  const [comment,setComment] = useState('')
  
  useEffect(() => {
    async function fetchCommentsData() {
      const response = await axiosInstance.get(`/groups/${id}/comments/`);
      setGroupComments(response.data);
      // console.log(response.data);
      // console.log('trig');
      
    }

    fetchCommentsData();
  }, [id]);


  const handleComment = (e)=>{
    let comment = e.target.value
    setComment(comment)
  }
  const postComment = async ()=>{

    if( comment === ''){return}
    else{

      const response = await axiosInstance.post(`/groups/${id}/comments/`,{
        body: comment
      })
      setGroupComments(response.data)
      if( response.status === 201){

        const response = await axiosInstance.get(`/groups/${id}/comments/`);
      setGroupComments(response.data);
      setComment('')
      }
      else{
        toast.error(response.data || "Comment failed", {
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

  }

  return (
    <div className="comments-section">
      {

  groupComments.map((comment,index)=>(

    <Comment key={index} group={group} comment={comment}/>
  )) 

      }
  <div className="comment-input-container">
    {
      is_member ?
      <>
      <input
      type="text"
      placeholder="Write a comment..."
      className="comment-input"
      onChange={handleComment}
      value={comment}
    />
    <button className="send-button" onClick={postComment}>Send</button>
      </>:
      <input
      type="text"
      placeholder="Join to comment"
      className="comment-input"
      disabled={true}
      
    />
  }
  </div>
</div>

  );
};

export default CommentsSection;
