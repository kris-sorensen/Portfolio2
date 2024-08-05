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
  uniform float time;

  void main()	{
    vec2 uv = vUv;
    vec4 col = vec4((sin(time) + 1.) / 2.,0.,1.,1.);
  
    gl_FragColor = col;
}`;
