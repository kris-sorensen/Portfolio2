import React from "react";
import Image from "next/image";
import Link from "next/link";

const GalleryOverlay = () => {
  return (
    <>
      <div className="absolute inset-0 pointer-events-none">
        <Link
          href="https://www.instagram.com/happytailsutah/"
          target="_blank"
          className="absolute bottom-11 left-20 text-xl text-black font-medium hover:text-custom-red pointer-events-auto"
        >
          Follow us
        </Link>
        <div
          className={`absolute top-0 left-10 text-xl text-black mt-header-PlusPadding font-medium`}
        >
          Like your dogs image on Instagram to be featured here!
        </div>
        <div className="absolute bottom-10 right-10 text-sm text-black font-medium">
          10/15/2021
        </div>
      </div>
      <Image
        src="/images/social/instagram.svg"
        alt="instagram_link"
        className="absolute bottom-10 left-10 w-7.5"
        width={35}
        height={35}
      />
    </>
  );
};

export default GalleryOverlay;
