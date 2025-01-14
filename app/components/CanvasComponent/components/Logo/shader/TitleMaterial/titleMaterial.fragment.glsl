// precision mediump float;
uniform float time;
uniform vec3 uColor;    // Base neon color
uniform vec3 uColor2;   // Secondary color for mix
uniform float uProgress;
uniform float uActivePage;
in vec2 vUv;

void main() {
  vec2 uv = vUv;


  vec3 finalColor = vec3(mix(uColor,uColor2, pow(uv.x, 8.)));
  gl_FragColor = vec4(finalColor, 1.);

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}


