import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../SignUpForm/SignUpForm.css";

function LoginForm() {
  const [response, setResponse] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  return (
    <div className="main-page">
      <div className="signUp-container">
        <div className="signup-title-box">
          <h1>Login</h1>
        </div>
        <form className="signUp-form">
          <div className="input-container">
            <label>User name</label>
            <input
              type="input"
              placeholder="Enter your username."
              required
              onChange={(e) =>
                setUserData({ ...userData, username: e.target.value })
              }
            />
          </div>
          <div className="input-container">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password."
              required
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
          </div>
          <div className="login-message">
            <p>Need account?</p>
            <NavLink to="/sign-up" className="login-button">
              Sign up
            </NavLink>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
