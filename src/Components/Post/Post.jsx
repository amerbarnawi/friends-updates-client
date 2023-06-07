import "../Post/Post.css";
import React, { useEffect, useState } from "react";
import TopContent from "./TopContent/TopContent";
import Comment from "./Comment/Comment";
import NewComment from "./NewComment/NewComment";
import { useLoginDetails } from "../../Provider/LoginProvider";
import useFetchByClick from "../../Hooks/FetchByClick";
import Popup from "../Popup/Popup";
import DeleteItem from "./DeleteItem/DeleteItem";

function Post({ post, setIsRender }) {
  const [isCommentClicked, setIsCommentClicked] = useState(false);
  const [isNewComment, setIsNewComment] = useState(false);
  const [isLikeSubmit, setIsLikeSubmit] = useState(false);
  const [likeClassName, setLikeClassName] = useState("interaction-btn");
  const [isPopupTrigger, setIsPopupTrigger] = useState(false);

  const { title, content, img_url, publish_date, user, comments, likes } = post;
  const currentDate = new Date(publish_date);
  const Base_image_url = `http://localhost:8000/`;

  const { userData } = useLoginDetails();

  // Update like => Start
  const url = "http://localhost:8000/like";

  const requestOptions = {
    method: "POST",
    headers: new Headers({
      Authorization: userData.authTokenType + " " + userData.authToken,
      "Content-type": "application/json; charset=utf-8",
    }),
    body: JSON.stringify({
      username: userData.username,
      post_id: post.id,
    }),
  };

  const { data: createdLike } = useFetchByClick(
    isLikeSubmit,
    setIsLikeSubmit,
    url,
    requestOptions
  );

  useEffect(() => {
    if (createdLike) {
      setIsRender(true);
      if (createdLike.id) {
        // Created like
        setLikeClassName("interaction-btn active-like");
      } else {
        // Deleted like
        setLikeClassName("interaction-btn");
      }
    }
  }, [createdLike, setIsRender]);

  useEffect(() => {
    post.likes.forEach((like) =>
      like.username === userData.username
        ? setLikeClassName("interaction-btn active-like")
        : setLikeClassName("interaction-btn")
    );
  });

  // Update like => End

  return (
    <div className="post">
      <TopContent
        user={user}
        currentDate={currentDate}
        post={post}
        setIsRender={setIsRender}
        setIsPopupTrigger={setIsPopupTrigger}
      />
      <div>
        <h4 className="post-title">{title}</h4>
        <p className="post-content">{content}</p>
        <div className="post-image">
          <img src={Base_image_url + img_url} alt="post" />
        </div>
        <div className="interaction-area">
          <div className="interaction-overview">
            <p className="like">{likes.length} Like</p>
            <p
              className="comment"
              onClick={() => setIsCommentClicked(!isCommentClicked)}
            >
              {comments.length} Comment
            </p>
          </div>
          {userData.authToken ? (
            <div className="interaction-buttons">
              <div
                className={likeClassName}
                onClick={() => setIsLikeSubmit(true)}
              >
                Like
              </div>
              <div
                className="interaction-btn"
                onClick={() => setIsNewComment(!isNewComment)}
              >
                Comment
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="comments-area">
            {userData.authToken && isNewComment ? (
              <NewComment
                post={post}
                setIsRender={setIsRender}
                setIsCommentClicked={setIsCommentClicked}
              />
            ) : (
              ""
            )}
            {comments.length > 0 && isCommentClicked
              ? comments.map((comment, index) => (
                  <Comment key={index} comment={comment} />
                ))
              : ""}
          </div>
        </div>
      </div>
      <Popup
        className="delete-popup"
        isTrigger={isPopupTrigger}
        setIsPopupTrigger={setIsPopupTrigger}
      >
        <DeleteItem
          post={post}
          setIsRender={setIsRender}
          setIsPopupTrigger={setIsPopupTrigger}
        />
      </Popup>
    </div>
  );
}

export default Post;
