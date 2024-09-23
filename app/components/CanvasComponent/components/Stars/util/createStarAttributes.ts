import { useThree } from "@react-three/fiber";

// * fill attribute arrays
const createStarAttributes = (config) => {
  const { viewport, camera } = useThree();
  console.log(`config`, config);
  // * attributes
  // const colors = new Float32Array(config.particleCount * 3);
  const positions = new Float32Array(config.particleCount * 3);
  // const velocities = new Float32Array(config.particleCount);
  // const index = new Float32Array(config.particleCount);

  for (let i = 0; i < config.particleCount; i++) {
    const i3 = i * 3;
    // * positions
    positions[i3] = Math.random() * 3 - 1.5; // x between -1.5 and 1.5
    positions[i3 + 1] = Math.random() * 2 - 1; // y between -1 and 1
    positions[i3 + 2] = -1; // z fixed at -1

    // // * velocities
    // velocities[i] = Math.random() * power;

    // // * index
    // index[i] = i;

    // // * colors
    // //red
    // if (i % 6 == 0) {
    //   colors[i3] = 1;
    //   colors[i3 + 1] = 0;
    //   colors[i3 + 2] = 0;
    // }
    // //blue
    // else if (i % 10 == 0) {
    //   colors[i3] = 0;
    //   colors[i3 + 1] = 0;
    //   colors[i3 + 2] = 1;
    // }
    // // purple
    // else if (i % 7) {
    //   colors[i3] = 0.498;
    //   colors[i3 + 1] = 0.031;
    //   colors[i3 + 2] = 1;
    // }
  }
  return {
    // colors: colors,
    positions: positions,
  };
};

export default createStarAttributes;
