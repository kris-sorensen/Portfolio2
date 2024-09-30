uniform vec2 resolution;
uniform float time;
uniform float uProgress;
in vec2 vUv;
in vec3 vPosition; // Assuming you pass the vertex position from the vertex shader

void main() {
    // Initial colors for the mountain
    vec3 mountainColor = vec3(0.0, 0.2, 1.0); // Night color
    // Transition to day color based on uProgress
    mountainColor = mix(mountainColor, vec3(0.1, 1.0, 0.5), uProgress);

    // Add snow caps based on world y-position
    vec3 snowcaps = vec3(1.0); // White color for snow
    float jaggedEdge =  mod(vPosition.y, .15);
    float snowMask = smoothstep(1.0, 2.0, vPosition.y ); // Adjust the range based on your mountain's height
    
    // Blend snowcaps with the mountain color
    vec3 finalColor = mix(mountainColor, snowcaps, snowMask);

    // Output the final color
    gl_FragColor = vec4(finalColor, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
