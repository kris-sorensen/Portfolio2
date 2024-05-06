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

  void main()	{
    vec2 uv = vUv;
    vec4 color = texture2D(dogVideo, uv);

    gl_FragColor = color;
}`;
