import React from "react";
import useFetchData from "../../../Hooks/FetchHook";
import Post from "../../Post/Post";
import "../Middle/Middle.css";

function Middle() {
  const url = "http://localhost:8000/post/all-posts";
  const { data: posts, error, isLoading } = useFetchData(url, false);

  return (
    <div className="all-posts">
      {isLoading ? (
        <h3>Loading ..</h3>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <>
          {posts.length > 0 ? (
            posts.map((post) => <Post key={post.id} post={post} />)
          ) : (
            <p>No posts available!</p>
          )}
        </>
      )}
    </div>
  );
}

export default Middle;
