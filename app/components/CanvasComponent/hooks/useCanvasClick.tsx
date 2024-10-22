import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import useStore from "@/app/store/useStore";

const useCanvasClick = () => {
  const { gl } = useThree();
  const setPage = useStore((state) => state.setPage);
  const Page = useStore((state) => state.Page);

  useEffect(() => {
    const canvas = gl.domElement;
    console.log("canvas", canvas);

    // Event handler for canvas click
    const handleCanvasClick = (event) => {
      console.log("Canvas clicked!", event);
      setPage(Page === 2 ? 1 : 2);
    };

    canvas.addEventListener("click", handleCanvasClick);

    // Cleanup function to remove the event listener on unmount
    return () => {
      canvas.removeEventListener("click", handleCanvasClick);
    };
  }, [gl, setPage, Page]);
};

export default useCanvasClick;
