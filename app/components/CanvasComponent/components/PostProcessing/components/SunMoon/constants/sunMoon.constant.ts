// constants.ts

// Animation
export const scaleFactor = 1;
export const totalDuration = 12.0;

// Arc Configuration
export const arcRadiusScale = 0.3;
export const leftArcRadiusOffset = -50;
export const rightArcRadiusOffset = 150;
export const arcCenterYOffset = -200;

// Animation Angles (as fractions of Math.PI)
export const initialArcAngle = 0.63;
export const reverseInitialArcAngle = 0.75;
export const newArcAngle = 0.68;

// Directional Light Settings
export const directionalLightOffsetY = 100;
export const directionalLightTargetY = -390;
export const directionalLightHelperSize = 500;
export const showDirectionalLightHelper = false;

// Light Shadow Camera
export const lightShadowCameraLeft = -2000;
export const lightShadowCameraRight = 2000;
export const lightShadowCameraTop = 2000;
export const lightShadowCameraBottom = -2000;
export const lightShadowCameraFar = 5000;

// Parallax Settings
export const parallaxLerpSpeed = 0.006;

// Light Intensity
export const ambientLightMinIntensity = 0.1;
export const ambientLightMaxIntensity = 2;
export const directionalLightMinIntensity = 0;
export const directionalLightMaxIntensity = 1;
export const ambientLightAnimProgressMultiplier = 0.5;
export const directionalLightIntensityOffset = 0.5;

export const page2GodRaysProps = {
  samples: 45,
  density: 0.8,
  decay: 0.9,
  weight: 0.6,
  exposure: 1,
  clampMax: 1.0,
  blur: 1,
  sunOpacity: 0.2,
};
