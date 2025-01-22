import { useCallback, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { delayMap, speedMap, updateAnimProgress } from "@/app/anim/animManager";
import useStore from "@/app/store/useStore";

const useAnimProgress = () => {
  // Fetch initial state
  const pageRef = useRef<number>(useStore.getState().Page);

  // Connect to the store on mount, disconnect on unmount, catch state-changes in a reference
  useEffect(() => {
    return useStore.subscribe((state) => {
      pageRef.current = state.Page;
    });
  }, []);

  const targetProgress = useRef(0);
  const transitionSpeed = useRef(0.1);

  const prevPageRef = useRef(pageRef.current);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const updateTargetProgress = useCallback(() => {
    if (prevPageRef.current !== pageRef.current) {
      prevPageRef.current = pageRef.current;

      // Clear any existing timer
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }

      const delay = delayMap[pageRef.current] || 0;

      // Set a new timer for the delay
      timerRef.current = setTimeout(() => {
        switch (pageRef.current) {
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
        // Clear the timer after execution
        timerRef.current = null;
      }, delay);
    }
  }, []);

  useFrame((state, delta) => {
    updateTargetProgress(); // Update target progress based on Page with delay
    updateAnimProgress(targetProgress.current, delta, transitionSpeed.current);
  });

  // Cleanup function to clear the timer when the component unmounts
  return () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };
};

export default useAnimProgress;
