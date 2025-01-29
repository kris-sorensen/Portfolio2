import { useControls } from "leva";
import useStore from "@/app/store/useStore";

const Shadows = () => {
  const EnableShadows = useStore((state) => state.EnableShadows);
  const setEnableShadows = useStore((state) => state.setEnableShadows);

  useControls("Scene", {
    Shadows: {
      value: EnableShadows,
      onChange: (value) => setEnableShadows(value),
    },
  });
  return null;
};

export default Shadows;
