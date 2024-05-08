import Link from "next/link";
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
        <button className="bg-custom-red text-white py-3 px-8 rounded hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 font-bold">
          Schedule
        </button>

        {/* Information Sections */}
        <div className="flex items-center space-x-8 text-black">
          {/* More Info Section */}
          <Link
            href="/more-info/first-time"
            className="flex items-center space-x-3"
          >
            <MdPermDeviceInformation className="text-xl" color="#6861d5" />
            <div>
              <h2 className="text-sm font-medium">First Time</h2>
              <p className="text-xs">More Info</p>
            </div>
          </Link>

          {/* Map Section */}
          <Link href="/location" className="flex items-center space-x-3">
            <MdPlace className="text-xl" color="#61d568" />
            <div>
              <h2 className="text-sm font-medium">Lehi, Utah</h2>
              <p className="text-xs">Map</p>
            </div>
          </Link>

          {/* Special Events Section */}
          <Link href="/calendar" className="flex items-center space-x-3">
            <MdDateRange color="#D56861" className="text-xl" />
            <div>
              <h2 className="text-sm font-medium">Special Events</h2>
              <p className="text-xs">Calendar</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default ActionBar;
