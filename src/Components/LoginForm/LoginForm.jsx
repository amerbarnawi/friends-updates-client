import React from "react";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../SignUpForm/SignUpForm.css";
import useFetchByClick from "../../Hooks/FetchByClick";
import { useLoginDetails } from "../../Provider/LoginProvider";

function LoginForm() {
  const [response, setResponse] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  });
  const Navigate = useNavigate();

  const { setUserData } = useLoginDetails();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userDetails.username && userDetails.password) {
      setIsSubmit(true);
    }
  };

  const formData = new FormData();
  formData.append("username", userDetails.username);
  formData.append("password", userDetails.password);

  const url = "http://localhost:8000/login";
  const requestOptions = {
    method: "POST",
    body: formData,
  };

  const { data, error, isLoading } = useFetchByClick(
    isSubmit,
    setIsSubmit,
    url,
    requestOptions
  );

  useEffect(() => {
    if (data.access_token) {
      const newUserData = {
        authToken: data.access_token,
        authTokenType: data.token_type,
        userId: data.user_id,
        username: data.username,
      };
      setUserData(newUserData);
      setUserDetails({
        username: "",
        password: "",
      });
      sessionStorage.setItem("userData", JSON.stringify(newUserData));
      Navigate("/");
    }
  }, [data]);

  return (
    <div className="main-page">
      <div className="signUp-container">
        <div className="signup-title-box">
          <h1>Login</h1>
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
              value={userDetails.username}
              type="input"
              placeholder="Enter your username."
              required
              onChange={(e) =>
                setUserDetails({ ...userDetails, username: e.target.value })
              }
            />
          </div>
          <div className="input-container">
            <label>Password</label>
            <input
              value={userDetails.password}
              type="new-password"
              placeholder="Enter your password."
              required
              onChange={(e) =>
                setUserDetails({ ...userDetails, password: e.target.value })
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
