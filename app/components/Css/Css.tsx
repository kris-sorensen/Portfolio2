"use client";
import React, { useState } from "react";
// import IDE from "./components/IDE/IDE";
import Menu from "./components/Menu/Menu";
import Title from "./components/Title/Title";
import NextPageBtn from "./components/NextPageBtn/NextPageBtn";

const Css: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  const addBalloon = () => {
    console.log("Balloon added");
  };

  return (
    <>
      <NextPageBtn />
      <Title />
      <Menu/>
      <Logo />
    
    </>
  );
};

export default Css;
