// precision mediump float;
uniform float time;
uniform vec3 uColor;
uniform float uProgress;
uniform float uActivePage;

void main() {
  vec3 col = uColor;
  // Adjust the alpha value based on uProgress to control visibility
  float alpha = 1.0 - uProgress;
  
  gl_FragColor = vec4(col, alpha);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
