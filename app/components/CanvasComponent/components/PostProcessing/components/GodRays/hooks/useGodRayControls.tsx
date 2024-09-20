import { useControls } from "leva";

export const useGodRaysControls = () => {
  const {
    sunPosition,
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
    sunPosition: { x: 0, y: 1.35, z: -4 },
    sunColor: "#349ef5", // #e5d093, #34f57e,#349ef5,#e193cb
    sunOpacity: { value: 1.0, min: 0, max: 1, step: 0.1 },
    sphereRadius: { value: 0.4, min: 0.000001, max: 100, step: 0.0001 },
    samples: { value: 47, min: 1, max: 100, step: 1 },
    density: { value: 0.49, min: 0, max: 1, step: 0.01 },
    decay: { value: 0.88, min: 0, max: 1, step: 0.01 }, // .94 // .9
    weight: { value: 0.48, min: 0, max: 1, step: 0.01 },
    exposure: { value: 0.93, min: 0, max: 1, step: 0.01 }, //.93 //.48
    clampMax: { value: 1.0, min: 0, max: 1, step: 0.01 },
    blur: { value: 0.4, min: 0, max: 1, step: 0.01 },
  });

  return {
    sunPosition,
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
