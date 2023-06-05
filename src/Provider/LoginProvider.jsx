import React, { useState, useContext, createContext, useEffect } from "react";

export const LoginContext = createContext();

export function useLoginDetails() {
  return useContext(LoginContext);
}

export function LoginProvider({ children }) {
  const [userData, setUserData] = useState({});

  //Session storage

  useEffect(() => {
    const user = sessionStorage.getItem("userData")
      ? JSON.parse(sessionStorage.getItem("userData"))
      : "";
    setUserData(user);
  }, []);

  return (
    <LoginContext.Provider value={{ userData, setUserData }}>
      {children}
    </LoginContext.Provider>
  );
}
