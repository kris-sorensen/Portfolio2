import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { speedMap, updateAnimProgress } from "@/app/anim/animManager";
import useStore from "@/app/store/useStore";

const useAnimProgress = () => {
  console.log(`useAnimProgress hook`);
  const targetProgress = useRef(0);
  const transitionSpeed = useRef(0.1);
  const Page = useStore((state) => state.Page); // Use global store to get Page

  const prevPageRef = useRef(Page);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Define delay for each page in milliseconds
  const delayMap = {
    1: 6000, // No delay for Page 1
    2: 6000, // 6 seconds delay for Page 2
    3: 3000, // 3 seconds delay for Page 3
  };

  const updateTargetProgress = () => {
    if (prevPageRef.current !== Page) {
      prevPageRef.current = Page;

      // Clear any existing timer
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }

      const delay = delayMap[Page] || 0;

      // Set a new timer for the delay
      timerRef.current = setTimeout(() => {
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
        // Clear the timer after execution
        timerRef.current = null;
      }, delay);
    }
  };

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
