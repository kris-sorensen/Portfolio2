varying vec3 vNormal;
varying vec3 vPosition;

void main()
{
    // Position
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * viewMatrix * modelPosition;

    // Model Normal
    vec4 modelNormal = modelMatrix * vec4(normal, 0.); // so light doesn't move with object. using zero doesn't apply transformations to normal(non-homogenous vector)

    // Varying
    vNormal = modelNormal.rgb;
    vPosition = modelPosition.xyz; // 3d position of fragment
}