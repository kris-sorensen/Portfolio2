varying vec2 vUv;
varying vec3 vPosition; // Pass the world position to the fragment shader

void main() {
    vec3(position);
    // Modify the z-coordinate based on the x position to create a warped effect
    if (modelPosition.x > 0.0) {
        modelPosition.z -= modelPosition.x * 2.0; // Adjust this value to control the depth change
    }
    // Calculate the model position in world space
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    

    // Pass the modified world position to the fragment shader
    vPosition = modelPosition.xyz;

    // Transform to view space and clip space
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    // Set the final position
    gl_Position = projectedPosition;

    // Pass the UV coordinates to the fragment shader
    vUv = uv;
}
