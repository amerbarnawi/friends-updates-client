import React, { useEffect, useState } from "react";
import "../NewPost/NewPost.css";
import { useLoginDetails } from "../../../Provider/LoginProvider";
import useFetchByClick from "../../../Hooks/FetchByClick";

function NewPost({ setIsRender, setIsNewPost }) {
  const [imageFile, setImageFile] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [isImage, setIsImage] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    img_url: "",
    creater_id: 0,
  });

  const { userData } = useLoginDetails();

  useEffect(() => {
    if (imageFile) {
      setIsImage(true);
    }
  }, [imageFile]);

  // Upload the image
  const url = "http://localhost:8000/post/upload-image";
  const formData = new FormData();
  formData.append("image", imageFile);
  const requestOptions = {
    method: "POST",
    headers: new Headers({
      Authorization: userData.authTokenType + " " + userData.authToken,
    }),
    body: formData,
  };

  const { data: imageUrl } = useFetchByClick(
    isImage,
    setIsImage,
    url,
    requestOptions
  );

  // Create new post
  const postUrl = "http://localhost:8000/post";

  const postRequestOptions = {
    method: "POST",
    headers: new Headers({
      Authorization: userData.authTokenType + " " + userData.authToken,
      "Content-type": "application/json; charset=utf-8",
    }),
    body: JSON.stringify({
      title: newPost.title,
      content: newPost.content,
      img_url: imageUrl?.filename ? imageUrl.filename : "",
      creater_id: userData.userId,
    }),
  };

  const { data: createdPost } = useFetchByClick(
    isSubmit,
    setIsSubmit,
    postUrl,
    postRequestOptions
  );

  useEffect(() => {
    if (createdPost?.id) {
      setIsRender(true);
      setIsNewPost(false);
    }
  }, [createdPost, setIsNewPost, setIsRender]);

  return (
    <div className="new-post">
      {imageUrl?.filename ? (
        <div className="image-contaner">
          <img src={"http://localhost:8000/" + imageUrl.filename} alt="Post" />
          <button
            onClick={() => {
              setImageFile("");
              setNewPost({ ...newPost, img_url: "" });
            }}
          >
            X
          </button>
        </div>
      ) : isImage ? (
        "Uploading the image.."
      ) : (
        ""
      )}
      <input
        className="post-title-input"
        type="text"
        placeholder="Post title"
        value={newPost.title}
        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
      />
      <textarea
        placeholder="Post content"
        rows="6"
        value={newPost.content}
        onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
      />
      <label>
        Upload image
        <input type="file" onChange={(e) => setImageFile(e.target.files[0])} />
      </label>
      <button className="submit-post-btn" onClick={() => setIsSubmit(true)}>
        Submit
      </button>
    </div>
  );
}

export default NewPost;
