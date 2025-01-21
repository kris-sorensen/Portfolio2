"use client";
import React from "react";

const GlobalErrors = ({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black text-white text-center p-6">
      <h1 className="text-4xl font-bold mb-4 font-sans">
        Something went wrong
      </h1>
      <p className="text-lg mb-6 font-sans">
        {error.message || "An unexpected error occurred."}
      </p>

      {/* Reset Button */}
      <button
        onClick={reset}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-md transition-all font-sans"
      >
        Try Again
      </button>
    </div>
  );
};

export default GlobalErrors;
