# Component Cleanup Checklist

✅ CLEANUP COMPLETED - Items deleted are marked with [x]

## CSS Components (Commented Out - Safe to Delete)
- [x] ✅ DELETED: `app/components/Css/components/IDE/IDE.tsx`
- [x] ✅ DELETED: `app/components/Css/components/IDE/components/CodeEditor/CodeEditor.tsx`
- [x] ✅ DELETED: `app/components/Css/components/IDE/components/IDEControls/IDEControls.tsx`
- [x] ✅ DELETED: `app/components/Css/components/IDE/util/shaderUtils.ts`
- [ ] `app/components/Css/components/Menu/Menu.tsx`
- [ ] `app/components/Css/components/Title/Title.tsx`
- [x] ✅ DELETED: `app/components/Css/components/NextPageBtn/NextPageBtn.tsx` (CSS button version)

## Unused Canvas Components
- [ ] `app/components/CanvasComponent/components/WorkSlides/WorkSlides.tsx`
- [ ] `app/components/CanvasComponent/components/LiveShaderViewer/LiveShaderViewer.tsx`
- [ ] `app/components/CanvasComponent/components/Lights/Lights.tsx`
- [x] ✅ DELETED: `app/components/CanvasComponent/components/Ground/components/Ocean/Ocean.tsx`

## Unused Hooks & Utilities
- [ ] `app/components/CanvasComponent/hooks/useCanvasClick.tsx`
- [ ] `app/components/CanvasComponent/components/Config/hooks/useCanvasClick.tsx` (duplicate)

## Unused Shader Files
- [x] ✅ DELETED: `app/components/CanvasComponent/shader/MountainMaterial/MountainMaterial.tsx`
- [ ] `app/Shaders/BasicShader/BasicShaderMaterial.tsx`
- [ ] `app/Shaders/BasicShader/BasicShader.shader.ts`
- [x] ✅ DELETED: `app/Shaders/WelcomeText/WelcomeText.tsx`
- [x] ✅ DELETED: `app/Shaders/WelcomeText/WelcomeTextMaterial.tsx`
- [x] ✅ DELETED: `app/Shaders/WelcomeText/welcomeText.shader.ts`

## Orphaned Data Files
- [ ] `app/data/currentShader.ts` (only used by LiveShaderViewer)
- [x] ✅ DELETED: `app/data/premadeShaders.ts`

## Other Unused Components
- [ ] `app/components/Loader/Loader.tsx`

## Git-Deleted Components (Still Showing as Deleted)
- [ ] `app/components/CanvasComponent/components/Balloon/Balloon.tsx`
- [ ] `app/components/CanvasComponent/components/Balloon/BalloonContainer.tsx`
- [ ] `app/components/CanvasComponent/components/Balloon2/Balloon2.tsx`
- [ ] `app/components/CanvasComponent/components/BalloonMaker/BalloonMaker.tsx`
- [ ] `app/components/CanvasComponent/components/Frame/Frame.tsx`
- [ ] `app/components/CanvasComponent/components/Frame/components/Ellipsoid/Ellipsoid.tsx`
- [ ] `app/components/CanvasComponent/components/Frame/components/Ellipsoid/data/shader/checker.ts`
- [ ] `app/components/CanvasComponent/components/Frame/components/FrameMaterial/FrameMaterial.tsx`
- [ ] `app/components/CanvasComponent/components/Frame/components/ScreenOverlay/ScreenOverlay.tsx`
- [ ] `app/components/CanvasComponent/components/Frame/components/ScreenOverlay/shader/overlay.tsx`
- [ ] `app/components/CanvasComponent/components/Moon/Moon.tsx`
- [ ] `app/components/CanvasComponent/components/Mountain/Mountain.tsx`
- [ ] `app/components/CanvasComponent/components/Mountain/components/Triangle/Triangle.tsx`
- [ ] `app/components/CanvasComponent/components/Mountain/shader/MountainMaterial.tsx`
- [ ] `app/components/CanvasComponent/components/Mountain/shader/mountainMaterial.fragment.glsl`
- [ ] `app/components/CanvasComponent/components/Mountain/shader/mountainMaterial.vertex.glsl`
- [ ] `app/components/CanvasComponent/components/Room/Room.tsx`
- [ ] `app/components/CanvasComponent/components/Room/components/ConeTopShader/ConeTopShader.tsx`

## Next.js System Files (Usually Keep These)
- [ ] `app/default.tsx`
- [ ] `app/error.tsx`
- [ ] `app/global-error.tsx`
- [ ] `app/loading.tsx`
- [ ] `app/not-found.tsx`
