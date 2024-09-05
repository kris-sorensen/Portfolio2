export const fragmentShader = `
  precision mediump float;
  varying vec2 vUv;

  void main() {
    // Center the UV gradient by mirroring it
    float gradient = 1.0 - abs(vUv.x - 0.5) * 2.0;

    // Define black color
    vec3 black = vec3(0.0);

    // Use the gradient as the alpha value
    float alpha = gradient; // Fully opaque in the center, transparent on both sides;

    // Output the color with interpolated transparency
    gl_FragColor = vec4(black, min(alpha, .95));
  }
`;
