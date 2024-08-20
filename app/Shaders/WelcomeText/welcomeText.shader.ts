export const vertexShader = `
  uniform float time;
  uniform float uDelay;  

  
  void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
   
    //Final
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    // todo: make services fade left to right as they reveal
    // projectedPosition.x = projectedPosition.x + smoothstep(0.,1.,(clamp(0.,1., time - uDelay) *.25) ;
    gl_Position = projectedPosition;

    // Props
  }
`;

export const fragmentShader = `
  uniform float time;  
  uniform float uOpacity;  
  uniform float uDelay;  

  // float easeInOutQuad(float t) {
  //   return t < 0.5 ? 2.0 * t * t : -1.0 + (4.0 - 2.0 * t) * t;
  // }
  
  void main() {
    // * color
    vec3 color = vec3(1.);
    // * opacity
    float opacity = uOpacity + clamp(0.,1., (time - uDelay));
    // * final
    gl_FragColor = vec4(color, opacity);
  }
`;
