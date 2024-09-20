// shader.fragmentShader = shader.fragmentShader.replace(
//   "#include <color_fragment>",
//   `
//     #include <color_fragment>

//     vec2 checkerUV = fract(vUv * 10.0);
//     vec2 edge = fwidth(checkerUV);

//     float checkerX = smoothstep(0.5 - edge.x, 0.5 + edge.x, checkerUV.x);
//     float checkerY = smoothstep(0.5 - edge.y, 0.5 + edge.y, checkerUV.y);
//     float checker = checkerX * checkerY + (1.0 - checkerX) * (1.0 - checkerY);

//     vec3 pink = vec3(1.0, 0.0, 1.0);
//     vec3 blue = vec3(0.0, 0.0, 1.0);
//     diffuseColor.rgb = mix(pink, blue, checker);
//   `
// );
