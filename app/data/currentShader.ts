export const retrieveShaders = () => {
  return {
    fragmentShader: retrieveFragmentShader(),
    vertexShader: retrieveVertexShader(),
  };
};

export const retrieveFragmentShader = () => {
  if (!fragmentShader) return initialFragmentShader;
  else return fragmentShader;
};

export const retrieveVertexShader = () => {
  if (!vertexShader) return initialVertexShader;
  else return vertexShader;
};

export const fragmentShader = `
precision mediump float;

  varying vec3 vPosition;

  void main() {
    // Convert the position to spherical coordinates
    float u = atan(vPosition.z, vPosition.x) / (2.0 * 3.141592653589793) + 0.5;
    float v = asin(vPosition.y / length(vPosition)) / 3.141592653589793 + 0.5;
    
    // Set the scale of the checkered pattern
    float scale = 10.0;
    
    // Calculate the checkered pattern based on spherical coordinates
    vec2 checkCoords = floor(vec2(u, v) * scale);
    float checker = mod(checkCoords.x + checkCoords.y, 2.0);

    // Define the two colors for the checkered pattern
    vec3 color1 = vec3(1.0, 1.0, 1.0);
    vec3 color2 = vec3(0., 0., 0.); 

    // Assign the color based on the checker value
    vec3 finalColor = mix(color1, color2, checker);

    gl_FragColor = vec4(finalColor, 1.0);
  }`;

export const vertexShader = `
 varying vec3 vPosition;

  void main() {
    vPosition = position; // Pass the vertex position to the fragment shader;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }`;

export const initialVertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
  }
`;

export const initialFragmentShader = `
  precision mediump float;

  varying vec2 vUv;

  void main() {
    vec3 seaFoamColor = vec3(0.0, 0.9, 0.85); 

    gl_FragColor = vec4(seaFoamColor, 1.0);
  }
`;
