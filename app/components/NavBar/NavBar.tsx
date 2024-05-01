import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <div className="flex mb-5 bg-slate-200 p-5">
      <Link className="mr-5" href="/">
        Home
      </Link>
      <Link className="mr-5" href="/about">
        About
      </Link>
      <Link className="mr-5" href="/contact-us">
        Contact Us
      </Link>
    </div>
  );
};

export default NavBar;
