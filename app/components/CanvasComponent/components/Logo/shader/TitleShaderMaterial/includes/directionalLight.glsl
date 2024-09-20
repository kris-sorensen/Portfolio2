vec3 directionalLight( vec3 color, float intensity, vec3 normal, vec3 lightPosition, vec3 viewDirection, float specularPower){
  vec3 lightDirection = normalize(lightPosition);
  vec3 lightReflection = reflect(-lightDirection, normal); // normal is like surface of mirror (surface is pointing). returns reflection value. use minus in front of lightDirection so that it isn't vector pointing at light instead light pointing at fragment
  
  
  // Shading
  float shading = dot(normal, lightDirection);
  shading = max(0., shading);

  // Specular
  float specular =  -dot(lightReflection,  viewDirection); // use -dot so that you arent getting -1 when vectors aligned and pointing at each other. should be 1 when vectors are aligned and pointing at each other
  specular = max(0., specular); // prevent sending negative values to pow so that you don't get specular on back side
  specular = pow(specular, specularPower); // limit effect
  
  // Final 
  return color * intensity * (shading + specular);
  // return vec3(specular);
}