"use client";
import React, { useState } from "react";
import "./css/darkModeToggle.css";
import useStore from "@/app/store/useStore";
import { delayMap } from "@/app/anim/animManager";

const DarkModeToggle = () => {
  const setPage = useStore((state) => state.setPage);
  const Page = useStore((state) => state.Page);
  const [isDisabled, setIsDisabled] = useState(false); // Track toggle state

  const handleToggle = () => {
    if (isDisabled) return; // Prevent clicking while disabled

    setIsDisabled(true); // Disable toggle
    setPage(Page === 2 ? 1 : 2);

    setTimeout(() => {
      setIsDisabled(false); // Re-enable toggle after timeout
    }, delayMap[2] * 2);
  };

  return (
    <div className="darkModeToggle">
      {/* Hidden Checkbox */}
      <input
        type="checkbox"
        id="toggle"
        className="toggle--checkbox"
        checked={Page === 1}
        onChange={handleToggle}
        disabled={isDisabled} // Disable input when state is true
      />
      {/* Styled Label */}
      <label
        htmlFor="toggle"
        className={`toggle--label ${isDisabled ? "disabled" : ""}`}
      >
        <span className="toggle--label-background"></span>
      </label>
    </div>
  );
};

export default DarkModeToggle;
