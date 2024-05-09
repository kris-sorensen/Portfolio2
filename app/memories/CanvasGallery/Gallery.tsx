import { Preload, Image as ImageImpl } from "@react-three/drei";
import {
  ScrollControls,
  Scroll,
} from "../../components/ScrollControls/ScrollControls";
import GalleryPages from "./GalleryPages/GalleryPages";

const Gallery = () => {
  return (
    <>
      <ScrollControls infinite horizontal damping={4} pages={6} distance={1}>
        <Scroll>
          <GalleryPages />
        </Scroll>
        <Scroll html>
          <h1 className="absolute top-[20vh] left-[-75vw] text-[10rem]">
            Tails
          </h1>
          <h1 className="absolute top-[20vh] left-[25vw] text-[10rem]">We</h1>
          <h1 className="absolute top-[20vh] left-[125vw] text-[10rem]">
            Love
          </h1>
          <h1 className="absolute top-[20vh] left-[225vw] text-[10rem]">
            Dogs
          </h1>
          <h1 className="absolute top-[20vh] left-[325vw] text-[10rem]">At</h1>

          <h1 className="absolute top-[20vh] left-[425vw] text-[10rem]">
            Happy
          </h1>
          <h1 className="absolute top-[20vh] left-[525vw] text-[10rem]">
            Tails
          </h1>
          {/* <h1 className="absolute top-[20vh] left-[625vw] text-[10rem]">Of</h1>
          <h1 className="absolute top-[20vh] left-[725vw] text-[10rem]">
            Utah
          </h1> */}
          {/* <h1 className="absolute top-[20vh] left-[825vw] text-[10rem]">Do</h1> */}
        </Scroll>
      </ScrollControls>
      <Preload />
    </>
  );
};

export default Gallery;
