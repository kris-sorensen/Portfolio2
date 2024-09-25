let animProgress = 0;

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
