import React from "react";
import "../Header/Header.css";
import { NavLink } from "react-router-dom";
import { useLoginDetails } from "../../Provider/LoginProvider";

function Header() {
  const { userData, setUserData } = useLoginDetails();

  const handleLogOut = () => {
    setUserData({});
    sessionStorage.removeItem("userData");
  };

  return (
    <div className="header">
      <div className="app-name">
        <h1>
          <NavLink className="link" to="/">
            Friends Updates
          </NavLink>
        </h1>
      </div>
      <div className="navbar">
        {userData.authToken ? (
          ""
        ) : (
          <>
            <NavLink className="link" to="/login">
              <div className="navbar-btn">Login</div>{" "}
            </NavLink>
            <NavLink className="link" to="/sign-up">
              <div className="navbar-btn">Sign up</div>
            </NavLink>
          </>
        )}

        {userData.authToken ? (
          <div className="navbar-btn" onClick={handleLogOut}>
            Log out
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Header;
