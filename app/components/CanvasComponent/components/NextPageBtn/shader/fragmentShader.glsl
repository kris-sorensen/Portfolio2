uniform vec2 resolution;
uniform float time;
uniform float alpha;  
uniform vec3 uColor;  
in vec2 vUv;

void main() {
    // Initial color
    vec3 color = uColor;

    // Output final color and alpha
    gl_FragColor = vec4(color, alpha);  // Use the updated alpha uniform value
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
