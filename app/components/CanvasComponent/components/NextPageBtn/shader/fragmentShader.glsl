uniform vec2 resolution;
uniform float time;
in vec2 vUv;

void main() {
    // Initial color and alpha
    vec3 color = vec3(0.,1.,.2);
    float alpha = 1.0;

    // Output final color and alpha
    gl_FragColor = vec4(color, alpha);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
