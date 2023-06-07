import React, { useEffect, useState } from "react";
import "../NewComment/NewComment.css";
import { useLoginDetails } from "../../../Provider/LoginProvider";
import useFetchByClick from "../../../Hooks/FetchByClick";

function NewComment({ post, setIsRender, setIsCommentClicked }) {
  const [commentText, setCommentText] = useState("");
  const { userData } = useLoginDetails();
  const [isSubmit, setIsSubmit] = useState(false);

  // Create new comment
  const url = "http://localhost:8000/comment";

  const requestOptions = {
    method: "POST",
    headers: new Headers({
      Authorization: userData.authTokenType + " " + userData.authToken,
      "Content-type": "application/json; charset=utf-8",
    }),
    body: JSON.stringify({
      username: userData.username,
      text: commentText,
      post_id: post.id,
    }),
  };

  const { data: createdComment } = useFetchByClick(
    isSubmit,
    setIsSubmit,
    url,
    requestOptions
  );

  useEffect(() => {
    if (createdComment.id) {
      setCommentText("");
      setIsRender(true);
      setIsCommentClicked(true);
    }
  }, [createdComment, setIsCommentClicked, setIsRender]);

  return (
    <div className="comment-form">
      <textarea
        rows="2"
        value={commentText}
        placeholder="Add your comment.."
        onChange={(e) => setCommentText(e.target.value)}
      />

      <button onClick={() => setIsSubmit(true)}>Submit</button>
    </div>
  );
}

export default NewComment;
