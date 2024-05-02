import Image from "next/image";
import Link from "next/link";
import ProductCard from "./components/ProductCard/ProductCard";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import Loader from "./components/Loader/Loader";
import { MdPlace, MdPermDeviceInformation, MdDateRange } from "react-icons/md";

export default function Home() {
  return (
    <div
      className="min-h-screen relative"
      style={{ minHeight: "calc(100vh - 188px)" }}
    >
      {/* React Three Fiber Canvas */}
      {/* <Canvas>Your 3D scene setup here</Canvas> */}

      {/* Information Box */}
      <div
        className="absolute bottom-[5%] left-1/2 transform -translate-x-1/2 bg-white bg-opacity-85 shadow-lg p-5 rounded-lg w-[650px] h-[100px] flex items-center justify-center space-x-8"
        style={{ maxWidth: "90%" }}
      >
        {/* Schedule Button */}
        <button className="bg-blue-500 text-black py-3 px-8 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
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
    </div>
  );
}

export const metadata: Metadata = {
  title: "Happy Tails Dog Boarding and Dog Daycare",
  description: "Dog boarding and dog daycare in Lehi, Utah.",
};

// * metadata that needs to be dynamically generated
// export async function generateMetaData(): Promise<Metadata> {
//   const product = await fetch("");

//   return {
//     title: product.title,
//     description: product.description,
//   };
// }
// * Lazy load component, only large heavy components. You can also lazy load libraries. Refer to next.js mosh course
// const HeavyComponent = dynamic(
//   () => import("./components/HeavyComponent/HeavyComponent"),
//   {
//     ssr: false, // * disable pre-rendering on server if needed
//     loading: () => <Loader />,
//   }
// );
