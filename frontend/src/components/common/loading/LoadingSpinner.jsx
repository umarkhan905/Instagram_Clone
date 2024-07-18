import React from "react";
import Loading from "../../../assets/loading.gif";

const LoadingSpinner = ({ className }) => {
  return (
    <div className={`${className}`}>
      <img
        src={Loading}
        alt="Loading Gif"
        className="w-full h-full object-cover object-center"
      />
    </div>
  );
};

export default LoadingSpinner;
