uniform float time;
uniform float uSize;
out vec2 vUv; 

void main(){
  vec3 newPosition = position;

  // Final Position
  vec4 modelPosition = modelMatrix * vec4(newPosition, 1.);
  vec4 viewPosition = viewMatrix * modelPosition;
  gl_Position = projectionMatrix * viewPosition;


  // Varyings
  vUv = uv;
}