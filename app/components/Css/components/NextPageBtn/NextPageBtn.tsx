import React from "react";
import useStore from "@/app/store/useStore";

const NextPageBtn = () => {
  const nextPage = useStore((state) => state.nextPage);

  const handleClick = () => {
    nextPage();
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-green-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 z-20"
    >
      Work
    </button>
  );
};

export default NextPageBtn;
