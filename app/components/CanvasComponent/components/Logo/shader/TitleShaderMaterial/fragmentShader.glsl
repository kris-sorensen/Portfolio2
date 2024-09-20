// precision mediump float;
uniform float time;
uniform vec3 uColor;
varying vec3 vPosition;
varying vec3 vNormal;


#include <directionalLight> // Use the registered ShaderChunk

void main() {
  vec3 col = uColor;
  // vec3 normal = normalize(vNormal); // renormalize normal
  // vec3 viewDirection = normalize(vPosition - cameraPosition); 


  // Light
    // vec3 light = vec3(0.);
    
    // light += directionalLight( 
    //     vec3(1.), // color
    //     1., // intensity
    //     normal - vec3(.1,0.,0.), // normal
    //     vec3(-0.2,0.,5.), // position of light
    //     viewDirection, // view direction
    //     20. // Specular Power
    // );

    // col *= light;


  gl_FragColor = vec4(col, 1.0);
}
