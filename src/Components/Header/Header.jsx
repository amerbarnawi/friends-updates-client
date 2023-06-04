import React from "react";
import "../Header/Header.css";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <div className="app-name">
        <h1>
          <NavLink to="/">Friends Updates</NavLink>
        </h1>
      </div>
      <div className="navbar">
        <div className="navbar-btn">
          <NavLink to="/login">Login</NavLink>
        </div>
        <div className="navbar-btn">
          <NavLink to="/sign-up">Sign up</NavLink>
        </div>
        <div className="navbar-btn">Log out</div>
      </div>
    </div>
  );
}

export default Header;
