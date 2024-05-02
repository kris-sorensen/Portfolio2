import React from "react";
import Image from "next/image";
import testImage from "@/public/next.svg";

const AboutPage = () => {
  // * Use Image because it compresses image and sizes it automatically
  // * Images that are links need to be registered in config file (next.js)
  return (
    <div className="relative h-screen">
      <Image src={testImage} alt="test image" />
      <Image
        src={"https://bit.ly/react-cover"}
        alt="test image"
        fill
        className="object-cover"
        sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
        quality={100}
        priority //* don't lazy load. Lazy load Images auto on
      />
    </div>
  );
};

export default AboutPage;
