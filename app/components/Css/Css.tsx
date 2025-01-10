"use client";
import React, { useState } from "react";
// import IDE from "./components/IDE/IDE";
// import Menu from "./components/Menu/Menu";
// import Logo from "./components/Logo/Logo";
// import Title from "./components/Title/Title";
import NextPageBtn from "./components/NextPageBtn/NextPageBtn";
import Portfolio from "./components/Portfolio/Portfolio";
import DarkModeToggle from "./components/DarkModeToggle/DarkModeToggle";

const Css: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  // const addBalloon = () => {
  //   console.log("Balloon added");
  // };

  return (
    <>
      {isVisible && <Portfolio />}
      <DarkModeToggle />
      {/* <NextPageBtn /> */}
      {/* <Title /> */}
      {/* <Menu addBalloon={addBalloon} toggleVisibility={toggleVisibility} /> */}
      {/* <Logo /> */}
      {/* <div style={{ position: "absolute", zIndex: 10 }}>
        <IDE
          addBalloon={addBalloon}
          toggleVisibility={toggleVisibility}
          isVisible={isVisible}
        />
      </div> */}
    </>
  );
};

export default Css;
