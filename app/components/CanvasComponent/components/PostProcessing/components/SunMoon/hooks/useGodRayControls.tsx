import { useControls } from "leva";

export const useGodRaysControls = (page: number) => {
  const {
    // sunPosition,
    sunColor,
    sunOpacity,
    sphereRadius,
    samples,
    density,
    decay,
    weight,
    exposure,
    clampMax,
    blur,
  } = useControls("godrays", {
    // sunPosition: { x: 1, y: -1.35, z: -8 },
    sunColor: "#349ef5", // #e5d093, #34f57e,#349ef5,#e193cb
    sunOpacity: { value: 1.0, min: 0, max: 1, step: 0.1 },
    sphereRadius: {
      value: 200,
      min: 0.001,
      max: 1000,
      step: 0.001,
    },
    samples: { value: 45, min: 1, max: 100, step: 1 },
    density: { value: 0.49, min: 0, max: 1, step: 0.01 },
    decay: { value: 0.87, min: 0, max: 1, step: 0.01 }, // .94 // .9
    weight: { value: 1, min: 0, max: 1, step: 0.01 },
    exposure: { value: 0.93, min: 0, max: 1, step: 0.01 }, //.93 //.48
    clampMax: { value: 1.0, min: 0, max: 1, step: 0.01 },
    blur: { value: 0.4, min: 0, max: 1, step: 0.01 },
  });

  return {
    // sunPosition,
    sunColor,
    sunOpacity,
    sphereRadius,
    samples,
    density,
    decay,
    weight,
    exposure,
    clampMax,
    blur,
  };
};
