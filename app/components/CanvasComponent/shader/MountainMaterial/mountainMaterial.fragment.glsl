uniform vec2 resolution;
uniform float time;
uniform float uProgress;
in vec2 vUv;

#include <mountainShape>

void main() {
    vec2 coords = (gl_FragCoord.xy / resolution) - vec2(0.5);
    float x = gl_FragCoord.x / resolution.x * 2.0 - 1.0;
    float y = gl_FragCoord.y / resolution.y * 2.0 - 1.0;
    vec2 uv = vUv - vec2(0.6, 0.45);
    
    // Calculate the mountain shape
    float mountainAlpha = mountainShape(
        uv.x,           // x
        0.06875,        // peak1Offset
        uv.y,           // peak1Slope
        0.1625,         // peak1Decent
        0.15,           // peak2Offset
        uv.y,           // peak2Slope
        0.4375          // peak2Decent
    );

    // Initial colors
    vec3 mountainColor = vec3(0.0, 0.2, 1.0); // Mountain color (night color)
    
    // Transition to day color based on uProgress
    mountainColor = mix(mountainColor, vec3(0.0, 1.0, 0.2), uProgress);

    // Add snow caps
    vec3 snowCaps = vec3(1.0);
    mountainColor = mix(mountainColor, snowCaps, step((sin(uv.x * 22.0) * 0.1) + 1.3, uv.y));
    
    // Output final color and alpha
    vec3 finalColor = mountainColor;

    // Set alpha to mountainAlpha to create transparency outside the mountain
    float finalAlpha = mountainAlpha;

    gl_FragColor = vec4(finalColor, finalAlpha);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
