// precision mediump float;
uniform float time;
in vec2 vUv; 


void main() {
  vec3 col = vec3(1.);
  vec2 uv = vUv ;

  float strength = distance(gl_PointCoord, vec2(.5));
                strength = 1. - strength;
                strength = pow(strength, 2.);
  // vec2 uv = gl_FragCoord.xy - vec2(.5);
  
  // Star
  // vec2 p = uv / uResolution.x;
  float radius = 1.;
  // float star = distance(uv, vec2(.5));
  // star = 1. - smoothstep(.25 * radius, (.25 * radius) + .01, star);
  float star = distance(uv, vec2(0.));
   col =  mix(col, vec3(strength), uv.x);

  // col *= strength;

  gl_FragColor = vec4(col, 1.);
}
