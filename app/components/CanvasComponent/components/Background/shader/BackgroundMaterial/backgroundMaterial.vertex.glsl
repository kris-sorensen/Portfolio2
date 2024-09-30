varying vec2 vUv; 

void main(){
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
      
  //Final
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  gl_Position = projectedPosition;

  // Props
  vUv = uv;
}