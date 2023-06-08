import React from "react";
import "../Left/Left.css";
import { useLoginDetails } from "../../../Provider/LoginProvider";
import userLogo from "../../../images/user_logo.png";
import { useNavigate } from "react-router-dom";

function Left() {
  const { userData, setUserData } = useLoginDetails();
  const Navigate = useNavigate();

  const handleLogout = () => {
    setUserData({});
    sessionStorage.removeItem("userData");
    window.location.reload();
  };

  const handleSignUp = () => {
    Navigate("/sign-up");
  };

  return (
    <div className="left-side">
      {userData?.authToken ? (
        <div className="current-user-details">
          <img src={userLogo} alt="User logo" />
          <h4>
            WELCOME <span>{userData.username.toUpperCase()}</span> ..
          </h4>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div className="login-info">
          <img src={userLogo} alt="User logo" />
          <h4>You do not have account?</h4>
          <button onClick={handleSignUp}>Sign up</button>
        </div>
      )}
    </div>
  );
}

export default Left;
