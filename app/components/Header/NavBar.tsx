import React from "react";
import Link from "next/link";

const NavBar = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="space-x-5 mb-5">
        <Link href="/" className="text-blue-500 hover:text-blue-700">
          Home
        </Link>
        <Link className="text-blue-500 hover:text-blue-700" href="/about">
          More Info
        </Link>
        <Link className="text-blue-500 hover:text-blue-700" href="/contact-us">
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
  );
};

export default NavBar;
