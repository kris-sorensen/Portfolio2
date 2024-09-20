// export const vertexShader = `
//  varying vec2 vUv; 

//   void main() {
  
//   gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  
//   vUv = uv;
// }
// `;

// export const fragmentShader = `
//   // precision mediump float;
//   varying vec2 vUv;
//   uniform float time;
//   uniform vec3 uColor;
  
//   #include ./includes/directionalLight.glsl
  

//   void main()	{
//     vec2 uv = vUv;
//     vec3 col = uColor;


  
//     gl_FragColor = vec4(col, 1.);
// }`;
