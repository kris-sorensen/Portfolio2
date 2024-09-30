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
    // Calculate aspect ratio
    float aspectRatio = resolution.x / resolution.y;

    // Adjust coordinates for aspect ratio
    vec2 coords = (gl_FragCoord.xy / resolution) - vec2(0.5);
    coords.x *= aspectRatio;

    // Star field and meteor
    vec3 stars = starMaker(coords) + meteorstorm(coords);
    stars = sqrt(stars);  // Adjust brightness of stars

    // Apply easing to uProgress for smoother transitions
    float easedProgress = easeInOutCubic(uProgress);

    // Blue sky gradient colors
    vec3 topColor = vec3(0.173, 0.404, 0.949);  // #2c67f2
    vec3 bottomColor = vec3(0.384, 0.812, 0.957);  // #62cff4

    // Create the blue sky gradient using the y-component of vUv and shape w/ sqrt
    vec3 blueSkyColor = mix(bottomColor, topColor, sqrt(vUv.y));

    // Create the black gradient (quick transition to black)
    vec3 bottomBlack = vec3(0.01); // Slightly less black at the bottom
    vec3 topBlack = vec3(0.0);    // Pure black at the top
    vec3 blackGradient = mix(bottomBlack, topBlack, vUv.y);

    // Mix the black gradient with the blue sky gradient based on easedProgress
    vec3 backgroundColor = mix(blackGradient, blueSkyColor, easedProgress);

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
