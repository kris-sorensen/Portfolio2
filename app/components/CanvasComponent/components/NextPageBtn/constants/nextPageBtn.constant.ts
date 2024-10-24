export let isHovered = false;

export const toggleHovered = () => {
  isHovered = !isHovered;
};

export const setHovered = (value: boolean) => {
  // Get the canvas element
  const canvas = document.querySelector("canvas");

  if (canvas) {
    if (value === true) {
      canvas.style.cursor = "pointer";
    } else {
      canvas.style.cursor = "default";
    }
  }

  isHovered = value;
};
