import React, { useEffect, useState } from "react";
import { useLoginDetails } from "../../../Provider/LoginProvider";
import useFetchByClick from "../../../Hooks/FetchByClick";
import "./DeleteItem.css";

function DeleteItem({ setIsRender, post, setIsPopupTrigger }) {
  const [isDelele, setIsDelete] = useState(false);
  const { userData } = useLoginDetails();

  // Delete post

  const url = `http://localhost:8000/post/${post.id}`;

  const requestOptions = {
    method: "DELETE",
    headers: new Headers({
      Authorization: userData.authTokenType + " " + userData.authToken,
    }),
  };

  const { data: deleteResponse } = useFetchByClick(
    isDelele,
    setIsDelete,
    url,
    requestOptions
  );

  useEffect(() => {
    if (deleteResponse?.details) {
      setIsRender(true);
    }
  }, [deleteResponse, setIsRender]);

  // Delete post end.

  return (
    <div>
      <p>Are you sure you want to delete this post?</p>
      <div className="popup-buttons">
        <button className="cancel-btn" onClick={() => setIsPopupTrigger(false)}>
          Cancel
        </button>
        <button className="delete-btn" onClick={() => setIsDelete(true)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default DeleteItem;
