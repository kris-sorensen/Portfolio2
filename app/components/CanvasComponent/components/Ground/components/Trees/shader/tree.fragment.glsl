//precision mediump float;

uniform float time;
uniform vec3 uColor;
// uniform sampler2D uTexture; // Texture uniform
uniform vec2 resolution; // Resolution uniform
in vec2 vUv;
in vec3 vModPos;

void main() {
  vec2 uv = (gl_FragCoord.xy - 1. * resolution.xy)/ resolution.y;

  // Alpha
  float alpha = 1.;

  // Base Color
  vec3 col = vec3(0.);

  // Tree
  // float m = TapperBox(uv, );

  // col += m;

  // Axis
  float thickness = 1./resolution.y;
  if(abs(uv.x) < thickness) col.g = 1.;
  if(abs(uv.y) < thickness) col.r = 1.;

  gl_FragColor = vec4(col, alpha);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
