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
