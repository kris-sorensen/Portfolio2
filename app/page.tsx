import { Metadata } from "next";
import CanvasComponent from "./components/CanvasComponent/CanvasComponent";
import Css from "./components/Css/Css";

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <Css />
      <CanvasComponent />
    </div>
  );
}

// Updated Metadata
export const metadata: Metadata = {
  title: "Kristopher Sorensen - Creative Developer",
  description:
    "Explore immersive 3D web experiences, interactive UI design, and cutting-edge WebGL projects by Kristopher Sorensen. Specializing in high-performance visuals with React Three Fiber, GLSL, and interactive storytelling.",
  openGraph: {
    title: "Kristopher Sorensen - Creative Developer",
    description:
      "Award-winning creative developer specializing in 3D web experiences, React Three Fiber, and immersive UI design.",
    url: "https://kristopherdev.com",
    siteName: "Kristopher Sorensen Portfolio",
    images: [
      {
        url: "https://yourwebsite.com/preview-image.jpg", // Change to your actual preview image
        width: 1200,
        height: 630,
        alt: "Kristopher Sorensen Portfolio - 3D Web Experiences",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kristopher Sorensen - Creative Developer",
    description:
      "Building immersive and visually stunning 3D web experiences with React Three Fiber, WebGL, and GLSL.",
    images: ["https://kristopherdev.com/preview-image.jpg"], // Change this
  },
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
