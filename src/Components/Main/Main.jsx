import React from "react";
import "../Main/Main.css";
import useFetchData from "../../Hooks/FetchHook";
import Post from "../Post/Post";

function Main() {
  const url = "http://localhost:8000/post/all-posts";
  const { data: posts, error, isLoading } = useFetchData(url, false);

  return (
    <div className="main">
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

export default Main;
