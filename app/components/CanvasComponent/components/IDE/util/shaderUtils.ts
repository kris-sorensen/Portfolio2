export const createDefaultShader = (
  index: number
): string => `// NAME: Shader ${index + 1}

precision mediump float;
varying vec3 vPosition;

void main() {
    float u = atan(vPosition.z, vPosition.x) / (2.0 * 3.141592653589793) + 0.5;
    float v = asin(vPosition.y / length(vPosition)) / 3.141592653589793 + 0.5;
    
    vec3 finalColor = vec3(1.,1.,0.);
    gl_FragColor = vec4(finalColor, 1.0);
}`;

export const extractShaderName = (shader: string): string => {
  const nameMatch = shader.match(/\/\/\s*NAME:\s*(.+)/);
  return nameMatch && nameMatch[1].trim() !== "" ? nameMatch[1].trim() : "";
};
