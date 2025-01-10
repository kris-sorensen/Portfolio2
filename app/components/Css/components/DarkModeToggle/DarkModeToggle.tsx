import React from "react";
import "./css/darkModeToggle.css";
import useStore from "@/app/store/useStore";

const DarkModeToggle = () => {
  const setPage = useStore((state) => state.setPage);
  const Page = useStore((state) => state.Page);

  const handleToggle = () => setPage(Page === 2 ? 1 : 2);

  return (
    <div className="darkModeToggle">
      {/* Hidden Checkbox */}
      <input
        type="checkbox"
        id="toggle"
        className="toggle--checkbox"
        checked={Page === 1}
        onChange={handleToggle}
      />
      {/* Styled Label */}
      <label htmlFor="toggle" className="toggle--label">
        <span className="toggle--label-background"></span>
      </label>
    </div>
  );
};

export default DarkModeToggle;
