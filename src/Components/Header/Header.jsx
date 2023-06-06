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
          <NavLink to="/">Friends Updates</NavLink>
        </h1>
      </div>
      <div className="navbar">
        {userData.authToken ? (
          ""
        ) : (
          <>
            <div className="navbar-btn">
              <NavLink to="/login">Login</NavLink>
            </div>
            <div className="navbar-btn">
              <NavLink to="/sign-up">Sign up</NavLink>
            </div>
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
