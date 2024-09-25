vec3 meteor(vec2 uv, float gtime, float delay) {
    float seed = round(gtime, delay);
    float startTime = (delay - 1.5) * random(seed);
    float time = max(0.0, min(1.0, gtime-seed - startTime));
    vec2 start = vec2(random2(seed), 0.7 + 0.3 * random(seed+0.1));
    vec2 end = start * 0.5;
    uv = uv - mix(start, end, time);
    end = normalize(end - start);
    uv = uv * mat2(end.x, end.y, -end.y, end.x);
    uv.x *= 0.1;
    
    float starSizeFactor = 2.0;
    float alpha = 16.0 * pow(time, 2.0) * pow(time - 1.0, 2.0);
    return vec3(max(0.0, alpha - resolution.y * length(uv) / starSizeFactor));
}
