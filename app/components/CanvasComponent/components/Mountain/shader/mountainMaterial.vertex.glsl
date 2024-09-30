varying vec2 vUv;
varying vec3 vPosition; // New varying to pass the world position

void main() {
    // Calculate the model position in world space
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    
    // Pass the world position to the fragment shader
    vPosition = modelPosition.xyz;
    
    // Transform to view space and clip space
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    
    // Set the final position
    gl_Position = projectedPosition;
    
    // Pass the UV coordinates to the fragment shader
    vUv = uv;
}
