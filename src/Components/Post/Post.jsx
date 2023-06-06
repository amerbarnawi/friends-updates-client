import "../Post/Post.css";
import React, { useState } from "react";
import TopContent from "./TopContent/TopContent";
import Comment from "./Comment/Comment";
import NewComment from "./NewComment/NewComment";
import { useLoginDetails } from "../../Provider/LoginProvider";

function Post({ post, setIsRender }) {
  const { title, content, img_url, publish_date, user, comments, likes } = post;
  const currentDate = new Date(publish_date);
  const Base_image_url = `http://localhost:8000/`;

  const { userData } = useLoginDetails();

  const [isCommentClicked, setIsCommentClicked] = useState(false);
  const [isNewComment, setIsNewComment] = useState(false);

  return (
    <div className="post">
      <TopContent user={user} currentDate={currentDate} />
      <div>
        <h4 className="post-title">{title}</h4>
        <p className="post-content">{content}</p>
        <div className="post-image">
          <img src={Base_image_url + img_url} alt="post image" />
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
              <div className="interaction-btn">Like</div>
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
    </div>
  );
}

export default Post;
