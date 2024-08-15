import React, { useState, useEffect } from "react";
import * as THREE from "three";
import Balloon from "./Balloon";
import { useThree } from "@react-three/fiber";

interface BalloonProps {
  id: number;
  position: [number, number, number];
  color: THREE.Color;
}

const getRandomColor = (): THREE.Color => {
  const colors = [
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "#ff69b4",
    "#00ffff",
    "#ffff00",
  ];
  return new THREE.Color(colors[Math.floor(Math.random() * colors.length)]);
};

const BalloonContainer: React.FC = () => {
  const [balloons, setBalloons] = useState<BalloonProps[]>([]);
  const { camera, gl, pointer, viewport } = useThree();

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      // Convert screen coordinates to normalized device coordinates
      const pointer = new THREE.Vector3(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1,
        0 // Use z=0 to project onto the near plane of the camera
      );

      // Unproject the normalized coordinates to 3D space
      pointer.unproject(camera);

      // Calculate the direction from the camera to the pointer position
      const direction = pointer.sub(camera.position).normalize();

      // Calculate the distance from the camera to the plane where we want to place the object
      const distance = -camera.position.z / direction.z;

      // Calculate the final position in 3D space
      const finalPosition = camera.position
        .clone()
        .add(direction.multiplyScalar(distance));
      console.log(`finalPosition`, finalPosition);
      // Add the balloon at the calculated position
      addBalloon([finalPosition.x, finalPosition.y + 11.8, 0]);
    };

    gl.domElement.addEventListener("click", handleClick);

    return () => {
      gl.domElement.removeEventListener("click", handleClick);
    };
  }, [camera, gl]);

  const addBalloon = (position: [number, number, number]) => {
    const newBalloon: BalloonProps = {
      id: Date.now(),
      position,
      color: getRandomColor(),
    };
    setBalloons((prevBalloons) => [...prevBalloons, newBalloon]);
  };

  return (
    <group>
      {balloons.map((balloon) => (
        <Balloon
          key={balloon.id}
          position={balloon.position}
          color={balloon.color}
          onRemove={() =>
            setBalloons((prevBalloons) =>
              prevBalloons.filter((b) => b.id !== balloon.id)
            )
          }
        />
      ))}
    </group>
  );
};

export default BalloonContainer;
