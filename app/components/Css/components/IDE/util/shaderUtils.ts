// export const createDefaultShader = (
//   index: number
// ): string => `// NAME: Shader ${index + 1}

// precision mediump float;
// varying vec3 vPosition;

// void main() {
//     float u = atan(vPosition.z, vPosition.x) / (2.0 * 3.141592653589793) + 0.5;
//     float v = asin(vPosition.y / length(vPosition)) / 3.141592653589793 + 0.5;

//     vec3 finalColor = vec3(1.,1.,0.);
//     gl_FragColor = vec4(finalColor, 1.0);
// }`;

export const extractShaderName = (shader: string): string => {
  const nameMatch = shader.match(/\/\/\s*NAME:\s*(.+)/);
  return nameMatch && nameMatch[1].trim() !== "" ? nameMatch[1].trim() : "";
};

export const createDefaultShader = (
  index: number
): string => `// NAME: Shader ${index + 1} 

precision mediump float;

varying vec3 vPosition; // The position of the fragment
varying vec3 vNormal; // The normal at the fragment

// Predefined light variables
const vec3 lightPosition = vec3(2.0, 2.0, 2.0); // Adjusted position of the point light
const vec3 lightColor = vec3(1.0, 1.0, 1.0); // Color of the point light
const float lightIntensity = 3.0; // Intensity of the point light
const vec3 ambientColor = vec3(0., 0., 0.); // Ambient light color
const float ambientIntensity = 0.5; // Ambient light intensity

void main() {
    // Spherical mapping (UV coordinates)
    float u = atan(vPosition.z, vPosition.x) / (2.0 * 3.141592653589793) + 0.5;
    float v = asin(vPosition.y / length(vPosition)) / 3.141592653589793 + 0.5;
    
    // Calculate the direction of the light
    vec3 lightDir = normalize(lightPosition - vPosition);

    // Calculate the diffuse lighting (Lambertian reflection)
    float diff = max(dot(normalize(vNormal), lightDir), 0.0);

    // Final color calculation
    vec3 diffuse = diff * lightColor * lightIntensity;
    vec3 ambient = ambientColor * ambientIntensity;

    vec3 finalColor = diffuse + ambient; // Combine diffuse and ambient

    gl_FragColor = vec4(finalColor, 1.0);
}
`;
