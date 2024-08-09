import React, { useRef, useState, useEffect } from "react";
import { Reflector } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import Logo from "./components/Logo/Logo";
import { Balloon } from "./components/Balloon/Balloon";

const material = new THREE.MeshPhysicalMaterial({
  color: new THREE.Color("#932CE6").convertSRGBToLinear(),
  roughness: 0,
  clearcoat: 1,
  clearcoatRoughness: 0,
});

const getRandomColor = () => {
  const colors = [
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "#ff00ff",
    "#00ffff",
    "#ffff00",
  ];
  return new THREE.Color(colors[Math.floor(Math.random() * colors.length)]);
};

const getRandomPosition = () => {
  const x = (Math.random() - 0.5) * 20; // Random x position within a range
  const z = (Math.random() * 1.5 - 0.75) * 20; // Random z position within a range
  return [x, 1.9, z]; // Y position is constant at 1.9
};

const Scene = (props) => {
  const group = useRef();
  const { viewport } = useThree();
  const [balloons, setBalloons] = useState([]);

  // Function to add a new balloon
  const addBalloon = () => {
    const newBalloon = {
      id: Date.now(), // Unique ID
      position: getRandomPosition(),
      color: getRandomColor(),
    };
    setBalloons((prevBalloons) => [...prevBalloons, newBalloon]);
  };

  // Function to remove a balloon by ID
  const removeBalloon = (id) => {
    setBalloons((prevBalloons) =>
      prevBalloons.filter((balloon) => balloon.id !== id)
    );
  };

  useEffect(() => {
    // Add a balloon at a random interval between 1-4 seconds
    const interval = setInterval(
      () => {
        addBalloon();
      },
      Math.random() * 7000 + 1000
    ); // Random interval between 1000ms and 4000ms

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <group>
      <Logo />
      <group ref={group} {...props} dispose={null}>
        <Reflector
          resolution={1024}
          receiveShadow
          mirror={0}
          mixBlur={1}
          mixStrength={0.3}
          depthScale={1}
          minDepthThreshold={0.8}
          maxDepthThreshold={1}
          position={[0, 0, 8]}
          scale={[2, 2, 1]}
          rotation={[-Math.PI / 2, 0, Math.PI]}
          args={[90, 90]}
        >
          {(Material, props) => (
            <Material
              metalness={0.25}
              color="#932CE6"
              roughness={1}
              {...props}
            />
          )}
        </Reflector>

        {balloons.map((balloon) => (
          <Balloon
            key={balloon.id}
            position={balloon.position}
            color={balloon.color}
            onRemove={() => removeBalloon(balloon.id)} // Pass the removal callback
          />
        ))}
      </group>
    </group>
  );
};

export default Scene;
