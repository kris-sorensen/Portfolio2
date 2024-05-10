import ServicesMenu from "../components/ServicesMenu/ServicesMenu";
import { HEADER_HEIGHT } from "../constants/style.constant";
// todo: add scroll damping to service information
export default function RootServices({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className="flex"
      style={{
        minHeight: `calc(100vh - ${HEADER_HEIGHT})`,
        maxHeight: `calc(100vh - ${HEADER_HEIGHT})`, // Ensure the div does not exceed the remaining viewport height
        overflow: "hidden", // This prevents any overflow outside this container on the main axis
      }}
    >
      <ServicesMenu />
      <div className="w-1/2 p-32 bg-gray-100 overflow-auto text-black">
        {children} {/* This inner div will scroll if content is too long */}
      </div>
    </div>
  );
}
