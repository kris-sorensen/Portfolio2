uniform float time;
uniform float uProgress;
varying vec2 vUv;

void main() {
    // Normalize progress from (-1 to 0) → (0 to 1)
    float progress = (uProgress + 1.0);
    
    vec3 newPosition = position;

    // === 🌬️ ORIGINAL ANIMATION (BEFORE EXPLOSION) ===
    float baseMovement = sin(time * 0.5) * 0.1; // Gentle floating effect
    newPosition.x += sin(position.y * 5.0 + time) * 0.1; // Small wavy X movement
    newPosition.y += baseMovement; // Slight floating effect in Y
    newPosition.z += progress * 1.5; // Keep original depth movement

    // === 🚀 EXPLOSION (ONLY WHEN PROGRESS IS CLOSE TO 0) ===
    float blastFactor = smoothstep(0.9, 1.0, progress); // Kicks in late
    newPosition.y += blastFactor * 1500.0; // MASSIVE vertical push
    newPosition.x += (sin(position.x * 8.0 + time) * blastFactor * 10.0); // Spread
    newPosition.z += blastFactor * 50.0; // Push into depth

    // Apply transformations
    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
    gl_Position = projectionMatrix * viewMatrix * modelPosition;

    vUv = uv;
}
