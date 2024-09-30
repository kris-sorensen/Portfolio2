vec3 meteorstorm(vec2 uv){
    return meteor(uv, time, 9.5837) + meteor(uv, time + 15.3, 15.459) + meteor(uv, time + 125.0, 31.2);
}



