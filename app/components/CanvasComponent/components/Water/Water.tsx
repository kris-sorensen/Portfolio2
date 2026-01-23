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
import { Environment } from "@react-three/drei";
import { useRef, useMemo } from "react";

const HEIGHT = 400;
// const WIDTH = 2400;
const BOUNDS = 3000;
// Texture width
// const WIDTH = 128;
const WIDTH = 512;

const Water = () => {
  const { viewport, gl, pointer } = useThree();

  const waterMaterialRef = useRef(null);
  const gpuComputeRef = useRef(null);
  const heightmapVariableRef = useRef(null);
  const waterUniformsRef = useRef(null);
  const initializationRef = useRef(false);
  const frameCounterRef = useRef(0);

  // Initialize water material and GPU compute only once
  if (!initializationRef.current) {
    initializationRef.current = true;

    waterMaterialRef.current = new CustomShaderMaterialImpl({
      baseMaterial: MeshPhysicalMaterial,
      vertexShader: waterVertexShader,
      uniforms: UniformsUtils.merge([
        ShaderLib["physical"].uniforms,
        { heightmap: { value: null } },
      ]),
    });

    // Material attributes
    waterMaterialRef.current.transmission = 1;
    waterMaterialRef.current.metalness = 0;
    waterMaterialRef.current.roughness = 0;
    waterMaterialRef.current.color = new Color("#183774");
    // waterMaterialRef.current.envMapIntensity = 5;
    // waterMaterialRef.current.color = new Color(0x217d9c);

    // Defines
    waterMaterialRef.current.defines.WIDTH = WIDTH.toFixed(1);
    waterMaterialRef.current.defines.BOUNDS = BOUNDS.toFixed(1);

    waterUniformsRef.current = waterMaterialRef.current.uniforms;

    gpuComputeRef.current = new GPUComputationRenderer(WIDTH, WIDTH, gl);

    const heightmap0 = gpuComputeRef.current.createTexture();
    heightmapVariableRef.current = gpuComputeRef.current.addVariable(
      "heightmap",
      heightmapFragmentShader,
      heightmap0
    );
    gpuComputeRef.current.setVariableDependencies(heightmapVariableRef.current, [heightmapVariableRef.current]);
    heightmapVariableRef.current.material.uniforms["mousePos"] = {
      value: new Vector2(10000, 10000),
    };
    heightmapVariableRef.current.material.uniforms["mouseSize"] = { value: 20.0 };
    heightmapVariableRef.current.material.uniforms["viscosityConstant"] = { value: 0.98 };
    heightmapVariableRef.current.material.uniforms["heightCompensation"] = { value: 0 };
    heightmapVariableRef.current.material.defines.BOUNDS = BOUNDS.toFixed(1);

    const error = gpuComputeRef.current.init();
    if (error !== null) {
      console.error(error);
    }
  }

  useFrame(() => {
    const uniforms = heightmapVariableRef.current.material.uniforms;
    // uniforms["mousePos"].value.set(pointer.x * 200, -pointer.y * 200);
    uniforms["mousePos"].value.set(0, -pointer.y * 200);

    // Run GPU computation every other frame for performance
    if (frameCounterRef.current % 2 === 0) {
      gpuComputeRef.current.compute();
      waterUniformsRef.current["heightmap"].value =
        gpuComputeRef.current.getCurrentRenderTarget(heightmapVariableRef.current).texture;
    }
    frameCounterRef.current++;
  });

  const envMap = useMemo(() => <Environment preset="sunset" />, []);

  return (
    <>
      {envMap}
      <mesh
        material={waterMaterialRef.current}
        position={[0, -320, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        // scale={0.4}
        // castShadow
        // receiveShadow
      >
        <planeGeometry args={[viewport.width, BOUNDS, 128, 128]} />
      </mesh>
    </>
  );
};

export default Water;
