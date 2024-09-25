#define round(x, f) (floor((x)/(f) + 0.5) * (f))
uniform vec2 resolution;
uniform float time;
uniform float uProgress;
in vec2 vUv;

// Include necessary random and effect generators
#include <random>
#include <random2>
#include <starMaker>
#include <meteor>
#include <meteorstorm>

// Easing function for smooth transitions
float easeInOutCubic(float t) {
    return t < 0.5 ? 4.0 * t * t * t : 1.0 - pow(-2.0 * t + 2.0, 3.0) / 2.0;
}

void main() {
    vec2 coords = (gl_FragCoord.xy / resolution) - vec2(0.5);
    float x = gl_FragCoord.x / resolution.x * 2.0 - 1.0;
    float y = gl_FragCoord.y / resolution.y * 2.0 - 1.0;

    // Star field and meteor
    vec3 stars = starMaker(coords) + meteorstorm(coords);
    stars = sqrt(stars);  // Adjust brightness of stars

    // Apply easing to uProgress for smoother transitions
    float easedProgress = easeInOutCubic(uProgress);

    // Interpolating background color from black to blue based on uProgress
    vec3 backgroundColor = mix(vec3(0.0, 0.0, 0.0), vec3(0.0, 1., 1.0), easedProgress);

    // Mix stars/meteor visibility based on uProgress (visible when uProgress is 0, invisible at 1)
    float starVisibility = mix(1.0, 0.0, easedProgress); 
    vec3 finalStars = stars * starVisibility;

    // Final color and alpha
    vec3 color = backgroundColor + finalStars;
    float alpha = 1.0;

    // Output final color and alpha
    gl_FragColor = vec4(color, alpha);
    
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
