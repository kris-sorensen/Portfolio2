uniform vec2 resolution;
uniform float time;
uniform float uProgress;
in vec2 vUv;
in vec3 vPosition;

void main() {
    vec2 uv = vUv + vec2(0.5);
    
    // Initial colors for the mountain
    vec3 color = vec3(1.0); // Night color

    // Cutout: creates a circular shape
    float cutout = distance(uv, vec2(1.0));
    cutout *= 1.0 - step(0.25, cutout);

    // Check if we are inside the inner circle
    // if (cutout < 1.) {
    //     color = vec3(0.0); // Set the color to black for the inner circle
    // }

    // Set alpha to 1 (fully opaque) everywhere
    float alpha = 1.0;

    // Output the final color and alpha
    gl_FragColor = vec4(color, cutout);
    
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
