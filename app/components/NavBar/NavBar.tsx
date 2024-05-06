import React from "react";
import Link from "next/link";
import Image from "next/image";
// todo:
/*
 * Header
 * Logo
 * Menu links
 * Portal
 * Giant text
 * Canvas (multi pages)
 * Video
 * Main Overlay (landing)
 * Links
 */

const NavBar = () => {
  return (
    <div className="flex justify-between bg-slate-200 p-5 relative z-10">
      {/* Logo */}
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

      {/* Centered Links and Call to Action */}
      <div className="flex flex-col items-center">
        <div className="space-x-5 mb-5">
          <Link href="/" className="text-blue-500 hover:text-blue-700">
            Home
          </Link>
          <Link className="text-blue-500 hover:text-blue-700" href="/about">
            More Info
          </Link>
          <Link
            className="text-blue-500 hover:text-blue-700"
            href="/contact-us"
          >
            Contact Us
          </Link>
          <Link className="text-blue-500 hover:text-blue-700" href="/services">
            Services
          </Link>
          <Link className="text-blue-500 hover:text-blue-700" href="/memories">
            Memories
          </Link>
        </div>
        <h1 className="text-6xl font-bold text-gray-700">Join the Fun!</h1>
      </div>

      {/* Portal Button */}
      <div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Pet Portal
        </button>
      </div>
    </div>
  );
};

export default NavBar;
