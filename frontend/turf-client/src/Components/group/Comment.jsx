import React from 'react'

import { formatDate } from '../../utils/formatTime'

const Comment = ({comment,group}) => {
  return (
    <div className="comment">
    <img src={`${import.meta.env.VITE_BACKEND_URL}/media/${comment.avatar}`} alt="Avatar" className="comment-avatar" />
    <div className="comment-content">
      <p className="comment-author">{comment.user}</p>
      <p className="comment-time">{formatDate(comment.created_at)}</p>
      <p className="comment-text">
        {comment.body}
      </p>
    </div>
  </div>
  )
}

export default Comment