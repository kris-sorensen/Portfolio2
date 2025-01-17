import React from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  ShaderLib,
  UniformsUtils,
  Color,
  Vector2,
  MeshPhysicalMaterial,
} from "three";
import { GPUComputationRenderer } from "three-stdlib";
import {
  heightmapFragmentShader,
  waterVertexShader,
} from "./shader/waterShader";
import CustomShaderMaterialImpl from "three-custom-shader-material/vanilla";

const HEIGHT = 400;
// const WIDTH = 2400;
const BOUNDS = 3000;
// Texture width
// const WIDTH = 128;
const WIDTH = 512;

let waterUniforms;
let heightmapVariable;
let gpuCompute;

const Water = React.memo(() => {
  const { viewport, gl, pointer } = useThree();
  console.log(`water component`);

  const waterMaterial = new CustomShaderMaterialImpl({
    baseMaterial: MeshPhysicalMaterial,
    vertexShader: waterVertexShader,
    uniforms: UniformsUtils.merge([
      ShaderLib["physical"].uniforms,
      { heightmap: { value: null } },
    ]),
  });

  // Material attributes
  waterMaterial.transmission = 1;
  waterMaterial.metalness = 0;
  waterMaterial.roughness = 0;
  waterMaterial.color = new Color("#183774");
  // waterMaterial.envMapIntensity = 5;
  // waterMaterial.color = new Color(0x217d9c);

  // Defines
  waterMaterial.defines.WIDTH = WIDTH.toFixed(1);
  waterMaterial.defines.BOUNDS = BOUNDS.toFixed(1);

  waterUniforms = waterMaterial.uniforms;

  gpuCompute = new GPUComputationRenderer(WIDTH, WIDTH, gl);

  const heightmap0 = gpuCompute.createTexture();
  heightmapVariable = gpuCompute.addVariable(
    "heightmap",
    heightmapFragmentShader,
    heightmap0
  );
  gpuCompute.setVariableDependencies(heightmapVariable, [heightmapVariable]);
  heightmapVariable.material.uniforms["mousePos"] = {
    value: new Vector2(10000, 10000),
  };
  heightmapVariable.material.uniforms["mouseSize"] = { value: 20.0 };
  heightmapVariable.material.uniforms["viscosityConstant"] = { value: 0.98 };
  heightmapVariable.material.uniforms["heightCompensation"] = { value: 0 };
  heightmapVariable.material.defines.BOUNDS = BOUNDS.toFixed(1);

  const error = gpuCompute.init();
  if (error !== null) {
    console.error(error);
  }

  useFrame(() => {
    const uniforms = heightmapVariable.material.uniforms;
    // uniforms["mousePos"].value.set(pointer.x * 200, -pointer.y * 200);
    uniforms["mousePos"].value.set(0, -pointer.y * 200);
    gpuCompute.compute();
    waterUniforms["heightmap"].value =
      gpuCompute.getCurrentRenderTarget(heightmapVariable).texture;
  });
  console.log(gl.info.render.calls);

  return (
    <>
      <mesh
        material={waterMaterial}
        position={[0, -320, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        // scale={0.4}
        // castShadow
        // receiveShadow
      >
        <planeGeometry args={[BOUNDS, BOUNDS, WIDTH, WIDTH]} />
      </mesh>
    </>
  );
});

export default Water;
