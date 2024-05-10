import { useThree } from "@react-three/fiber";
import GalleryImage from "./GalleryImage/GalleryImage";

interface GalleryPageProps {
  m?: number;
  urls: string[];
  position: [number, number, number];
}

const GalleryPage = ({
  m = 0.4,
  urls,
  position,
  ...props
}: GalleryPageProps) => {
  const { width } = useThree((state) => state.viewport);
  const w = width < 10 ? 1.5 / 3 : 1 / 3;
  return (
    <group {...props} position={position}>
      <GalleryImage
        position={[-width * w, 0, -1]}
        scale={[width * w - m * 2, 5, 1]}
        url={urls[0]}
      />
      <GalleryImage
        position={[0, 0, 0]}
        scale={[width * w - m * 2, 5, 1]}
        url={urls[1]}
      />
      <GalleryImage
        position={[width * w, 0, 1]}
        scale={[width * w - m * 2, 5, 1]}
        url={urls[2]}
      />
    </group>
  );
};

export default GalleryPage;
