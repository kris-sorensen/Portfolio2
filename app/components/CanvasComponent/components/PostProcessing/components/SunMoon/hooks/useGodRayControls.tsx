import { useControls } from "leva";

export const useGodRaysControls = (page, Page2PropsActive) => {
  const isPage2Active = Page2PropsActive;

  const {
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
    sunColor: isPage2Active ? "#e193cb" : "#349ef5",
    sunOpacity: { value: isPage2Active ? 0.8 : 1.0, min: 0, max: 1, step: 0.1 },
    sphereRadius: {
      value: isPage2Active ? 130 : 130,
      min: 0.001,
      max: 1000,
      step: 0.001,
    },
    samples: { value: isPage2Active ? 50 : 45, min: 1, max: 100, step: 1 },
    density: { value: isPage2Active ? 0.55 : 0.49, min: 0, max: 1, step: 0.01 },
    decay: { value: isPage2Active ? 0.9 : 0.87, min: 0, max: 1, step: 0.01 },
    weight: { value: isPage2Active ? 0.95 : 1, min: 0, max: 1, step: 0.01 },
    exposure: {
      value: isPage2Active ? 0.88 : 0.93,
      min: 0,
      max: 1,
      step: 0.01,
    },
    clampMax: { value: isPage2Active ? 0.95 : 1.0, min: 0, max: 1, step: 0.01 },
    blur: { value: isPage2Active ? 0.5 : 0.4, min: 0, max: 1, step: 0.01 },
  });

  return {
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
