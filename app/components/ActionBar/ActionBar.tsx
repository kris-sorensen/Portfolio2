import React from "react";
import { MdPlace, MdPermDeviceInformation, MdDateRange } from "react-icons/md";

function ActionBar() {
  return (
    <>
      {/* Information Box */}
      <div
        className="absolute bottom-[5%] left-1/2 transform -translate-x-1/2 bg-white bg-opacity-85 shadow-lg p-5 rounded-lg w-[650px] h-[100px] flex items-center justify-center space-x-8"
        style={{ maxWidth: "90%" }}
      >
        {/* Schedule Button */}
        <button className="bg-blue-500 text-white py-3 px-8 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Schedule
        </button>

        {/* Information Sections */}
        <div className="flex items-center space-x-8 text-black">
          {/* Destination Section */}
          <div className="flex items-center space-x-3">
            <MdPlace className="text-xl " />
            <div>
              <h2 className="text-sm ">Lehi, Utah</h2>
              <p className="text-xs">Map</p>
            </div>
          </div>

          {/* Average Price Section */}
          <div className="flex items-center space-x-3">
            <MdPermDeviceInformation className="text-xl" />
            <div>
              <h2 className="text-sm">More Info</h2>
              <p className="text-xs">First Time</p>
            </div>
          </div>

          {/* Date Section */}
          <div className="flex items-center space-x-3">
            <MdDateRange className="text-xl" />
            <div>
              <h2 className="text-sm ">Special Events</h2>
              <p className="text-xs">Calendar</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ActionBar;
