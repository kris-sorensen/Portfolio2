import React from "react";
import * as THREE from "three";
import Trees from "./components/Trees/Trees";
import Land from "./components/Land/Land";
import Water from "../Water/Water";

const Ground = () => {
  return (
    <group position={[0, -70, 0]}>
      <group position={[0, -1070, 0]} name={"ground"}>
        {/* <Land /> */}
        <Trees />
      </group>
      {/* <Water /> */}
    </group>
  );
};

export default Ground;
