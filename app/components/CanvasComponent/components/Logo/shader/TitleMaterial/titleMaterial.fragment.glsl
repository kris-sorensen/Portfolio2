// precision mediump float;
uniform float time;
uniform vec3 uColor;
uniform vec3 uColor2;
uniform float uProgress;
uniform float uActivePage;
in vec2 vUv; 

void main() {
  vec2 uv = vUv;
  vec3 col = uColor;
  vec3 col2 = uColor2;
  // Adjust the alpha value based on uProgress to control visibility
  float alpha = 1.0 - uProgress;

  float intensity = smoothstep(.45, .55, uv.x);
  vec3 color = mix(col,col2, intensity);
  
  gl_FragColor = vec4(color, alpha);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
