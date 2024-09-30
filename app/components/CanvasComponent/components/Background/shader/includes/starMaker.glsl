vec3 starMaker(vec2 uv){
    vec2 r = round(uv, 0.1);
    float rand = r.x * 2.32 + r.y;
    uv -= r;
    uv.x += 0.05 * random2(rand);
    uv.y += 0.05 * random2(rand + 0.541);
    float blink = random(rand + 0.5) < 0.1 ? 0.8 + 0.2 * sin(35.0 * time + random(rand + 1.5)) : 0.0;
    float dark = random(rand + 52.0) < 0.5 ? 1.0 : 0.3;
    
    float starSizeFactor = 2.;
    return vec3(dark * max(0.0, 0.8 + blink - resolution.y * length(uv) / starSizeFactor));
}