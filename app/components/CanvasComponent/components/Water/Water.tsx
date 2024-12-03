import { useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";
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

let waterUniforms;
let heightmapVariable;
let gpuCompute;

const Water = () => {
  const { viewport, gl, pointer } = useThree();

  // Plane controls
  const {
    sizeX,
    sizeY,
    positionX,
    positionY,
    positionZ,
    rotationX,
    rotationY,
    rotationZ,
    receiveShadow,
    scaleX,
    scaleY,
    scaleZ,
  } = useControls("Plane Settings", {
    sizeX: { value: 150, min: 10, max: 1000, step: 1 },
    sizeY: { value: 150, min: 10, max: 1000, step: 1 },
    positionX: { value: 0, min: -500, max: 500, step: 1 },
    positionY: { value: -48, min: -500, max: 500, step: 1 },
    positionZ: { value: -125, min: -500, max: 500, step: 1 },
    rotationX: {
      value: -Math.PI / 2,
      min: -Math.PI,
      max: Math.PI,
      step: Math.PI / 16,
    },
    rotationY: { value: 0, min: -Math.PI, max: Math.PI, step: Math.PI / 16 },
    rotationZ: {
      value: -0.8,
      min: -Math.PI,
      max: Math.PI,
      step: Math.PI / 64,
    },
    receiveShadow: { value: true },
    scaleX: { value: 1, min: 0.1, max: 10, step: 0.1 },
    scaleY: { value: 1, min: 0.1, max: 10, step: 0.1 },
    scaleZ: { value: 1, min: 0.1, max: 10, step: 0.1 },
  });

  // Ground controls
  const {
    groundSizeX,
    groundSizeY,
    groundPositionX,
    groundPositionY,
    groundPositionZ,
    groundRotationX,
    groundRotationY,
    groundRotationZ,
    groundColor,
  } = useControls("Ground Settings", {
    groundSizeX: { value: 1500, min: 100, max: 2000, step: 10 },
    groundSizeY: { value: 400, min: 100, max: 1000, step: 10 },
    groundPositionX: { value: 0, min: -500, max: 500, step: 1 },
    groundPositionY: { value: -49, min: -100, max: 100, step: 1 },
    groundPositionZ: { value: -93, min: -500, max: 500, step: 1 },
    groundRotationX: {
      value: -Math.PI / 2,
      min: -Math.PI,
      max: Math.PI,
      step: Math.PI / 16,
    },
    groundRotationY: {
      value: 0,
      min: -Math.PI,
      max: Math.PI,
      step: Math.PI / 16,
    },
    groundRotationZ: {
      value: 0,
      min: -Math.PI,
      max: Math.PI,
      step: Math.PI / 16,
    },
    groundColor: { value: "#00ff66" },
  });

  const BOUNDS = 350;
  const WIDTH = 512;

  const waterMaterial = new CustomShaderMaterialImpl({
    baseMaterial: MeshPhysicalMaterial,
    vertexShader: waterVertexShader,
    uniforms: UniformsUtils.merge([
      ShaderLib["physical"].uniforms,
      { heightmap: { value: null } },
    ]),
  });

  waterMaterial.transmission = 1;
  waterMaterial.metalness = 0;
  waterMaterial.roughness = 0;
  waterMaterial.blur = 1;
  waterMaterial.color = new Color(0x217d9c);
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
    value: new Vector2(1000, 1000),
  };
  heightmapVariable.material.uniforms["mouseSize"] = { value: 10.0 };
  heightmapVariable.material.uniforms["viscosityConstant"] = { value: 0.98 };
  heightmapVariable.material.uniforms["heightCompensation"] = { value: 0 };
  heightmapVariable.material.defines.BOUNDS = BOUNDS.toFixed(1);

  const error = gpuCompute.init();
  if (error !== null) {
    console.error(error);
  }

  useFrame(() => {
    const uniforms = heightmapVariable.material.uniforms;
    uniforms["mousePos"].value.set(pointer.x * 800, -pointer.y * 800);
    gpuCompute.compute();
    waterUniforms["heightmap"].value =
      gpuCompute.getCurrentRenderTarget(heightmapVariable).texture;
  });

  return (
    <group>
      {/* Water */}
      <mesh
        material={waterMaterial}
        receiveShadow={receiveShadow}
        rotation={[rotationX, rotationY, rotationZ]}
        position={[positionX, positionY, positionZ]}
        scale={[scaleX, scaleY, scaleZ]}
      >
        <boxGeometry args={[sizeX, sizeY, 2, WIDTH, WIDTH]} />
      </mesh>
      {/* Ground */}
      {/* <mesh
        position={[groundPositionX, groundPositionY, groundPositionZ]}
        rotation={[groundRotationX, groundRotationY, groundRotationZ]}
      >
        <planeGeometry args={[groundSizeX, groundSizeY, 24, 24]} />
        <meshBasicMaterial color={groundColor} />
      </mesh> */}
    </group>
  );
};

export default Water;
