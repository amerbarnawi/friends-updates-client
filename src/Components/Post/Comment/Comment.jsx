import React from "react";

function Comment({ comment }) {
  const currentDate = new Date(comment.timestamp);
  return (
    <div className="comment-container">
      <p>{comment.username}</p>
      <p>{currentDate.toDateString()}</p>
      <p>{comment.text}</p>
    </div>
  );
}

export default Comment;
