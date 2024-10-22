varying vec3 vPosition;
out vec2 vUv;
out vec3 vModPos;
uniform sampler2D uTexture; // Texture uniform

void main()
{
    vec3 modifiedPosition = position;
    // Modify Z
    // float textureColor = texture2D(uTexture, uv).g;
    // if(textureColor > .5){

    //     modifiedPosition.z -= 500.;
    // }else{
    //     modifiedPosition.z += 100.;
    // }
    // Position
    vec4 modelPosition = modelMatrix * vec4(modifiedPosition, 1.0);
    

    // Final Position
    gl_Position = projectionMatrix * viewMatrix * modelPosition;

    vUv = uv;
    vModPos = modelPosition.rgb;
}