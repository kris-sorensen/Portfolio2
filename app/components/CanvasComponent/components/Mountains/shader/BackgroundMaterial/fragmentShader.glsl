#define round(x, f) (floor((x)/(f) + 0.5) * (f))
uniform vec2 resolution;
uniform vec3 uColor;
uniform float time;
in vec2 vUv;

#include <random>
#include <random2>
#include <starMaker>
#include <meteor>
#include <meteorstorm>

void main() {
    vec2 coords = (gl_FragCoord.xy / resolution) - vec2(0.5);
    float x = gl_FragCoord.x / resolution.x * 2.0 - 1.0;
    float y = gl_FragCoord.y / resolution.y * 2.0 - 1.0;

    // Star field and meteor
    vec3 stars = starMaker(coords) + meteorstorm(coords);
    stars = sqrt(stars);  // Adjust brightness of stars

    // Separate star alpha control
    float starAlpha = length(stars) > 0.0 ? 1.0 : 0.0;

    // Initial color and alpha
    vec3 color = vec3(0.0);
    float alpha = 1.0;

    // Mountain color (uColor could be from a previous mountain logic)
    color = uColor;

    // Add stars to the final color
    color += stars;

    // Final alpha based on star visibility
    alpha = starAlpha;

    // Output final color and alpha
    gl_FragColor = vec4(color, alpha);
}
