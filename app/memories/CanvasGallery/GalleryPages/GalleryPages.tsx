import React from "react";
import { useThree } from "@react-three/fiber";
import GalleryPage from "./GalleryPage/GalleryPage";

function GalleryPages() {
  const { width } = useThree((state) => state.viewport);
  return (
    <>
      <GalleryPage
        position={[-width * 1, 0, 0]}
        urls={["/image1.jpg", "/image1.jpg", "/image1.jpg"]}
      />
      <GalleryPage
        position={[width * 0, 0, 0]}
        urls={["/image1.jpg", "/image1.jpg", "/image1.jpg"]}
      />
      <GalleryPage
        position={[width * 1, 0, 0]}
        urls={["/image1.jpg", "/image1.jpg", "/image1.jpg"]}
      />
      <GalleryPage
        position={[width * 2, 0, 0]}
        urls={["/image1.jpg", "/image1.jpg", "/image1.jpg"]}
      />
      <GalleryPage
        position={[width * 3, 0, 0]}
        urls={["/image1.jpg", "/image1.jpg", "/image1.jpg"]}
      />
      <GalleryPage
        position={[width * 4, 0, 0]}
        urls={["/image1.jpg", "/image1.jpg", "/image1.jpg"]}
      />
      <GalleryPage
        position={[width * 5, 0, 0]}
        urls={["/image1.jpg", "/image1.jpg", "/image1.jpg"]}
      />
      <GalleryPage
        position={[width * 6, 0, 0]}
        urls={["/image1.jpg", "/image1.jpg", "/image1.jpg"]}
      />
      <GalleryPage
        position={[width * 7, 0, 0]}
        urls={["/image1.jpg", "/image1.jpg", "/image1.jpg"]}
      />
      <GalleryPage
        position={[width * 8, 0, 0]}
        urls={["/image1.jpg", "/image1.jpg", "/image1.jpg"]}
      />
    </>
  );
}

export default GalleryPages;
