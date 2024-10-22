import React, { useState, useEffect } from "react";
import useStore from "@/app/store/useStore";
import "./style/nextPageBtn.css";

const NextPageBtn = () => {
  const setPage = useStore((state) => state.setPage);
  const Page = useStore((state) => state.Page);

  // State to control button visibility
  const [showButton, setShowButton] = useState(false);

  // useEffect to set a timer for showing the button
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 10000); // 10 seconds in milliseconds

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    setPage(Page === 2 ? 1 : 2);
  };

  // Conditionally render the button
  if (!showButton) {
    return null; // Don't render anything if showButton is false
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-40 left-1/2 transform -translate-x-1/2 bg-green-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-2000 z-20"
    >
      Work
    </button>
  );
};

export default NextPageBtn;
