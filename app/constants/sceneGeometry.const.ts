// Central Scene Geometry Configuration
// All spatial dimensions and positioning for the 3D scene

// ========================================
// BACKGROUND SPHERE
// ========================================
export const sphereRadius = 2000;
export const sphereWidthSegments = 64;
export const sphereHeightSegments = 64;
export const spherePosition = [0, 0, 0] as const;

// ========================================
// WATER SURFACE
// ========================================
// Water positioning (absolute Y in world space)
// Ground group: y = -70
// Water offset within Ground: y = -320
// Absolute water Y position: -390

export const HEIGHT = 400;
export const BOUNDS = 3000;
export const WIDTH = 512; // Texture width for GPU computation

// Water circle radius calculation:
// At water height y = -390, the circle that touches the sphere edge has radius:
// radius = sqrt(sphereRadius² - waterY²)
// radius = sqrt(2000² - 390²) = sqrt(3,847,900) ≈ 1962
export const WATER_CIRCLE_RADIUS = 1962; // Reaches to sphere edge at water height
export const WATER_CIRCLE_SEGMENTS = 128; // Detail level for circle

// ========================================
// HELPER: Calculate water radius at any Y position
// ========================================
export const calculateWaterRadiusAtHeight = (yPosition: number): number => {
  const distanceSquared = sphereRadius * sphereRadius - yPosition * yPosition;
  return Math.sqrt(Math.max(0, distanceSquared));
};
