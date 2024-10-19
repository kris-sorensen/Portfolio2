// precision mediump float;
uniform float time;
uniform vec3 uColor;    // Base neon color
uniform vec3 uColor2;   // Secondary color for mix
uniform float uProgress;
uniform float uActivePage;
in vec2 vUv;

void main() {
  vec2 uv = vUv;

  
  // Calculate intensity based on distance from the center and mix two colors
  float intensity = smoothstep(0.45, 0.55, uv.x);
  vec3 color = mix(uColor, uColor2, intensity);

  // Add a soft glow effect around the object
  float glowRadius = 1. - smoothstep(0.48, 0.5, smoothstep(0.,1.,uv.x));
  vec3 glow = glowRadius * uColor * 1.5; // Boost glow with time-based pulse

  // Combine base color with the glow effect
  vec3 finalColor = color + glow;

  // Control the alpha to fade in/out based on uProgress
  float alpha = 1.0 - uProgress;

  // Set the fragment color and apply the glow
  gl_FragColor = vec4(finalColor, alpha);

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
