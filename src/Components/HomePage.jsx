import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import "../Components/HomePage.css";
import { Outlet } from "react-router-dom";
import { LoginProvider } from "../Provider/LoginProvider";

function HomePage() {
  return (
    <div>
      <LoginProvider>
        <Header />
        <Outlet />
        <Footer />
      </LoginProvider>
    </div>
  );
}

export default HomePage;
