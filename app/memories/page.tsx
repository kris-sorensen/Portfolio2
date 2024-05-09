import React from "react";
import CanvasGallery from "./CanvasGallery/CanvasGallery";
import GalleryOverlay from "./GalleryOverlay/GalleryOverlay";
// todo: auto gallery move if user is not scrolling at first?

function Memories() {
  return (
    <>
      <CanvasGallery />
      <GalleryOverlay />
    </>
  );
}

export default Memories;
