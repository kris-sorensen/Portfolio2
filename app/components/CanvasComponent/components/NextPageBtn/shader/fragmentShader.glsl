uniform vec2 resolution;
uniform float time;
uniform float alpha;
uniform vec3 uColor;
uniform float uHoverProgress;
uniform vec2 uMouse;

varying vec2 vUv;

void main() {
    // Initial color
    vec3 color = uColor;

    // Normalize pixel coordinates (from 0 to 1)
    vec2 uv = gl_FragCoord.xy / resolution.xy;

    // Calculate distance from mouse position

    // Hover effect: Ripple emanating from mouse position
    float ripple = sin((time * .2) * 10.0) * 0.1;
    float intensity = smoothstep(0.0, 1.0, uHoverProgress);

    // Apply hover effect
    color += ripple * intensity;

    // Output final color with alpha from reveal animation
    gl_FragColor = vec4(color, alpha);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
