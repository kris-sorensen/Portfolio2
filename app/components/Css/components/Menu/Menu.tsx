import React from "react";
import "./css/menu.style.css";

interface MenuProps {
  addBalloon: () => void;
  toggleVisibility: () => void;
}

const Menu: React.FC<MenuProps> = ({ addBalloon, toggleVisibility }) => {
  return (
    <div className="app-container">
      <button className="corner-button top-left" onClick={addBalloon}>
        Balloon
      </button>
      <button className="corner-button bottom-left" onClick={toggleVisibility}>
        Custom
      </button>
      <button className="corner-button top-right">About Me</button>
      <button className="corner-button bottom-right">Work</button>
    </div>
  );
};

export default Menu;
