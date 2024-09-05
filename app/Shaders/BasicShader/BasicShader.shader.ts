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

export const wallGlow = `
  precision mediump float;
  varying vec2 vUv;
  uniform float time;

  void main() {
    vec2 uv = vUv;
    
    // Center the UV coordinates (0.5, 0.5 is the center of the texture)
    vec2 centeredUv = uv - vec2(0.5);
    
    // Calculate the distance from the center
    float dist = length(centeredUv);
    
    // Define the colors
    vec3 neonBlue = vec3(0.0, 0.949, 0.871);
    vec3 black = vec3(0.0);
    vec3 grey = vec3(0.2);
    vec3 white = vec3(1.);

    // Create a radial gradient using the distance
    float gradient = smoothstep(0.0, 0.5, dist -.35);

    // Interpolate between black and neonBlue
    vec3 col = mix(black, white, gradient);
  
    gl_FragColor = vec4(col, 1.0);
  }
`;

export const AnimatedFrameFragment = `
  precision mediump float;
  varying vec2 vUv;
  uniform float time;
  uniform float aspectRatio;
  uniform vec2 resolution;

  void main() {
    vec2 uv = vUv;
    
    // Center the UV coordinates (0.5, 0.5 is the center of the texture)
    vec2 centeredUv = (uv -.5) * resolution;

    // Calculate the distance from the center
    float dist = length(centeredUv);
    dist = dist * aspectRatio;

    
    // Define the colors
    vec3 black = vec3(.4);
    vec3 white = vec3(1.);
    vec3 softDawnLight = vec3(0.984, 0.910, 0.796);
    vec3 sunsetGlow = vec3(0.925, 0.392, 0.263);
    vec3 sunKissedSand = vec3(0.973, 0.843, 0.678);
    vec3 darkerPeriwinkle = vec3(0.348, 0.386, 0.596);

    vec3 periwinkle = vec3(0.435, 0.482, 0.745);
    vec3 lightLavender = vec3(0.863, 0.843, 0.929);
    // vec3 aquaMint = vec3(0.0, 0.949, 0.871);
    // vec3 hotPink = vec3(1.0, 0.424, 0.710);



    // Create a radial gradient using the distance
    float gradient = smoothstep(0.85, 1.3, dist);
    float innerGradient = smoothstep(0.45, .7, dist);

    // Interpolate between black and neonBlue
    vec3 col = mix(mix(lightLavender,periwinkle, innerGradient), darkerPeriwinkle, gradient);
    // vec3 col = mix(lightLavender,periwinkle, innerGradient);

    float alpha = 1.;
    alpha = smoothstep(.525, .526, dist);
    
    gl_FragColor = vec4(col, alpha);
  }
`;

export const CurrentShader = `
  precision mediump float;
  varying vec2 vUv;
  uniform float time;

  void main() {
    vec2 uv = vUv;
    
    // Center the UV coordinates (0.5, 0.5 is the center of the texture)
    vec2 centeredUv = uv - vec2(0.5);
    
    // Calculate the distance from the center
    float dist = sin(time + length(centeredUv));
    
    // Define the colors
    vec3 neonBlue = vec3(0.0, 0.949, 0.871);
    vec3 black = vec3(0.0);
    vec3 grey = vec3(0.2);
    vec3 white = vec3(1.);

    // Create a radial gradient using the distance
    float gradient = smoothstep(0.0, 0.5, dist -.35);

    // Interpolate between black and neonBlue
    vec3 col = mix(neonBlue, white, gradient);
  
    gl_FragColor = vec4(col, 1.);
  }
`;
