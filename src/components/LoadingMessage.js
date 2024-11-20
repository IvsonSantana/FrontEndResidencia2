import React from "react";
import "./LoadingMessage.css";

const LoadingMessage = () => {
  return (
    <div className="loading">
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
    </div>
  );
};

export default LoadingMessage;
