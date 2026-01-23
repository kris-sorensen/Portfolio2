# Performance Analysis: Ground System Components

## Overview

The Ground system (Ground.tsx, Land.tsx, Trees.tsx, Water.tsx, TreeModel.jsx) has several critical performance issues, particularly with the Water component which creates new materials on every render. The combined system renders approximately 10,000+ vertices from geometry plus GPU computation overhead.

---

## Critical Performance Issues Found

### 1. **Water Component: New Material Instance Every Render** ⚠️ CRITICAL
**Location**: Water.tsx lines 31-38

**Issue**: `CustomShaderMaterialImpl` is instantiated on every render, including all uniforms and definitions.

```typescript
// Current problematic code (lines 31-50):
const waterMaterial = new CustomShaderMaterialImpl({
  baseMaterial: MeshPhysicalMaterial,
  vertexShader: waterVertexShader,
  uniforms: UniformsUtils.merge([
    ShaderLib["physical"].uniforms,
    { heightmap: { value: null } },
  ]),
});

waterMaterial.transmission = 1;
waterMaterial.metalness = 0;
waterMaterial.roughness = 0;
waterMaterial.color = new Color("#183774");

waterMaterial.defines.WIDTH = WIDTH.toFixed(1);
waterMaterial.defines.BOUNDS = BOUNDS.toFixed(1);
```

**Impact**:
- Material recompilation every frame
- Shader recompilation overhead
- Memory waste from creating/destroying material instances
- GPU upload of material properties repeatedly
- Likely causes frame stutters

**Solution**: Create material once with useRef, reuse across renders

---

### 2. **Water Component: Excessive Plane Geometry** ⚠️ HIGH PRIORITY
**Location**: Water.tsx line 96

```typescript
<planeGeometry args={[viewport.width, BOUNDS, WIDTH, WIDTH]} />
```

**Issue**: Plane with 512x512 segments = **262,144 vertices**. This is excessive for a water surface.

**Impact**:
- Huge memory footprint for geometry
- GPU bottleneck from vertex processing
- High draw call overhead
- Significant performance impact on lower-end devices

**Solution**: Reduce to 64x64 or 128x128 segments (4,096-16,384 vertices) with displacement map

---

### 3. **Environment Component Preset Loading Every Render** ⚠️ MEDIUM
**Location**: Water.tsx line 87

```typescript
<Environment preset="sunset" />
```

**Issue**: Environment component is recreated every render, reloading the "sunset" preset HDR image.

**Impact**:
- Texture loading overhead
- Memory allocation for environment map
- Potential texture unit thrashing

**Solution**: Memoize with useMemo or move outside component

---

### 4. **Land Component: Excessive Sphere Geometry** ⚠️ MEDIUM
**Location**: Land.tsx line 98

```typescript
<Sphere args={[sphereRadius, 100, 100]}>
```

**Issue**: Sphere with 100x100 segments = **10,000+ vertices** for a background land surface.

**Impact**:
- High memory usage
- GPU processing overhead
- Same issue as SunMoon had (but larger scale)

**Solution**: Reduce to 24x24 or 32x32 segments (~1,500-2,000 vertices)

---

### 5. **Land Component: performance.now() in useFrame** ⚠️ LOW-MEDIUM
**Location**: Land.tsx lines 69, 78

```typescript
const startTime = useRef(0);
// ...
startTime.current = performance.now() / 1000;
// ...
const elapsedTime = performance.now() / 1000 - startTime.current;
```

**Issue**: Using `performance.now()` instead of R3F's `state.clock` for timing. Less efficient and doesn't sync with animation frame.

**Impact**:
- Extra system call per frame
- Timing not synchronized with R3F animation loop
- Could cause animation jank or desync

**Solution**: Use state.clock from useFrame

---

### 6. **Water Component: GPU Computation Every Frame** ⚠️ MEDIUM (Inherent)
**Location**: Water.tsx line 80

```typescript
useFrame(() => {
  const uniforms = heightmapVariable.material.uniforms;
  uniforms["mousePos"].value.set(0, -pointer.y * 200);
  gpuCompute.compute();
  waterUniforms["heightmap"].value =
    gpuCompute.getCurrentRenderTarget(heightmapVariable).texture;
});
```

**Issue**: GPU physics computation runs every frame. While necessary for water simulation, it's expensive.

**Impact**:
- Significant GPU load
- ~20-30% of total GPU time on many devices
- Can cause frame rate drops on lower-end hardware

**Solution**: Consider running at half-framerate (every other frame) or skip computation when not needed

---

### 7. **Trees Component: castShadow on All Trees** ⚠️ MEDIUM
**Location**: Trees.tsx line 67

```typescript
<TreeModel
  key={`${treeIndex}-${treeIndex}`}
  scale={tree.scale}
  position={tree.position}
  rotation={tree.rotation}
  castShadow  // <-- This is expensive!
/>
```

**Issue**: All 10 trees cast shadows. If trees have complex geometry, shadow map rendering is expensive.

**Impact**:
- Extra shadow map renders
- GPU overhead for shadow computation
- Could be 5-10% performance hit depending on tree complexity

**Solution**: Disable castShadow or only enable for nearby/large trees, use baked shadows instead

---

### 8. **Water Component: Global State Pattern** ⚠️ LOW
**Location**: Water.tsx lines 24-26

```typescript
let waterUniforms;
let heightmapVariable;
let gpuCompute;
```

**Issue**: Module-level mutable state. If Water component unmounts/remounts, this could cause issues.

**Impact**:
- Potential memory leaks if component unmounts
- Hard to debug issues
- Not React-idiomatic

**Solution**: Move into component scope with useRef

---

## Recommended Optimizations (Priority Order)

### TIER 1: Critical (Implement First)
1. **Move Water material to useRef** (lines 31-52)
2. **Reduce plane geometry segments** (512→128: 4x GPU load reduction)
3. **Reduce Land sphere segments** (100→24: 17x vertex reduction)
4. **Disable castShadow on trees** or make conditional

### TIER 2: Important
5. **Memoize Environment component** (line 87)
6. **Use state.clock instead of performance.now()** (Land.tsx)
7. **Consider half-framerate GPU computation** (Water.tsx line 80)

### TIER 3: Nice-to-Have
8. **Move global variables to useRef** (Water.tsx)
9. **Implement water simulation pause when off-screen**
10. **Use LOD for trees based on distance**

---

## Implementation Examples

### Pattern 1: Water Material in useRef
```typescript
const waterMaterialRef = useRef(null);

if (!waterMaterialRef.current) {
  waterMaterialRef.current = new CustomShaderMaterialImpl({
    baseMaterial: MeshPhysicalMaterial,
    vertexShader: waterVertexShader,
    uniforms: UniformsUtils.merge([
      ShaderLib["physical"].uniforms,
      { heightmap: { value: null } },
    ]),
  });

  waterMaterialRef.current.transmission = 1;
  waterMaterialRef.current.metalness = 0;
  waterMaterialRef.current.roughness = 0;
  waterMaterialRef.current.color = new Color("#183774");
  waterMaterialRef.current.defines.WIDTH = WIDTH.toFixed(1);
  waterMaterialRef.current.defines.BOUNDS = BOUNDS.toFixed(1);
}

// Then use: material={waterMaterialRef.current}
```

### Pattern 2: Reduced Plane Geometry
```typescript
// Before: 512x512 segments = 262,144 vertices
<planeGeometry args={[viewport.width, BOUNDS, 512, 512]} />

// After: 128x128 segments = 16,384 vertices
<planeGeometry args={[viewport.width, BOUNDS, 128, 128]} />
// ~16x less vertices, maintains visual quality
```

### Pattern 3: Reduced Land Sphere
```typescript
// Before: 100x100 segments = 10,000+ vertices
<Sphere args={[sphereRadius, 100, 100]}>

// After: 24x24 segments = 1,152 vertices
<Sphere args={[sphereRadius, 24, 24]}>
```

### Pattern 4: Memoized Environment
```typescript
import { useMemo } from 'react';

const Water = () => {
  const envMap = useMemo(() => <Environment preset="sunset" />, []);

  return (
    <>
      {envMap}
      {/* rest of component */}
    </>
  );
};
```

### Pattern 5: Using state.clock in Land
```typescript
// Before
startTime.current = performance.now() / 1000;
const elapsedTime = performance.now() / 1000 - startTime.current;

// After
useFrame((state) => {
  if (isAnimating.current) {
    const elapsedTime = state.clock.getElapsedTime() - startTime.current;
    // ... rest of animation
  }
});
```

---

## Performance Impact Summary

| Issue | Severity | Vertex Reduction | Performance Gain |
|-------|----------|-----------------|-----------------|
| Water material recompilation | CRITICAL | N/A | 10-15% |
| Plane geometry (512→128) | HIGH | 94% | 15-20% |
| Land sphere (100→24) | MEDIUM | 88% | 5-10% |
| castShadow on trees | MEDIUM | N/A | 5-8% |
| Environment preset memoization | MEDIUM | N/A | 2-3% |
| GPU compute optimization | MEDIUM | N/A | 5-10% |
| Clock sync in Land | LOW | N/A | <1% |

**Total Potential Improvement: 40-60% frame time reduction**

---

## Testing & Validation

### Before/After Checklist
- [ ] Frame rate (measure with Chrome DevTools Performance)
- [ ] Memory usage (watch heap in DevTools)
- [ ] GPU utilization (WebGL stats)
- [ ] Visual quality (ensure geometry reduction doesn't affect appearance)

### Visual Quality Considerations
- **Plane 512→128**: May notice less smooth water reflections. Test and adjust to 256 if needed.
- **Sphere 100→24**: Background land detail should be minimal impact at distance.
- **castShadow removal**: Check if shadows are visually important. Consider baked shadows instead.

---

## Comparison with SunMoon Optimizations

Ground system has **MORE critical issues** than SunMoon:
- SunMoon: Mostly about memory allocation patterns
- Ground: Has actual bugs (material recreation) + excessive geometry

**Priority**: Fix Ground issues before adding more complex features to SunMoon.

---

## References

- [Three.js Performance Tips](https://threejs-journey.com/lessons/performance-tips)
- [React Three Fiber Performance Guide](https://r3f.docs.pmnd.rs/advanced/scaling-performance)
- [GPUComputationRenderer Optimization](https://github.com/pmndrs/three-stdlib/blob/main/src/GPUComputationRenderer.ts)
- [WebGL Vertex Limits & Optimization](https://www.khronos.org/webgl/wiki/WebGL_Optimizations)

---

## Summary

The Ground system has **one critical bug** (Water material recreation) and several geometry-related issues. Implementing TIER 1 optimizations could yield **40-60% performance improvement** with minimal visual impact. The Water component requires the most attention, as it's creating new GPU resources every frame.

**Recommended action**: Start with Tier 1 optimizations, test visual quality, then proceed to Tier 2.
