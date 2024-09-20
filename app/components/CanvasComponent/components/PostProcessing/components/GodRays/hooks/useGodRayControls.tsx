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
    sunPosition: { x: 0, y: 0, z: -4 }, // as per the screenshot
    sunColor: "#e5d093", // matching the color
    sunOpacity: { value: 1.0, min: 0, max: 1, step: 0.1 }, // as shown
    sphereRadius: { value: 0.4, min: 0.000001, max: 100, step: 0.0001 }, // updated value from slider
    samples: { value: 47, min: 1, max: 100, step: 1 }, // updated value from slider
    density: { value: 0.49, min: 0, max: 1, step: 0.01 }, // updated value from slider
    decay: { value: 0.9, min: 0, max: 1, step: 0.01 }, // updated value from slider
    weight: { value: 0.48, min: 0, max: 1, step: 0.01 }, // updated value from slider
    exposure: { value: 0.55, min: 0, max: 1, step: 0.01 }, // updated value from slider
    clampMax: { value: 1.0, min: 0, max: 1, step: 0.01 }, // as shown
    blur: { value: 0.4, min: 0, max: 1, step: 0.01 }, // updated value from slider
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
