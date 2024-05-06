import Image from "next/image";
import Link from "next/link";
import ProductCard from "./components/ProductCard/ProductCard";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import Loader from "./components/Loader/Loader";
import ActionBar from "./components/ActionBar/ActionBar";
import CanvasComponent from "./components/CanvasComponent/CanvasComponent";

export default function Home() {
  return (
    <div
      className="min-h-screen relative"
      style={{ minHeight: "calc(100vh - 188px)" }}
    >
      <CanvasComponent />
      {/* React Three Fiber Canvas */}
      {/* <Canvas>Your 3D scene setup here</Canvas> */}
      <ActionBar />
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
