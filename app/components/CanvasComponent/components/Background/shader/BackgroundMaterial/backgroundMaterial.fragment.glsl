#define round(x, f) (floor((x)/(f) + 0.5) * (f))
uniform vec2 resolution;
uniform float time;
uniform float uProgress;
uniform float uStarViz;
uniform float sunMoonPosY;  // sunMoon Y uniform
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

// Simple random function for dithering
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
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
    vec3 topColor = vec3(0.173, 0.404, 0.949);    // #2c67f2
    vec3 bottomColor = vec3(0.384, 0.812, 0.957); // #62cff4

    // Instead of sqrt, use a smoother easing for the gradient
    float gradientFactor = easeInOutCubic(vUv.y);
    vec3 blueSkyColor = mix(bottomColor, topColor, gradientFactor);

    // Create the black gradient (quick transition to black)
    vec3 bottomBlack = vec3(0.0035); // Slightly less black at the bottom
    vec3 topBlack = vec3(0.0);       // Pure black at the top
    vec3 blackGradient = mix(bottomBlack, topBlack, vUv.y);

    // Calculate sunsetIntensity based on sunMoonPosY
    float sunsetIntensity = 0.0;
    float multiplier = sunMoonPosY + .5;
    if (multiplier <= 0.25 && multiplier >= -.5) {
        if (multiplier >= 0.0) {
            sunsetIntensity = (0.25 - multiplier) / 0.25;
        } else {
            sunsetIntensity = (multiplier + 1.0);
        }
        sunsetIntensity = clamp(sunsetIntensity, 0.0, 1.0);
        sunsetIntensity = easeInOutCubic(sunsetIntensity);
    }

    // Define sunset colors
    vec3 sunsetTopColor = vec3(0.988, 0.549, 0.235);    // #FC8C3C (Rich Orange)
    vec3 sunsetBottomColor = vec3(0.992, 0.733, 0.306); // #FDBB4E (Golden Yellow)

    // Create a sunset gradient
    float sunsetGradientFactor = pow(vUv.y, 1.5); // Adjust exponent for desired effect
    vec3 sunsetColor = mix(sunsetBottomColor, sunsetTopColor, sunsetGradientFactor);

    // Blend blue sky and sunset colors based on sunsetIntensity
    vec3 skyColor = mix(blueSkyColor, sunsetColor, sunsetIntensity);

    // Apply small dithering to break up color banding
    float ditherAmount = (random(gl_FragCoord.xy) - 0.5) * 0.005;
    skyColor += ditherAmount; // Add dithering to the sky color
    blackGradient += ditherAmount * vUv.y; // Add dithering to black gradient as well

    // Adjust brightness based on sunMoonPosY
    float brightness = mix(0.5, 0.8, sunMoonPosY); // Dim at top, brighten at bottom
    skyColor *= brightness;

    // Mix the black gradient with the sky color based on easedProgress
    vec3 backgroundColor = mix(blackGradient, skyColor, easedProgress);

    // Mix stars/meteor visibility based on uStarViz
    float starVisibility = mix(1.0, 0.0, uStarViz); 
    vec3 finalStars = stars * starVisibility;

    // Final color and alpha
    vec3 color = backgroundColor + finalStars;
    float alpha = 1.0;

    // Output final color and alpha
    gl_FragColor = vec4(color, alpha);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
