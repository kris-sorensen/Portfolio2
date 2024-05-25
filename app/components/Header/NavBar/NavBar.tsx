import React from "react";
import Link from "next/link";
import ServicesLinks from "./ServicesLinks";
import MoreInfoLinks from "./MoreInfoLinks";

const NavBar = () => {
  return (
    <div className="flex-col lg:flex lg:flex-row lg:items-center lg:justify-between lg:space-x-3 mb-5">
      <Link href="/" className="text-blue-500 hover:text-blue-700">
        Home
      </Link>
      <MoreInfoLinks />
      <Link
        className="text-blue-500 hover:text-blue-700 whitespace-nowrap"
        href="/contact-us"
      >
        Contact Us
      </Link>
      <ServicesLinks />
      <Link className="text-blue-500 hover:text-blue-700" href="/memories">
        Memories
      </Link>
    </div>
  );
};

export default NavBar;
