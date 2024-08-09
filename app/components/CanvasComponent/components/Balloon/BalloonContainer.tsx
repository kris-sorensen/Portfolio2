import React, { useEffect, useState } from "react";
import * as THREE from "three";
import { Balloon } from "./Balloon";

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
  const x = (Math.random() * 1.3 - 0.65) * 20; // Random x position within a range
  const z = (Math.random() * 1.5 - 0.75) * 20; // Random z position within a range
  return [x, 1.9, z]; // Y position is constant at 1.9
};

const BalloonContainer = () => {
  const [balloons, setBalloons] = useState([]);

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
      Math.random() * 3000 + 1000
    ); // Random interval between 1000ms and 4000ms

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);
  return (
    <group>
      {balloons.map((balloon) => (
        <Balloon
          key={balloon.id}
          position={balloon.position}
          color={balloon.color}
          onRemove={() => removeBalloon(balloon.id)} // Pass the removal callback
        />
      ))}
    </group>
  );
};

export default BalloonContainer;
