import { useControls } from "leva";
import { page } from "../../../../../../../constants/settings.const";

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
    sunPosition: { x: 1, y: -1.35, z: -8 },
    sunColor: page === 2 ? "#fde216" : "#349ef5", // #e5d093, #34f57e,#349ef5,#e193cb
    sunOpacity: { value: page === 2 ? 0.2 : 1.0, min: 0, max: 1, step: 0.1 },
    sphereRadius: { value: 0.4, min: 0.001, max: 100, step: 0.001 },
    samples: { value: 45, min: 1, max: 100, step: 1 },
    density: { value: 0.49, min: 0, max: 1, step: 0.01 },
    decay: { value: 0.87, min: 0, max: 1, step: 0.01 }, // .94 // .9
    weight: { value: 1, min: 0, max: 1, step: 0.01 },
    exposure: { value: page === 2 ? 1 : 0.93, min: 0, max: 1, step: 0.01 }, //.93 //.48
    clampMax: { value: 1.0, min: 0, max: 1, step: 0.01 },
    blur: { value: page === 2 ? 1 : 0.4, min: 0, max: 1, step: 0.01 },
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
