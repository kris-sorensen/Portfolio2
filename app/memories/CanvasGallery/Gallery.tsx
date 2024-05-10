import { Preload, ScrollControls, Scroll } from "@react-three/drei";
import GalleryPages from "./GalleryPages/GalleryPages";

const Gallery = () => {
  return (
    <>
      <ScrollControls
        infinite
        horizontal
        damping={0.35}
        pages={10}
        distance={1}
      >
        <Scroll>
          <GalleryPages />
        </Scroll>
        <Scroll html>
          <h1 className="absolute top-[20vh] left-[-75vw] text-[14rem]">
            Tails
          </h1>
          <h1 className="absolute top-[20vh] left-[25vw] text-[14rem]">We</h1>
          <h1 className="absolute top-[20vh] left-[125vw] text-[14rem]">
            Love
          </h1>
          <h1 className="absolute top-[20vh] left-[225vw] text-[14rem]">
            Dogs
          </h1>
          <h1 className="absolute top-[20vh] left-[325vw] text-[14rem]">At</h1>

          <h1 className="absolute top-[20vh] left-[425vw] text-[14rem]">
            Happy
          </h1>
          <h1 className="absolute top-[20vh] left-[525vw] text-[14rem]">
            Tails
          </h1>
          {/* <h1 className="absolute top-[20vh] left-[625vw] text-[14rem]">Of</h1>
          <h1 className="absolute top-[20vh] left-[725vw] text-[14rem]">
            Utah
          </h1> */}
          {/* <h1 className="absolute top-[20vh] left-[825vw] text-[14rem]">Do</h1> */}
        </Scroll>
      </ScrollControls>
      <Preload />
    </>
  );
};

export default Gallery;
