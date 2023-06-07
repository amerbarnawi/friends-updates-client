import React from "react";
import "../TopContent/TopContent.css";
import userLogo from "../../../images/user_logo.png";

function TopContent({
  currentDate,
  user,
  post,
  setIsRender,
  setIsPopupTrigger,
}) {
  return (
    <div className="top-content">
      <div className="user-detail">
        <div className="user-logo-container">
          <img src={userLogo} alt="User log" />
        </div>
        <div className="username-container">
          <h3>{user.username}</h3>
          <p>{currentDate.toDateString()}</p>
        </div>
      </div>
      <button onClick={() => setIsPopupTrigger(true)}>X</button>
    </div>
  );
}

export default TopContent;
