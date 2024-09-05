"use client";
import React, { Suspense } from "react";
import IDE from "./components/IDE/IDE";
import Menu from "./components/Menu/Menu";

const Css = () => {
  return (
    <>
      <Menu />
      <Suspense fallback={null}>
        <div style={{ position: "absolute", zIndex: 10 }}>
          {/* <IDE addBalloon={() => console.log("ballon add")} /> */}
        </div>
      </Suspense>
    </>
  );
};

export default Css;
