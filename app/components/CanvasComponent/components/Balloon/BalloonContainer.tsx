import React, { useEffect, useState } from "react";
import * as THREE from "three";
import Balloon from "./Balloon";

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

const getRandomPosition = (): [number, number, number] => {
  const x = (Math.random() * 1.5 - 0.75) * 20;
  const z = (Math.random() * 1.5 - 0.75) * 20;
  return [x, 1.9, z];
};

const BalloonContainer: React.FC = () => {
  const [balloons, setBalloons] = useState<BalloonProps[]>([]);

  const addBalloon = () => {
    const newBalloon: BalloonProps = {
      id: Date.now(),
      position: getRandomPosition(),
      color: getRandomColor(),
    };
    setBalloons((prevBalloons) => [...prevBalloons, newBalloon]);
  };

  const removeBalloon = (id: number) => {
    setBalloons((prevBalloons) =>
      prevBalloons.filter((balloon) => balloon.id !== id)
    );
  };

  useEffect(() => {
    const interval = setInterval(
      () => {
        addBalloon();
      },
      Math.random() * 3000 + 1000
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <group>
      {balloons.map((balloon) => (
        <Balloon
          key={balloon.id}
          position={balloon.position}
          color={balloon.color}
          onRemove={() => removeBalloon(balloon.id)}
        />
      ))}
    </group>
  );
};

export default BalloonContainer;
