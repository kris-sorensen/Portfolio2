import React from "react";

const Title = () => {
  return (
    <div className="z-10 absolute w-screen h-screen">
      <div className="flex flex-col items-center justify-center bg-transparent h-screen">
        {/* <div className="flex justify-between w-full max-w-4xl items-center">
        <button className="absolute text-sm font-bold px-2 py-1 hover:underline">
          WORK
        </button>
        <button className="left-2 absolute text-sm font-bold px-2 py-1 hover:underline">
          ABOUT
        </button>
      </div> */}
        <div className="text-center ">
          <h1 className="text-7xl font-bold bg-none text-white inline-block px-10 py-4">
            BALLOON FACTORY
          </h1>
          <div className="">
            <span className="bg-none text-white px-20 py-2 inline-block text-xl">
              KRISTOPHER SORENSEN
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Title;
