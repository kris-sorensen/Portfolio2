import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { updateAnimProgress } from "@/app/anim/animManager";
import useStore from "@/app/store/useStore";

const speedMap = {
  1: 1 / 6,
  2: 1 / 6,
  3: 1 / 10,
};

const useAnimProgress = () => {
  console.log(`useAnimProgress hook`);
  const targetProgress = useRef(0);
  const transitionSpeed = useRef(0.1);
  const Page = useStore((state) => state.Page); // Use global store to get Page

  // Memoized function to update target progress based on Page
  const updateTargetProgress = useMemo(() => {
    return () => {
      switch (Page) {
        case 1:
          targetProgress.current = 0;
          transitionSpeed.current = speedMap[1];
          break;
        case 2:
          targetProgress.current = 1;
          transitionSpeed.current = speedMap[2];
          break;
        case 3:
          targetProgress.current = 2;
          transitionSpeed.current = speedMap[3];
          break;
        default:
          targetProgress.current = 0;
      }
    };
  }, [Page]);

  useFrame((state, delta) => {
    updateTargetProgress(); // Update target progress based on Page
    updateAnimProgress(targetProgress.current, delta, transitionSpeed.current);
  });
};

export default useAnimProgress;
