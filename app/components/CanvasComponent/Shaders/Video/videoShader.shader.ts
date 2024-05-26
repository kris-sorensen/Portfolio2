export const vertexShader = `
 varying vec2 vUv; 

  void main() {
    vUv = uv;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const fragmentShader = `
  precision mediump float;
  varying vec2 vUv;
  uniform sampler2D dogVideo;
  uniform float time;

  void main()	{
    vec2 uv = vUv;
    vec4 black = vec4(0.,0.,0.,1.);
    vec4 color = texture2D(dogVideo, uv);

    color = mix(black, color, clamp(0.,1.,time - 7.));

    gl_FragColor = color;
}`;
