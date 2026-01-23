import React from "react";

const Title = () => {
  return (
    <div className="z-10 absolute w-screen h-screen pointer-events-none">
      <div className="flex flex-col items-center justify-center bg-transparent h-screen">
        <div className="text-center ">
          <h1 className="text-8xl font-bold bg-none text-white inline-block px-10 py-4">
            BALLOON FACTORY
          </h1>
          <div className="">
            <span className="bg-none text-white px-20 py-2 inline-block text-3xl">
              KRISTOPHER SORENSEN
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Title;
