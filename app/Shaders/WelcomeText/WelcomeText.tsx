import React, { useEffect, useState } from "react";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import WelcomeTextMaterial from "./WelcomeTextMaterial";

const texts = [
  {
    content: "WELCOME TO",
    position: new THREE.Vector3(0, 0.5, 0),
    fontSize: 0.55,
    delay: 0.5,
    duration: 10,
  },
  {
    content: "NEXT + REACT-THREE-FIBER",
    position: new THREE.Vector3(0, -0.5, 0),
    fontSize: 0.65,
    delay: 3.5,
    duration: 9,
  },
];

const textStyle = {
  anchorX: "center" as "center",
  outlineWidth: 0.0015,
  outlineOffsetX: 0.02,
  outlineOffsetY: 0.02,
  outlineBlur: 0.085,
  outlineColor: "#313131",
  outlineOpacity: 0.35,
  font: "https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff",
};

function WelcomeText() {
  //todo: make global state (preact signals) if want to only play once even if person returns to homepage. Or if need to time a arrow || direction animation after
  const [RenderWelcomeAnimation, setRenderWelcomeAnimation] = useState(true);
  // * dismount Welcome animation component when animation finishes
  useEffect(() => {
    setTimeout(() => {
      setRenderWelcomeAnimation(false);
      console.log(`Dismount Welcome Animation`);
    }, 37000);
  }, []);

  return (
    <>
      {RenderWelcomeAnimation && (
        <group>
          {texts.map((tex, index) => (
            <mesh key={index} position={tex.position}>
              <Text {...textStyle} fontSize={tex.fontSize}>
                {tex.content}
                <WelcomeTextMaterial
                  delay={tex.delay}
                  duration={tex.duration}
                />
              </Text>
            </mesh>
          ))}
        </group>
      )}
    </>
  );
}

export default React.memo(WelcomeText);
