import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <span className="loading loading-spinner text-secondary font-sans"></span>
    </div>
  );
};

export default Loader;
