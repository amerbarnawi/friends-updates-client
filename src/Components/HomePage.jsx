import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import "../Components/HomePage.css";
import { Outlet } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default HomePage;
