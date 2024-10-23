let animProgress = 0;
export const sunMoonPropChangeDelay = 12000;

export const speedMap = {
  1: 1 / 6,
  2: 1 / 6,
  3: 1 / 10,
};

// Define delay for each page in milliseconds
export const delayMap = {
  1: 6000, // 6 second delay for Page 1
  2: sunMoonPropChangeDelay - 2000, // 12 seconds delay for Page 2
  3: 3000, // 3 seconds delay for Page 3
};

// Function to update animProgress
export const updateAnimProgress = (
  targetProgress: number,
  delta: number,
  transitionSpeed: number
) => {
  const diff = targetProgress - animProgress;
  const step = delta * transitionSpeed;

  // Update animProgress value
  if (Math.abs(diff) < step) {
    animProgress = targetProgress;
  } else {
    animProgress += Math.sign(diff) * step;
  }

  return animProgress;
};

// Function to get the current value of animProgress
export const getAnimProgress = () => {
  return animProgress;
};
