import React from "react";
import "../Main/Main.css";
import Left from "./Left/Left";
import Right from "./Right/Right";
import { Outlet } from "react-router-dom";

function Main() {
  return (
    <div className="main">
      <Left />
      <div className="middle-side">
        <Outlet />
      </div>

      <Right />
    </div>
  );
}

export default Main;
