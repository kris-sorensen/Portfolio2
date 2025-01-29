import React, { useState, useEffect } from "react";
import { Perf } from "r3f-perf";

const PerformanceMonitor = () => {
  const [isVisible, setIsVisible] = useState(true); // Initially hidden

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Check if the user pressed "Command + 9" (Alt for Windows/Linux)
      if ((event.altKey || event.metaKey) && event.key === "u") {
        setIsVisible((prev) => !prev); // Toggle visibility
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  if (!isVisible) return null; // Hide if not visible

  return <Perf position={"bottom-right"} />;
};

export default PerformanceMonitor;
