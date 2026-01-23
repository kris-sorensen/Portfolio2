import React from "react";
import "./css/title.style.css";

const Title = () => {
  return (
    <div className="z-10 absolute w-screen h-screen pointer-events-none">
      <div className="title-container">
        <div className="title-content">
          <h1 className="main-title">
            <span className="title-gradient">CREATIVE DEVELOPER</span>
          </h1>
          <div className="subtitle-wrapper">
            <span className="subtitle">KRISTOPHER SORENSEN</span>
          </div>
          <div className="title-accent"></div>
        </div>
      </div>
    </div>
  );
};

export default Title;
