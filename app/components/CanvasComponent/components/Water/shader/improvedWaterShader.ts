/**
 * Improved Water Shader with Fresnel and Advanced Light Reflection
 * More performant and visually beautiful than standard water
 */

export const improvedWaterVertexShader = `
  uniform sampler2D heightmap;

  void main() {
    float multiplier = 20.0;
    vec2 cellSize = vec2(1.0 / WIDTH * multiplier, 1.0 / WIDTH * multiplier);

    // Compute normal from heightmap using Sobel-like filter
    float north = texture2D(heightmap, uv + vec2(0.0, cellSize.y)).x;
    float south = texture2D(heightmap, uv + vec2(0.0, -cellSize.y)).x;
    float east = texture2D(heightmap, uv + vec2(cellSize.x, 0.0)).x;
    float west = texture2D(heightmap, uv + vec2(-cellSize.x, 0.0)).x;

    // Higher quality normal calculation with smoother transitions
    vec3 normal = normalize(vec3(
      (west - east) * WIDTH / BOUNDS * 0.8,
      (south - north) * WIDTH / BOUNDS * 0.8,
      1.0
    ));

    // Apply normal to csm_Normal for CustomShaderMaterial
    csm_Normal = normal;
  }
`;

// Fragment shader additions via onBeforeCompile
export const waterFragmentShaderAdditions = `
  // Fresnel effect - more reflection at grazing angles
  float fresnelEffect(vec3 normal, vec3 viewDir) {
    float fresnel = pow(1.0 - abs(dot(normal, viewDir)), 4.0);
    return mix(0.05, 1.0, fresnel);
  }

  // Improved specular highlight from a light direction
  float specularHighlight(vec3 normal, vec3 lightDir, vec3 viewDir, float roughness) {
    vec3 halfDir = normalize(lightDir + viewDir);
    float specAngle = max(dot(normal, halfDir), 0.0);
    return pow(specAngle, mix(256.0, 8.0, roughness)) * 0.5;
  }

  // Simple caustic pattern for visual interest
  float caustic(vec3 pos, float time) {
    vec2 uv = pos.xz * 0.5;
    float pattern = sin(uv.x * 3.0 + time * 0.3) * cos(uv.y * 3.0 + time * 0.4);
    pattern += sin((uv.x + uv.y) * 2.0 + time * 0.2) * 0.5;
    return pattern * 0.05 + 0.95;
  }
`;

export const heightmapFragmentShader = `
  #include <common>

  uniform vec2 mousePos;
  uniform float mouseSize;
  uniform float viscosityConstant;
  uniform float heightCompensation;

  void main() {
    vec2 cellSize = 1.0 / resolution.xy;
    vec2 uv = gl_FragCoord.xy * cellSize;

    vec4 heightmapValue = texture2D(heightmap, uv);

    // Get neighbours
    vec4 north = texture2D(heightmap, uv + vec2(0.0, cellSize.y));
    vec4 south = texture2D(heightmap, uv + vec2(0.0, -cellSize.y));
    vec4 east = texture2D(heightmap, uv + vec2(cellSize.x, 0.0));
    vec4 west = texture2D(heightmap, uv + vec2(-cellSize.x, 0.0));

    // Improved wave physics with better damping
    float newHeight = ((north.x + south.x + east.x + west.x) * 0.5 - heightmapValue.y) * viscosityConstant;

    // Mouse influence with smoother falloff
    float mousePhase = clamp(length((uv - vec2(0.5)) * BOUNDS - vec2(mousePos.x, -mousePos.y)) * PI / mouseSize, 0.0, PI);
    newHeight += (cos(mousePhase) + 1.0) * 0.28;

    heightmapValue.y = heightmapValue.x;
    heightmapValue.x = newHeight;

    gl_FragColor = heightmapValue;
  }
`;

// Custom onBeforeCompile function to inject lighting calculations
export const waterShaderCallback = (shader: any, uniforms: any) => {
  // Add uniforms for lighting
  shader.uniforms.uTime = { value: 0 };
  shader.uniforms.uLightPos = { value: [10, 50, 20] };
  shader.uniforms.uLightColor = { value: [1.0, 0.95, 0.8] };

  // Inject helper functions before main fragment shader
  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <common>",
    `#include <common>
    ${waterFragmentShaderAdditions}`
  );

  // Add lighting calculations before final color output - TONED DOWN
  shader.fragmentShader = shader.fragmentShader.replace(
    "gl_FragColor = vec4( outgoingLight, diffuse.a );",
    `
    // Advanced water lighting - toned down to prevent blow-out
    vec3 viewDir = normalize(cameraPosition - vWorldPosition);
    vec3 lightDir = normalize(vec3(uLightPos) - vWorldPosition);

    // Fresnel effect - more reflection at grazing angles
    float fresnel = fresnelEffect(normal, viewDir);

    // Specular highlights from direct light (heavily reduced)
    float spec = specularHighlight(normal, lightDir, viewDir, material.roughness);

    // Caustic pattern for depth perception
    float causticPattern = caustic(vWorldPosition, uTime);

    // Combine lighting with heavily clamped specular to prevent blow-out
    outgoingLight += clamp(spec * vec3(uLightColor) * 0.04, vec3(0.0), vec3(0.25));
    outgoingLight = mix(outgoingLight, outgoingLight * causticPattern, 0.08);

    // Enhance reflection at grazing angles (minimal)
    outgoingLight = mix(outgoingLight, vec3(1.0), fresnel * 0.02);

    // Final tone mapping to prevent overbright values
    outgoingLight = min(outgoingLight, vec3(0.95));

    gl_FragColor = vec4(outgoingLight, diffuse.a);
    `
  );
};
