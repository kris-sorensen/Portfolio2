import React from "react";
import "./css/menu.style.css";

const Menu: React.FC = () => {
  return (
    <div className="app-container">
      <button className="corner-button top-left">
        Balloon
      </button>
      <button className="corner-button bottom-left">
        Custom
      </button>
      <button className="corner-button top-right">About Me</button>
      <button className="corner-button bottom-right">Work</button>
      <button className="home-button">Home</button>
    </div>
  );
};

export default Menu;
