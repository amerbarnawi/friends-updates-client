import React from "react";
import "../Main/Main.css";
import useFetchData from "../../Hooks/FetchHook";

function Main() {
  const url = "http://localhost:8000/post/all-posts";
  const { data, error, isLoading } = useFetchData(url, false);

  console.log(data);

  return <div className="main">Main</div>;
}

export default Main;
