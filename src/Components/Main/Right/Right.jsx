import React from "react";
import "../Right/Right.css";
import { useLoginDetails } from "../../../Provider/LoginProvider";
import PostCard from "./PostCard/PostCard";

function Right() {
  const { userData, userPosts } = useLoginDetails();

  return (
    <div className="right-side">
      <div className="posts-cards-container">
        {userData && userPosts
          ? userPosts.map((post) => <PostCard key={post.id} post={post} />)
          : ""}
      </div>
    </div>
  );
}

export default Right;
