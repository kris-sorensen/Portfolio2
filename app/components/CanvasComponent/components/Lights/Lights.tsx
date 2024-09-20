import { Environment } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useRef } from "react";

const Lights = () => {
  const pointLightRef = useRef(null);
  const { scene, viewport } = useThree();

  // useEffect(() => {
  //   if (pointLightRef.current) {
  //     const helper = new THREE.PointLightHelper(pointLightRef.current, 5); // The second argument controls the size of the helper
  //     scene.add(helper);
  //     return () => {
  //       scene.remove(helper); // Clean up the helper when the component unmounts
  //     };
  //   }
  // }, [scene]);

  return (
    <>
      <directionalLight
        position={[0, 5, 300]}
        rotation={[0, 0, Math.PI / 2]}
        intensity={4}
        castShadow
      />
      {/* 
      <directionalLight
        position={[0, 0, -15]}
        rotation={[0, 0, Math.PI / 2]}
        intensity={3}
        // target={[0, 0, 0]}
      /> */}
      {/* <pointLight
        ref={pointLightRef}
        position={[0, 0, 2]}
        distance={0.025}
        intensity={1}
        decay={1}
        // color="#00f2de"
        color="#ff6cb5"
      /> */}
      {/* <pointLight
        ref={pointLightRef}
        position={[0, 0, 0]}
        distance={viewport.width}
        intensity={4}
        decay={5}
      /> */}
      {/* <ambientLight intensity={1} /> */}
      {/* <Environment preset="warehouse" /> */}
    </>
  );
};

export default Lights;
