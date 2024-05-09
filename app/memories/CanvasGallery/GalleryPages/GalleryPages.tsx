import React from "react";
import { useThree } from "@react-three/fiber";
import GalleryPage from "./GalleryPage/GalleryPage";

function GalleryPages() {
  const { width } = useThree((state) => state.viewport);
  return (
    <>
      <GalleryPage
        position={[-width * 1, 0, 0]}
        urls={[
          "/images/gallery/ball.webp",
          "/images/gallery/ball2.webp",
          "/images/gallery/bath.webp",
        ]}
      />
      <GalleryPage
        position={[width * 0, 0, 0]}
        urls={[
          "/images/gallery/bath2.webp",
          "/images/gallery/dogLove.webp",
          "/images/gallery/grooming.webp",
        ]}
      />
      <GalleryPage
        position={[width * 1, 0, 0]}
        urls={[
          "/images/gallery/halloween2.webp",
          "/images/gallery/party.webp",
          "/images/gallery/training.webp",
        ]}
      />
      <GalleryPage
        position={[width * 2, 0, 0]}
        urls={[
          "/images/gallery/ball.webp",
          "/images/gallery/ball2.webp",
          "/images/gallery/bath.webp",
        ]}
      />
      <GalleryPage
        position={[width * 3, 0, 0]}
        urls={[
          "/images/gallery/bath2.webp",
          "/images/gallery/dogLove.webp",
          "/images/gallery/grooming.webp",
        ]}
      />
      <GalleryPage
        position={[width * 4, 0, 0]}
        urls={[
          "/images/gallery/halloween2.webp",
          "/images/gallery/party.webp",
          "/images/gallery/training.webp",
        ]}
      />
      <GalleryPage
        position={[width * 5, 0, 0]}
        urls={[
          "/images/gallery/ball.webp",
          "/images/gallery/ball2.webp",
          "/images/gallery/bath.webp",
        ]}
      />
      <GalleryPage
        position={[width * 6, 0, 0]}
        urls={[
          "/images/gallery/bath2.webp",
          "/images/gallery/dogLove.webp",
          "/images/gallery/dogLove.webp",
        ]}
      />
      <GalleryPage
        position={[width * 7, 0, 0]}
        urls={[
          "/images/gallery/grooming.webp",
          "/images/gallery/halloween2.webp",
          "/images/gallery/party.webp",
        ]}
      />
      <GalleryPage
        position={[width * 8, 0, 0]}
        urls={[
          "/images/gallery/training.webp",
          "/images/gallery/ball.webp",
          "/images/gallery/ball2.webp",
        ]}
      />
    </>
  );
}

export default GalleryPages;
