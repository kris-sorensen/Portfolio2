// precision mediump float;
uniform float time;
uniform vec3 uColor;    // Base neon color
uniform vec3 uColor2;   // Secondary color for mix
uniform float uProgress;
uniform float uActivePage;
in vec2 vUv;

void main() {
  vec2 uv = vUv;

  // Map uProgress from [-1, 0] → [0, 1]
  float progress = (uProgress + 1.0) * .4; 

  // Interpolate between colors
  vec3 finalColor = mix(uColor, uColor2, pow(uv.x, 6.));

  // Keep alpha at 2 while progress > 0.1
  float alpha = 2.0;

  // Rapidly drop alpha when progress is close to 0
  alpha *= 1.0 - smoothstep(0.01, 0.1, progress); 

  gl_FragColor = vec4(finalColor, alpha);

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
