import dynamic from "next/dynamic";
import { Metadata } from "next";
import ActionBar from "./components/ActionBar/ActionBar";
import CanvasComponent from "./components/CanvasComponent/CanvasComponent";
import { HEADER_HEIGHT } from "./constants/style.constant";
//todo: for test
// import EventsCalendarModal from "./components/EventsCalendarModal/EventsCalendarModal";
// import ScheduleOptionsModal from "./components/ScheduleOptionsModal/ScheduleOptionsModal";
const EventsCalendarModal = dynamic(
  () => import("./components/EventsCalendarModal/EventsCalendarModal"),
  {
    // ssr: false, // * disable pre-rendering on server if needed
    // loading: () => <Loader />,
  }
);
const ScheduleOptionsModal = dynamic(
  () => import("./components/ScheduleOptionsModal/ScheduleOptionsModal"),
  {
    // ssr: false, // * disable pre-rendering on server if needed
    // loading: () => <Loader />,
  }
);

interface Props {
  searchParams: {
    eventsCalendar: string;
    displayMap: string;
    schedule: string;
  };
}

export default function Home({
  searchParams: { eventsCalendar, displayMap, schedule },
}: Props) {
  return (
    <div
      className="min-h-screen relative"
      style={{ minHeight: `calc(100vh - ${HEADER_HEIGHT})` }}
    >
      <CanvasComponent />
      <ActionBar />
      {eventsCalendar === "true" && <EventsCalendarModal />}
      {schedule === "true" && <ScheduleOptionsModal />}
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
