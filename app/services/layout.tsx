import ServicesMenu from "../components/ServicesMenu/ServicesMenu";
import { HEADER_HEIGHT } from "../constants/style.constant";

export default function RootServices({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className="flex"
      style={{ minHeight: `calc(100vh - ${HEADER_HEIGHT})` }}
    >
      <ServicesMenu />
      <div className="w-1/2  bg-gray-100 p-10 overflow-auto text-black">
        {children}
      </div>
    </div>
  );
}
