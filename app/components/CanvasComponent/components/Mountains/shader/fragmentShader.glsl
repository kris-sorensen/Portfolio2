uniform vec2 resolution;
in vec2 vUv;

// Function to generate the mountain shape
float mountainShape(float x, float peak1Offset, float peak1Slope, float peak1Decent, float peak2Offset, float peak2Slope, float peak2Decent) {
    float mountainAngle = .5;

    // First peak logic
    float slopePeak1 = 1.0 - step(x - peak1Offset, mountainAngle * peak1Slope);
    float decentPeak1 = step(x - peak1Decent, mountainAngle * -peak1Slope);
    float peak1 = min(slopePeak1, decentPeak1);

    // Second peak logic
    float slopePeak2 = 1.0 - step(x - peak2Offset, mountainAngle * peak2Slope);
    float decentPeak2 = step(x - peak2Decent, mountainAngle * -peak2Slope);
    float peak2 = min(slopePeak2, decentPeak2);
    // Combine the two peaks
    float mountain = max(peak1, peak2);
    
    return mountain;
}

void main() {
    // Get the current fragment's x and y coordinates, normalized
    vec2 coords = (gl_FragCoord.xy / resolution) - vec2(0.5);
    float x = gl_FragCoord.x / resolution.x * 2.0 - 1.0; // Normalize x from -1 to 1
    float y = gl_FragCoord.y / resolution.y * 2.0 - 1.0; // Normalize y from -1 to 1

    // Initial alpha value
    float alpha = 1.0;

    // Pass in values to define the peaks
    float mountain = mountainShape(x, 
                                   0.55,   // peak1Offset
                                   y,      // peak1Slope
                                   1.3,    // peak1Decent
                                   1.2,    // peak2Offset
                                   y,      // peak2Slope
                                   3.5);   // peak2Decent

    // Modify alpha based on the mountain shape
    alpha *= mountain;

    // Output color with adjusted alpha
    vec3 color = vec3(0.0, 0.2, 1.0); // base color
    gl_FragColor = vec4(color, alpha);
}

