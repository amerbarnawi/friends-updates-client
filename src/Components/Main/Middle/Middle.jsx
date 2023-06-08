import React, { useState, useEffect } from "react";
import useFetchData from "../../../Hooks/FetchHook";
import Post from "../../Post/Post";
import "../Middle/Middle.css";
import NewPost from "../../Post/NewPost/NewPost";
import { useLoginDetails } from "../../../Provider/LoginProvider";

function Middle() {
  const [isNewPost, setIsNewPost] = useState(false);
  const [isRender, setIsRender] = useState(false);
  const [allPosts, setAllPosts] = useState([]);

  const url = "http://localhost:8000/post/all-posts";
  const { data, error, isLoading } = useFetchData(url, isRender);
  const { userData, setUserposts } = useLoginDetails();

  useEffect(() => {
    setIsRender(false);
  }, [isRender]);

  console.log(userData.user_id);

  useEffect(() => {
    if (data) {
      const reversedData = data.reverse();
      setAllPosts(reversedData);
      if (userData) {
        const userPosts = reversedData.filter(
          (post) => post.user.id === userData.userId
        );
        setUserposts(userPosts);
        sessionStorage.setItem("userPosts", JSON.stringify(userPosts));
      }
    }
  }, [data, setUserposts, userData]);

  return (
    <div className="all-posts">
      {isLoading ? (
        <h3>Loading ..</h3>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <>
          {userData.authToken ? (
            <div className="new-post-container">
              <input
                type="text"
                placeholder="What is your update .."
                className="new-post-input"
                onClick={() => setIsNewPost(!isNewPost)}
              />
            </div>
          ) : (
            ""
          )}
          <>
            {isNewPost ? (
              <NewPost setIsRender={setIsRender} setIsNewPost={setIsNewPost} />
            ) : (
              ""
            )}
          </>
          {allPosts.length > 0 ? (
            allPosts.map((post) => (
              <Post key={post.id} post={post} setIsRender={setIsRender} />
            ))
          ) : (
            <p>No posts available!</p>
          )}
        </>
      )}
    </div>
  );
}

export default Middle;
