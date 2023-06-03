import "../Post/Post.css";
import React from "react";

function Post({ post }) {
  const { title, content, img_url, publish_date, user, comments, likes } = post;

  const Base_image_url = `http://localhost:8000/`;

  return (
    <div className="post">
      <h3>{title}</h3>
      <p>{content}</p>
      <div className="post-image">
        <img src={Base_image_url + img_url} alt="post image" />
      </div>
    </div>
  );
}

export default Post;
