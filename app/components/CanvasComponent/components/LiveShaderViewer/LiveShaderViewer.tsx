import { Plane } from "@react-three/drei";
import React, { useEffect, useState } from "react";
import {
  initialFragmentShader,
  initialVertexShader,
} from "../../../../data/currentShader";

const ShaderPlatform = ({ vertexShader, fragmentShader }) => {
  return <Plane>{/* <Shader/> */}</Plane>;
};

const LiveShaderViewer = () => {
  // * receive updates and rerender shader
  // * Apply to platform
  // *

  const [FragmentShader, setFragmentShader] = useState(initialFragmentShader);
  const [VertexShader, setVertexShader] = useState(initialVertexShader);

  useEffect(() => {}, [UpdateLiveShader]);

  return (
    <ShaderPlatform
      fragmentShader={FragmentShader}
      vertexShader={VertexShader}
    />
  );
};

export default LiveShaderViewer;
