import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function Rig() {
  const [vec] = useState(() => new THREE.Vector3());
  const { camera, pointer } = useThree();
  const rigActive = useRef(true);

  useEffect(() => {
    setTimeout(() => {
      rigActive.current = false;
    }, 2000);
  }, []);

  useFrame(() => {
    // * Parallax effect
    camera.position.lerp(vec.set(-pointer.x * 3, -pointer.y * 1.5, 1), 0.0465);
    if (!rigActive.current) return;
    // * Initial Camera Movement
    if (camera.isOrthographicCamera) {
      camera.zoom = THREE.MathUtils.lerp(camera.zoom, 10, 0.0465);
      camera.updateProjectionMatrix();
    }
  });
  return null;
}

export default Rig;
