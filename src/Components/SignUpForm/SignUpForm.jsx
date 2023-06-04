import React, { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../SignUpForm/SignUpForm.css";
import useFetchByClick from "../../Hooks/FetchByClick";

function SignUpForm() {
  const [response, setResponse] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userData.username && userData.email && userData.password) {
      setIsSubmit(true);
    }
  };

  const url = "http://localhost:8000/user";
  const requestOptions = {
    method: "POST",
    headers: { "Content-type": "application/json; charset=utf-8" },
    body: JSON.stringify(userData),
  };

  const { data, error, isLoading } = useFetchByClick(
    isSubmit,
    setIsSubmit,
    url,
    requestOptions
  );

  useEffect(() => {
    if (data.username) {
      setResponse("Congrats, your account has been created!");
    }
  }, [data]);

  return (
    <div className="main-page">
      <div className="signUp-container">
        <div className="signup-title-box">
          <h1>Sign Up</h1>
          <h4>
            {isSubmit && isLoading ? (
              `Loading ..`
            ) : error ? (
              <span className="error">{error}</span>
            ) : (
              response
            )}
          </h4>
        </div>
        <form className="signUp-form" onSubmit={(e) => handleSubmit(e)}>
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
            <label>Email </label>
            <input
              type="email"
              placeholder="Enter your email address."
              required
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </div>
          <div className="input-container">
            <label>Password</label>
            <input
              type="current-password"
              placeholder="Enter your password."
              required
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
          </div>
          <div className="login-message">
            <p>Already have an account?</p>
            <NavLink to="/login" className="login-button">
              Login
            </NavLink>
          </div>
          <button type="submit">SignUp</button>
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;
