import React from "react";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center text-white bg-black text-center p-6 font-sans select-none pointer-events-auto">
      <h1 className="text-4xl font-bold mb-4">
        The Requested Page Doesn&apos;t Exist
      </h1>

      {/* Return to Home Button */}
      <Link href="/">
        <button className="mt-6 px-6 py-3 border border-white text-white text-lg font-semibold rounded-md transition-all hover:bg-white hover:text-black">
          Return to Home
        </button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
