import React from "react";
import Camera from "./components/Camera/Camera";
import useShadows from "./hooks/useShadows";

const Config = () => {
  useShadows();
  console.log(`config`);

  return (
    <>
      <Camera />
    </>
  );
};

export default Config;
