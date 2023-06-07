import React, { useEffect, useState } from "react";
import "../Comment/Comment.css";
import { useLoginDetails } from "../../../Provider/LoginProvider";
import useFetchByClick from "../../../Hooks/FetchByClick";

function Comment({ comment, setIsCommentClicked, setIsRender }) {
  const [isDelete, setIsDelete] = useState(false);
  const currentDate = new Date(comment.timestamp);
  const { userData } = useLoginDetails();

  // Delete comment

  const url = `http://localhost:8000/comment/${comment.id}`;

  const requestOptions = {
    method: "DELETE",
    headers: new Headers({
      Authorization: userData.authTokenType + " " + userData.authToken,
    }),
  };

  const { data: deleteResponse } = useFetchByClick(
    isDelete,
    setIsDelete,
    url,
    requestOptions
  );

  useEffect(() => {
    if (deleteResponse?.details) {
      setIsRender(true);
      setIsCommentClicked(true);
    }
  }, [deleteResponse, setIsRender]);

  // Delete comment end.

  return (
    <div className="comment-container">
      <div>
        <div className="comment-top-content">
          <p>{comment.username}</p>
          <p>{currentDate.toDateString()}</p>
        </div>
        <p className="comment-text">{comment.text}</p>
      </div>
      {userData.username === comment.username ? (
        <button
          className="delete-comment-btn"
          onClick={() => setIsDelete(true)}
        >
          X
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

export default Comment;
