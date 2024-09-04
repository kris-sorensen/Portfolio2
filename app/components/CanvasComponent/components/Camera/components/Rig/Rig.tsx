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
    if (camera.isOrthographicCamera) {
      camera.zoom = THREE.MathUtils.lerp(camera.zoom, 18, 0.0465);
      camera.updateProjectionMatrix();
    }

    // * Parallax effect
    // if (!rigActive.current) return;
    // camera.position.lerp(vec.set(pointer.x * 3, pointer.y * 1.5, 60), 0.0465);
  });
  return null;
}

export default Rig;
