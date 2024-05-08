import { Metadata } from "next";
// import dynamic from "next/dynamic";
import ActionBar from "./components/ActionBar/ActionBar";
import CanvasComponent from "./components/CanvasComponent/CanvasComponent";
import { HEADER_HEIGHT } from "./constants/style.constant";
import EventsCalendarModal from "./components/EventsCalendarModal/EventsCalendarModal";

interface Props {
  searchParams: { eventsCalendar: string; displayMap: string };
}

export default function Home({
  searchParams: { eventsCalendar, displayMap },
}: Props) {
  return (
    <div
      className="min-h-screen relative"
      style={{ minHeight: `calc(100vh - ${HEADER_HEIGHT})` }}
    >
      <CanvasComponent />
      <ActionBar />
      {eventsCalendar === "true" && <EventsCalendarModal />}
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
