import React, { useRef, useState } from "react";
import Balloon from "../Balloon2/Balloon2";
import {
  retrieveFragmentShader,
  retrieveVertexShader,
} from "../../../../data/currentShader";

interface BalloonData {
  id: number;
  fragmentShader: string;
  vertexShader: string;
}

interface BalloonMakerProps {
  position: [number, number, number];
}

const BalloonMaker: React.FC<BalloonMakerProps> = (props) => {
  const [balloonDataArray, setBalloonDataArray] = useState<BalloonData[]>([]);
  const balloonCounter = useRef(1);

  const addBalloon = () => {
    console.log(`add balloon`);
    const fragmentShader = retrieveFragmentShader();
    const vertexShader = retrieveVertexShader();
    const newBalloon: BalloonData = {
      id: balloonCounter.current,
      fragmentShader,
      vertexShader,
    };
    setBalloonDataArray((prevArray) => [...prevArray, newBalloon]);
    balloonCounter.current += 1;
  };

  const removeBalloon = (id: number) => {
    setBalloonDataArray((prevArray) =>
      prevArray.filter((balloon) => balloon.id !== id)
    );
  };

  return (
    <>
      {balloonDataArray.map((balloon) => (
        <Balloon
          key={balloon.id}
          fragmentShader={balloon.fragmentShader}
          vertexShader={balloon.vertexShader}
          position={[0, 0, 0]}
          onRemove={() => removeBalloon(balloon.id)}
        />
      ))}

      {/* Add Balloon Button as a 3D Mesh */}
      <mesh
        {...props}
        onClick={addBalloon} // Register click event for adding a balloon
      >
        <boxGeometry args={[2, 2, 2]} />
        <meshBasicMaterial color="red" fog={false} />
      </mesh>
    </>
  );
};

export default BalloonMaker;
