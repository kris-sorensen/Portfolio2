#define round(x, f) (floor((x)/(f) + 0.5) * (f))
uniform vec2 resolution;
uniform vec3 uColor;
uniform float time;
in vec2 vUv;

float random(float p){
    return fract(52.043*sin(p*205.429));
}
float random2(float p){
    return random(p)*2.0-1.0;
}




vec3 stars(vec2 uv){
    vec2 r = round(uv, 0.1);
    
    float rand = r.x*2.32 + r.y;
    
    uv -= r;
    uv.x += 0.05 * random2(rand);
    uv.y += 0.05 * random2(rand+0.541);
    
    float blink = random(rand+0.5) < 0.1 ? 0.8 + 0.2 * sin(35.0*time+random(rand+1.5)) : 0.0;
    float dark = random(rand+52.0) < 0.5 ? 1.0 : 0.3;
    
    return vec3(dark * max(0.0, 0.8 + blink - resolution.y * length(uv)));
}

vec3 meteor(vec2 uv, float gtime, float delay)
{
    float seed = round(gtime, delay);
    
    float startTime = (delay - 1.5) * random(seed);
    float time = max(0.0, min(1.0, gtime-seed - startTime));
    
    vec2 start = vec2(
        random2(seed),
        0.7 + 0.3 * random(seed+0.1)
    );
    
    vec2 end = start * 0.5;
    
    uv = uv - mix(start, end, time);
    
    end = normalize(end - start);
    uv = uv * mat2(end.x, end.y, -end.y, end.x);
    uv.x *= 0.1;
    
    float alpha = 16.0 * pow(time, 2.0) * pow(time - 1.0, 2.0);
    return vec3(max(0.0, alpha - resolution.y * length(uv)));
}

vec3 meteorstorm(vec2 uv){
    return meteor(uv, time, 9.5837) + meteor(uv, time + 15.3, 15.459) + meteor(uv, time + 125.0, 31.2);
}



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

    // float stars = vec3(1.);
    float quantity = 50.;

    // vec2 guv = (fragCoord.xy - vec2(resolution.x*0.5, 0.0)) / resolution.y;

   
    vec3 col =
        stars(coords) + meteorstorm(coords);

    col = sqrt(col);
    // fragColor = vec4(sqrt(col), 1.0);



    // Modify alpha based on the mountain shape

    alpha *= mountain;
    // alpha += col;

    // Output color with adjusted alpha
    vec3 color = uColor; // base color
    vec3 snowCaps = vec3(1.);
    // Snow Caps
    color += col;
    color = mix(color, snowCaps, step((sin(x * 22.)*.1) + 1.3, y));

    gl_FragColor = vec4(color, alpha);
}

