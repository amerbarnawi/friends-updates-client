import React from "react";
import "../PostCard/PostCard.css";

function PostCard({ post }) {
  const currentDate = new Date(post.publish_date);

  return (
    <div className="post-card">
      <h4>{post.title}</h4>
      <p>{currentDate.toDateString()}</p>
    </div>
  );
}

export default PostCard;
