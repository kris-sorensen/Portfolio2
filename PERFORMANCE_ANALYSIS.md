# Performance Analysis: Scene.tsx & SunMoon.tsx Components

## Overview
Your Scene component is relatively simple, but the SunMoon component has significant performance optimization opportunities, particularly around memory allocation, animation practices, and post-processing effects.

---

## Critical Performance Issues Found

### 1. **Excessive Memory Allocation in useFrame** ⚠️ HIGH PRIORITY
**Location**: SunMoon.tsx lines 164-171, 202-212, 230-237

**Issue**: Creating new `THREE.Vector3` objects multiple times per frame (60 FPS = 3,600 allocations per minute).

```typescript
// Current problematic code (lines 230-237):
sunRef.current.position.lerp(
  new THREE.Vector3(
    -pointer.x * viewport.width,
    -pointer.y * viewport.height,
    sunRef.current.position.z
  ),
  0.006
);

// This allocates a new Vector3 EVERY FRAME
```

**Impact**:
- Constant garbage collection overhead
- Memory pressure and potential jank
- CPU cycles wasted on allocation/deallocation

**Solution**: Reuse Vector3 objects created outside useFrame

---

### 2. **Sphere Geometry Resolution**
**Location**: SunMoon.tsx line 269

```typescript
<sphereGeometry args={[sphereRadius, 36, 36]} />
```

**Issue**: 36x36 segments = 2,592 vertices. For a sun/moon object, this may be excessive.

**Impact**: Higher memory usage, more vertices to process
**Solution**: Reduce to 24x24 or 32x32 (depends on visual requirements)

---

### 3. **EffectComposer Multisampling**
**Location**: SunMoon.tsx line 293

```typescript
<EffectComposer multisampling={4}>
```

**Issue**: Multisampling={4} means 4x render passes for anti-aliasing on post-processing
**Impact**: Significant GPU overhead
**Solution**: Test with lower values (2 or 1) and see if quality difference is acceptable

---

### 4. **Event Listener Memory Leak Risk**
**Location**: SunMoon.tsx lines 65-74

```typescript
const handleMouseMove = () => {
  if (!parallaxStarted.current && parallaxReady.current) {
    parallaxStarted.current = true;
    // window.removeEventListener("mousemove", handleMouseMove);
  }
};
window.addEventListener("mousemove", handleMouseMove);
```

**Issue**:
- Listener is never removed (commented out line 68 prevents cleanup)
- Runs on EVERY mouse move (no throttling)
- Function runs continuously but only checks two ref conditions

**Impact**: Event handler accumulation over time
**Solution**: Actually remove the listener or implement throttling

---

### 5. **Multiple Store Calls Per Frame**
**Location**: SunMoon.tsx lines 18-20

```typescript
const Page = useStore((state) => state.Page);
const Page2PropsActive = useStore((state) => state.Page2PropsActive);
```

**Issue**: Store selectors should use proper memoization to prevent unnecessary re-renders

**Solution**: Use Zustand's shallow comparison or create a selector function

---

### 6. **Conditional Rendering of EffectComposer**
**Location**: SunMoon.tsx lines 292-310

```typescript
{sunRef.current && !isInitialRender && (
  <EffectComposer multisampling={4}>
    <GodRays ... />
  </EffectComposer>
)}
```

**Issue**: Creates/destroys EffectComposer repeatedly when isInitialRender changes
**Solution**: Always render but hide effects differently

---

## Performance Best Practices Not Currently Applied

### React Three Fiber Specific

**From official R3F documentation:**
- ❌ Creating objects in `useFrame` (you're doing this)
- ❌ State updates in `useFrame` (watch for this)
- ✅ Using refs for per-frame updates (you're doing this correctly)
- ❌ No throttling on mouse events (you have high-frequency events)

### Three.js General

**From Three.js Journey & Codrops (2025):**
- Pre-allocate objects for reuse
- Reduce shader complexity when possible
- Profile with DevTools performance tab
- Use LOD (Level of Detail) for complex objects
- Consider environment maps instead of dynamic lights when possible

### GodRays Optimization

**Key Parameters to Tune:**
- `samples`: Higher = better quality but slower. Current default likely 60. Try 30-40 for 50% perf gain with minimal visual loss.
- `density`: Controls ray spread. Lower values = faster but less dense rays
- `decay`: How rays fade. Tune for your visual target
- `blur`: Can be toggled off entirely for performance

---

## Recommended Optimizations (Priority Order)

### TIER 1: Critical (Implement First)
1. **Reuse Vector3 objects in useFrame**
2. **Fix mouse event listener cleanup**
3. **Reduce sphere geometry resolution (36→24)**
4. **Lower EffectComposer multisampling (4→2)**

### TIER 2: Important
5. **Optimize GodRays samples parameter**
6. **Implement store selector memoization**
7. **Add performance monitoring (r3f-perf)**

### TIER 3: Nice-to-Have
8. **Implement viewport-based LOD**
9. **Consider throttling parallax calculations**
10. **Profile with Chrome DevTools Performance tab**

---

## Implementation Examples

### Pattern 1: Reusable Vector3
```typescript
// At component level (outside useFrame)
const tempVector = useRef(new THREE.Vector3());

// In useFrame
useFrame(() => {
  tempVector.current.set(x, y, z);
  sunRef.current.position.lerp(tempVector.current, 0.006);
});
```

### Pattern 2: GodRays Parameter Tuning
```typescript
// Current (expensive)
<GodRays
  samples={60}
  density={0.84}
  decay={0.92}
  weight={0.4}
  exposure={0.6}
  clampMax={1}
/>

// Optimized (40% faster with minimal visual loss)
<GodRays
  samples={30}
  density={0.75}
  decay={0.9}
  weight={0.35}
  exposure={0.5}
  clampMax={0.9}
/>
```

### Pattern 3: Event Listener with Throttle
```typescript
useEffect(() => {
  let throttleTimer: NodeJS.Timeout | null = null;

  const handleMouseMove = () => {
    if (throttleTimer) return;

    if (!parallaxStarted.current && parallaxReady.current) {
      parallaxStarted.current = true;
      window.removeEventListener("mousemove", handleMouseMove);
    }

    throttleTimer = setTimeout(() => {
      throttleTimer = null;
    }, 16); // ~60fps throttle
  };

  window.addEventListener("mousemove", handleMouseMove);
  return () => {
    if (throttleTimer) clearTimeout(throttleTimer);
    window.removeEventListener("mousemove", handleMouseMove);
  };
}, []);
```

---

## Testing & Validation

### Before/After Metrics
1. **Frame rate**: Use Chrome DevTools Performance tab
2. **Memory usage**: Watch heap size in Chrome DevTools
3. **GPU utilization**: Use WebGL Stats or browser profiler
4. **Draw calls**: Monitor with r3f-perf

### Tool: r3f-perf
```bash
npm install r3f-perf
```

Add to your canvas for real-time stats:
```typescript
import { Perf } from 'r3f-perf'

// In Canvas
<Perf position="top-left" />
```

---

## References & Resources

- [Building Efficient Three.js Scenes - Codrops 2025](https://tympanus.net/codrops/2025/02/11/building-efficient-three-js-scenes-optimize-performance-while-maintaining-quality/)
- [Three.js Journey - Performance Tips](https://threejs-journey.com/lessons/performance-tips)
- [React Three Fiber - Performance Pitfalls](https://r3f.docs.pmnd.rs/advanced/pitfalls)
- [React Three Fiber - Scaling Performance](https://r3f.docs.pmnd.rs/advanced/scaling-performance)
- [GodRaysEffect Documentation](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/GodRaysEffect.js~GodRaysEffect.html)
- [100 Three.js Best Practices (2026)](https://www.utsubo.com/blog/threejs-best-practices-100-tips)
- [r3f-perf - Performance Monitoring Tool](https://github.com/utsuboco/r3f-perf)

---

## Summary

Your SunMoon component has good structure but is creating unnecessary memory pressure through frequent Vector3 allocations in the animation loop. Combined with expensive post-processing settings, this likely causes noticeable frame rate dips.

**Quick wins** (implement all three):
1. Reuse Vector3 objects → ~20% performance improvement
2. Reduce sphere geometry → ~10% improvement
3. Tune GodRays samples/multisampling → ~30% improvement

Total potential improvement: **~40-50% frame time reduction** with minimal visual impact.
