uniform vec2 resolution;
uniform float time;
uniform float uProgress;
in vec2 vUv;


void main() {
    vec2 uv = vUv - vec2(.5);

    // Initial colors
    vec3 mountainColor = vec3(0.0, 0.2, 1.0); // Mountain color (night color)
    
    // Transition to day color based on uProgress
    mountainColor = mix(mountainColor, vec3(0.0, 1.0, 0.2), uProgress);

    // Add snow caps
    vec3 snowCaps = vec3(1.0);
    mountainColor = mix(mountainColor, snowCaps, step((sin(uv.x * 22.0) * 0.1) + 1.3, uv.y));
    
    // Output final color and alpha
    vec3 finalColor = mountainColor;


    gl_FragColor = vec4(finalColor, 1.);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
