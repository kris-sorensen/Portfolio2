// Function to generate the mountain shape
float mountainShape(float x, float peak1Offset, float peak1Slope, float peak1Decent, float peak2Offset, float peak2Slope, float peak2Decent) {
    float mountainAngle = .5;
    float slopePeak1 = 1.0 - step(x - peak1Offset, mountainAngle * peak1Slope);
    float decentPeak1 = step(x - peak1Decent, mountainAngle * -peak1Slope);
    float peak1 = min(slopePeak1, decentPeak1);
    float slopePeak2 = 1.0 - step(x - peak2Offset, mountainAngle * peak2Slope);
    float decentPeak2 = step(x - peak2Decent, mountainAngle * -peak2Slope);
    float peak2 = min(slopePeak2, decentPeak2);
    return max(peak1, peak2);
}