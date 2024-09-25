uniform vec2 resolution;
uniform float time;
uniform float uProgress;
in vec2 vUv;

#include <mountainShape> 


void main() {
    vec2 coords = (gl_FragCoord.xy / resolution) - vec2(0.5);
    float x = gl_FragCoord.x / resolution.x * 2.0 - 1.0;
    float y = gl_FragCoord.y / resolution.y * 2.0 - 1.0;

    // Mountain alpha
    float mountainAlpha = mountainShape(x, 0.55, y, 1.3, 1.2, y, 3.5);

    // Initial color and alpha
    vec3 color = vec3(0.0);
    float alpha = 1.0;

    // Mountain color
    vec3 nightColor = vec3(0., 0.2, 1.);
    vec3 dayColor = vec3(0., 1., .2);
    color = nightColor;
    // Transition from color on each page
    color = mix(color, dayColor, uProgress);
    // Snow caps
    vec3 snowCaps = vec3(1.0);
    color = mix(color, snowCaps, step((sin(x * 22.0) * 0.1) + 1.3, y));
    
    

    // Final alpha 
    alpha = mountainAlpha;
    // Output final color and alpha
    gl_FragColor = vec4(color, alpha);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
