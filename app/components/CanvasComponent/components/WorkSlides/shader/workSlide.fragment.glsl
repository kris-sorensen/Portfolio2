// precision mediump float;
uniform float time;
uniform vec3 uColor;


void main() {
  // Color
  vec3 col = uColor;

  // Alpha
  float alpha = 1.0;
  
  gl_FragColor = vec4(col, alpha);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
