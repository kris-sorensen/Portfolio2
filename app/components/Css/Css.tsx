import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import DarkModeToggle from "./components/DarkModeToggle/DarkModeToggle";
import ShowExperienceBtn from "./components/ShowExperienceBtn/ShowExperienceBtn";
import NameRole from "./components/NameRole/NameRole";
import SocialIcons from "./components/SocialIcons/SocialIcons";
import Intro from "./components/Intro/Intro";

// Dynamically import the Portfolio component
const Portfolio = dynamic(() => import("./components/Portfolio/Portfolio"), {
  suspense: true,
});

const Css: React.FC = () => {
  return (
    <>
      <Intro />
      <ShowExperienceBtn />
      <DarkModeToggle />
      {/* <NameRole /> */}
      <SocialIcons />
      <Suspense fallback={<div>Loading...</div>}>
        <Portfolio />
      </Suspense>
    </>
  );
};

export default Css;
