import React, { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  ShaderLib,
  UniformsUtils,
  Color,
  Vector2,
  MeshPhysicalMaterial,
  IUniform,
} from "three";
import * as THREE from "three";
import { GPUComputationRenderer, Variable } from "three-stdlib";
import {
  heightmapFragmentShader,
  waterVertexShader,
} from "./shader/waterShader";
import CustomShaderMaterialImpl from "three-custom-shader-material/vanilla";

// Constants
const BOUNDS = 3000;
const WIDTH = 512;
const WATER_OFFSET = 140; // Keep water 200px above the bottom of the screen

let waterUniforms: { [key: string]: IUniform };
let heightmapVariable: Variable;
let gpuCompute: GPUComputationRenderer | null = null;

const Water = React.memo(() => {
  const { gl, pointer, camera } = useThree();
  const waterMeshRef = useRef<THREE.Mesh>(null);

  console.log(`water component`);

  // Ensure we initialize GPUComputationRenderer only once
  useEffect(() => {
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

    heightmapVariable.material.defines =
      heightmapVariable.material.defines || {};
    heightmapVariable.material.defines.BOUNDS = BOUNDS.toFixed(1);

    const error = gpuCompute.init();
    if (error) console.error(error);

    return () => {
      // Cleanup
      gpuCompute?.dispose();
    };
  }, [gl]);

  // Custom Shader Material
  const waterMaterial = new CustomShaderMaterialImpl({
    baseMaterial: MeshPhysicalMaterial,
    vertexShader: waterVertexShader,
    uniforms: UniformsUtils.merge([
      ShaderLib["physical"].uniforms,
      { heightmap: { value: null } },
    ]),
  });

  // Material attributes
  (waterMaterial as any).transmission = 1;
  (waterMaterial as any).metalness = 0;
  (waterMaterial as any).roughness = 0;
  (waterMaterial as any).color = new Color("#183774");

  // Ensuring defines is initialized
  if (!waterMaterial.defines) {
    waterMaterial.defines = {};
  }
  waterMaterial.defines.WIDTH = WIDTH.toFixed(1);
  waterMaterial.defines.BOUNDS = BOUNDS.toFixed(1);

  waterUniforms = waterMaterial.uniforms;

  useFrame(() => {
    if (!gpuCompute || !heightmapVariable || !waterMeshRef.current) return;

    // Ensure camera is orthographic
    if ("isOrthographicCamera" in camera) {
      // Set water Y-position based on the bottom of the orthographic camera + offset
      waterMeshRef.current.position.y = camera.bottom + WATER_OFFSET;
    }

    // Update GPUCompute
    const uniforms = heightmapVariable.material.uniforms;
    uniforms["mousePos"].value.set(0, -pointer.y * 200);
    gpuCompute.compute();
    waterUniforms["heightmap"].value =
      gpuCompute.getCurrentRenderTarget(heightmapVariable).texture;
  });

  return (
    <mesh
      ref={waterMeshRef}
      material={waterMaterial}
      position={[0, -320, 0]} // Will be dynamically updated in useFrame()
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <planeGeometry args={[BOUNDS, BOUNDS, WIDTH, WIDTH]} />
    </mesh>
  );
});

Water.displayName = "Water";

export default Water;
