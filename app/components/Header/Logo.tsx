import React from "react";
import Image from "next/image";

const Logo = () => {
  return (
    <div>
      <Image
        src={"https://bit.ly/react-cover"}
        alt="Happy Tails Utah Logo"
        width={100}
        height={50}
        // fill
        className="object-cover"
        // sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
        quality={100}
        priority //* don't lazy load. Lazy load Images auto on
      />
      {/* <Image src="/path-to-your-logo.png" alt="Logo" className="h-10" /> */}
    </div>
  );
};

export default Logo;
