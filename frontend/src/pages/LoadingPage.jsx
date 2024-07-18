import React from "react";
import logo from "../assets/logo.png";

const LoadingPage = () => {
  return (
    <div className="w-100 h-screen flex items-center justify-center flex-col">
      <img src={logo} alt="Instagram Logo" className="w-20" />
    </div>
  );
};

export default LoadingPage;
