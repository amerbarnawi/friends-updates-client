import React, { useState, useContext, createContext, useEffect } from "react";

export const LoginContext = createContext();

export function useLoginDetails() {
  return useContext(LoginContext);
}

export function LoginProvider({ children }) {
  const [userData, setUserData] = useState({});
  const [userPosts, setUserposts] = useState([]);

  //Session storage

  useEffect(() => {
    const user = sessionStorage.getItem("userData")
      ? JSON.parse(sessionStorage.getItem("userData"))
      : "";
    setUserData(user);
  }, []);

  return (
    <LoginContext.Provider
      value={{ userData, setUserData, userPosts, setUserposts }}
    >
      {children}
    </LoginContext.Provider>
  );
}
