import React, { useState, useEffect, useRef } from "react";
import Balloon from "../Balloon2/Balloon2";
import * as THREE from "three";
import { retrieveVertexShader } from "@/app/data/currentShader";

const colors = [
  "#00f2de", // Neon Cyan (already present)
  "#ff6cb5", // Neon Pink (already present)
  "#39ff14", // Neon Green
  "#ff073a", // Neon Red
  "#ff9f00", // Neon Orange
  "#be00ff", // Neon Purple
  "#ffff33", // Neon Yellow
];

interface BalloonData {
  id: number;
  fragmentShader: string;
  vertexShader: string;
  position: [number, number, number];
  color: string;
}

const BalloonMaker: React.FC = () => {
  const [balloonDataArray, setBalloonDataArray] = useState<BalloonData[]>([]);
  const balloonCounter = useRef(1);
  const balloonCount = useRef(0);

  // Function to add a new balloon
  const addBalloon = (fragmentShader: string) => {
    const vertexShader = retrieveVertexShader(); // use existing logic for vertex shader
    const newBalloon: BalloonData = {
      id: balloonCounter.current,
      fragmentShader,
      vertexShader,
      position: [
        Math.random() * 1 - 0.5, // x between -1 and 1
        Math.random() - 2, // y remains Math.random() - 2
        Math.random(), // z between 0 and 1
      ],
      color: colors[Math.floor(Math.random() * colors.length)],
    };
    setBalloonDataArray((prevArray) => [...prevArray, newBalloon]);
    balloonCounter.current += 1;
  };

  // Function to remove a balloon
  const removeBalloon = (id: number) => {
    setBalloonDataArray((prevArray) =>
      prevArray.filter((balloon) => balloon.id !== id)
    );
  };

  // Effect to add balloons at intervals
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const makeBalloons = setInterval(() => {
        if (balloonCount.current === 12) {
          clearInterval(makeBalloons); // Stop when balloonCount reaches 140
          return;
        }
        addBalloon(""); // Adding empty string as fragmentShader for now
        balloonCount.current += 1;
      }, 100);
    }, 18000);

    // Cleanup the interval on component unmount
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      {balloonDataArray.map((balloon) => (
        <Balloon
          key={balloon.id}
          fragmentShader={balloon.fragmentShader}
          vertexShader={balloon.vertexShader}
          position={balloon.position}
          onRemove={() => removeBalloon(balloon.id)}
          color={balloon.color}
        />
      ))}
    </>
  );
};

export default BalloonMaker;
