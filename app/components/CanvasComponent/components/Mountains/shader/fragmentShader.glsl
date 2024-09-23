uniform vec2 resolution;
in vec2 vUv;


// Function to generate the mountain shape based on x-coordinate
float mountainShape(float x) {
    // Transition points for the peaks and valleys
    float x1 = 0.25;  // intersection of blue and red
    float x2 = 0.66;  // intersection of green and red
    float x3 = 1.3;    // intersection of purple and red

    // Heights for the peaks and valleys
    float h1 = 1.0;  // Height of the first peak
    float h2 = .25; // Valley height
    float h3 = 1.5;  // Height of the second peak

    // Using smoothstep for smooth transitions
    float peak1 = mix(h1, h2, smoothstep(x1, x2, x));
    float peak2 = mix(h2, h3, smoothstep(x2, x3, x));
    
    // Combine both peaks
    return mix(peak1, peak2, step(x2, x));
}

void main() {
    // Get the current fragment's x-coordinate
    vec2 coords = (gl_FragCoord.xy / resolution) - vec2(.5);
    float x = gl_FragCoord.x / resolution.x * 2.0 - 1.0; // Normalize x from -1 to 1
    float y = gl_FragCoord.y / resolution.y * 2.0 - 1.0; // Normalize y from -1 to 1

    // // Compute the height of the mountain at this x-coordinate
    // float mountainHeight = mountainShape(x);

    // // Set the alpha channel based on the comparison
    // // float alpha = step(mountainHeight, y); // Alpha is 1.0 if above the mountain, 0.0 if below
    float alpha = 1.;

    float mountainAngle = .5;

    float slopePeak1 = 1. - step(x -.55, mountainAngle * y); 
    float decentPeak1 = step(x -1.3, mountainAngle * -y);
    float peak1 = min(slopePeak1, decentPeak1);

    float slopePeak2 = 1. - step(x - 1.2, mountainAngle * y); 
    float decentPeak2 = step(x - 3.5, mountainAngle * -y);
    float peak2 = min(slopePeak2, decentPeak2);

    float mountain = peak2 + peak1;

    alpha *= mountain;
    // Output color with adjusted alpha
    vec3 color = vec3(0. ,.2 ,1.); // Assume white or any base color




    gl_FragColor = vec4(color,  alpha);
}
