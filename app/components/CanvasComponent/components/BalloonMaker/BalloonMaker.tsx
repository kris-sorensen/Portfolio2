import React from "react";
import Balloon from "../Balloon2/Balloon2";

interface BalloonData {
  id: number;
  fragmentShader: string;
  vertexShader: string;
}

interface BalloonMakerProps {
  position: [number, number, number];
  balloonDataArray: BalloonData[];
  onRemove: (id: number) => void;
}

const BalloonMaker: React.FC<BalloonMakerProps> = ({
  position,
  balloonDataArray,
  onRemove,
}) => {
  return (
    <>
      {balloonDataArray.map((balloon) => (
        <Balloon
          key={balloon.id}
          fragmentShader={balloon.fragmentShader}
          vertexShader={balloon.vertexShader}
          position={position} // using the passed `position` prop
          onRemove={() => onRemove(balloon.id)}
        />
      ))}
    </>
  );
};

export default BalloonMaker;
