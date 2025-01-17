import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import DarkModeToggle from "./components/DarkModeToggle/DarkModeToggle";
import ShowExperienceBtn from "./components/ShowExperienceBtn/ShowExperienceBtn";
import NameRole from "./components/NameRole/NameRole";

// Dynamically import the Portfolio component
const Portfolio = dynamic(() => import("./components/Portfolio/Portfolio"), {
  suspense: true,
});

const Css: React.FC = () => {
  return (
    <>
      <ShowExperienceBtn />
      <DarkModeToggle />
      <NameRole />
      <Suspense fallback={<div>Loading...</div>}>
        <Portfolio />
      </Suspense>
    </>
  );
};

export default Css;
