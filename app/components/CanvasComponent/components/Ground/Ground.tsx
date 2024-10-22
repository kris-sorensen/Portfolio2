import React from "react";
import * as THREE from "three";
import Trees from "./components/Trees/Trees";
import Ocean from "./components/Ocean/Ocean";
import Land from "./components/Land/Land";

const Ground = () => {
  return (
    <group position={[0, -50, 0]}>
      <group position={[0, -1070, -100]} name={"ground"}>
        <Land />
        <Trees />
      </group>
      <Ocean />
    </group>
  );
};

export default Ground;
