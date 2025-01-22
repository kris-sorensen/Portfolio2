import React from "react";
import * as THREE from "three";
import Trees from "./components/Trees/Trees";
import Land from "./components/Land/Land";
import Water from "./components/Water/Water";

const Earth = React.memo(() => {
  console.log(`earth component`);
  return (
    <group position={[0, -70, 0]}>
      <group position={[0, -1070, 0]} name={"earth"}>
        <Land />
        <Trees />
      </group>
      <Water />
    </group>
  );
});

Earth.displayName = "Earth";

export default Earth;
