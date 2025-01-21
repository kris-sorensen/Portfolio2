// precision mediump float;
uniform vec3 uColor;
uniform float opacity;

void main() {
  gl_FragColor = vec4(uColor, opacity);
}
