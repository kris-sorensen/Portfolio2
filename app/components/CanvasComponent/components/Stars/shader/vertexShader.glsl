uniform float time;
uniform float uSize;
out vec2 vUv;
// uniform vec2 uResolution;
// uniform float uProgress;
// attribute float aSize;
// attribute float aTimeMultiplier;



void main(){
  // float progress = uProgress * aTimeMultiplier;
  vec3 newPosition = position;


  // Scaling
  // float sizeOpeningProgress = remap(progress, 0.,.125, 0.,1.);
  // float sizeClosingProgress = remap(progress, .125,1., 1.,0.);

  // float sizeProgress = min(sizeOpeningProgress,sizeClosingProgress);
  // sizeProgress = clamp(sizeProgress, 0.,1.);

  // Twinkling
  // float twinklingProgress = remap(progress,.2,.8,0., 1.);
  // twinklingProgress = clamp(twinklingProgress,0.,1.);
  // float sizeTwinkling = sin(progress * 30.) * .5 + .5; // 0=>1 sin
  // sizeTwinkling = 1. - sizeTwinkling * twinklingProgress;



  // Final Position
  vec4 modelPosition = modelMatrix * vec4(newPosition, 1.);

  vec4 viewPosition = viewMatrix * modelPosition;

  gl_Position = projectionMatrix * viewPosition;

  // Final Size
  gl_PointSize = uSize;
  // gl_PointSize = uSize * uResolution.y * aSize * sizeProgress * sizeTwinkling; // * Times by uResolution.y so that it resizes correctly when shrink screen vertically. resize only happens on y
  gl_PointSize *= 1. / - viewPosition.z; // Perspective sizing (bigger when camera is closer)

  // Varyings
  vUv = uv;

}