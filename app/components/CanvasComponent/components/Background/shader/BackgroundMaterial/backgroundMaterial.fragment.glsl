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

// Simple noise function for clouds
float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(
        mix(random(i), random(i + vec2(1.0, 0.0)), u.x),
        mix(random(i + vec2(0.0, 1.0)), random(i + vec2(1.0, 1.0)), u.x),
        u.y
    );
}

// Function to create wispy clouds
float cloudLayer(vec2 uv, float speed) {
    float cloud = noise(uv * 1.5 + vec2(time * speed, time * speed * 0.5));
    cloud = smoothstep(0.4, 0.6, cloud); // Smooth transitions for wispy clouds
    return cloud;
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

    // Define Blue, Pink, and Yellow colors for the gradient
    vec3 topColor = vec3(0.173, 0.404, 0.949);    // Blue #2c67f2 (for high sky)
    vec3 middleColor = vec3(0.980, 0.545, 0.788); // Pink #fa8bca (mid-level)
    vec3 bottomColor = vec3(0.992, 0.733, 0.306); // Yellow #FDBB4E (for low sky)

    // Calculate transition factor based on sunMoonPosY, adjusted to start turning pink at 15% above bottom
    float transitionStart = -0.35; // 15% above bottom
    float transitionFactor = clamp((1.0 - (sunMoonPosY - transitionStart)) / 1.0, 0.0, 1.0);

    // Declare skyColor variable
    vec3 skyColor;

    // Blend the sky color in two stages with new blend points
    if (transitionFactor < 0.5) {
        // Blue to pink gradient
        float blendFactor = smoothstep(0.0, 0.5, transitionFactor);
        skyColor = mix(topColor, middleColor, blendFactor);
    } else {
        // Pink to yellow gradient
        float blendFactor = smoothstep(0.5, 1.0, transitionFactor);
        skyColor = mix(middleColor, bottomColor, blendFactor);
    }

    // Create the black gradient for the night transition
    vec3 bottomBlack = vec3(0.0035); // Slightly less black at the bottom
    vec3 topBlack = vec3(0.0);       // Pure black at the top
    vec3 blackGradient = mix(bottomBlack, topBlack, vUv.y);

    // Apply small dithering to break up color banding
    float ditherAmount = (random(gl_FragCoord.xy) - 0.5) * 0.005;
    skyColor += ditherAmount; // Add dithering to the sky color
    blackGradient += ditherAmount * vUv.y; // Add dithering to black gradient as well

    // Adjust brightness based on sunMoonPosY
    float brightness = mix(0.5, 0.8, sunMoonPosY); // Dim at top, brighten at bottom
    skyColor *= brightness;

    // Create the cloud layer
    float clouds = cloudLayer(vUv * 2.0, 0.02); // Scale UV for clouds, slow speed
    vec3 cloudColor = vec3(1.0); // White clouds
    skyColor = mix(skyColor, cloudColor, clouds * 0.4); // Blend clouds into the sky

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
