//precision mediump float;

uniform float time;
uniform vec3 uColor;
uniform sampler2D uTexture; // Texture uniform
uniform vec2 resolution; // Resolution uniform
in vec2 vUv;
in vec3 vModPos;

void main() {
  // Sample the texture using UV coordinates
  // vec4 textureColor = texture2D(uTexture, vUv);

  // Determine transparency for white areas
  float alpha = vModPos.b ;


  // Apply texture color
  // vec3 col = textureColor.rgb;

  // gl_FragColor = vec4(vUv,1., 1.);
  gl_FragColor = vec4(textureColor.rbg, alpha);
  // gl_FragColor = vec4(vec3(alpha),1.);
  // gl_FragColor = vec4(vec3(vModPos.b),1.);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
