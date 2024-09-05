import React from "react";
import "./css/menu.style.css";

const App: React.FC = () => {
  return (
    <div className="app-container">
      <button className="corner-button top-left">Balloon</button>
      <button className="corner-button bottom-left">Design Shader</button>
      <button className="corner-button top-right">About Me</button>
      <button className="corner-button bottom-right">Projects</button>
    </div>
  );
};

export default App;
