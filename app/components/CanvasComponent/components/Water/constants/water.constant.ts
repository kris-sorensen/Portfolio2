// Water configuration
// Water absolute Y position is -390 (Ground at -70 + Water offset -320)
// Sphere radius is 2000, centered at origin
// Circle radius at water height = sqrt(sphereRadius² - waterY²)
// = sqrt(2000² - 390²) = sqrt(3,847,900) ≈ 1962

export const HEIGHT = 400;
export const BOUNDS = 3000;
export const WIDTH = 512; // Texture width for GPU computation

// Circle geometry for water surface
export const WATER_CIRCLE_RADIUS = 1962; // Reaches to sphere edge at water height
export const WATER_CIRCLE_SEGMENTS = 128; // Detail level for circle
