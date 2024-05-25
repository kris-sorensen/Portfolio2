import React from "react";
import Link from "next/link";
import ServicesLinks from "./ServicesLinks";
import MoreInfoLinks from "./MoreInfoLinks";
import DropdownMenu from "../../DropDownMenu/DropDownMenu";

const NavBar = () => {
  return (
    <div className="flex-col lg:flex lg:flex-row lg:items-center lg:justify-between lg:space-x-3 mb-5">
      <Link href="/" className="text-blue-500 hover:text-blue-700">
        Home
      </Link>
      <DropdownMenu label="More Info" link="/more-info">
        <Link
          href="/fist-time"
          shallow
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          First Time
        </Link>
        <Link
          href="/reviews"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Reviews
        </Link>
        <Link
          href="/suggestions"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Suggestions
        </Link>
        <Link
          href="/testimonials"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Testimonials
        </Link>
        <Link
          href="/about-us"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          About Us
        </Link>
        <Link
          href={{ pathname: "/", query: { eventsCalendar: true } }}
          shallow
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Special Events
        </Link>
        <Link
          href="/about-us"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Location
        </Link>
        {/* Additional links can be added here */}
      </DropdownMenu>
      {/* <MoreInfoLinks /> */}
      <Link
        className="text-blue-500 hover:text-blue-700 whitespace-nowrap"
        href="/contact-us"
      >
        Contact Us
      </Link>
      <DropdownMenu label="Services" link="/services">
        <Link
          href="/services/dog-boarding"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Dog Boarding
        </Link>
        <Link
          href="/services/dog-daycare"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Dog Daycare
        </Link>
        <Link
          href="/services/cat-boarding"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Cat Boarding
        </Link>
        <Link
          href="/services/grooming"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Grooming
        </Link>
        <Link
          href="/services/training"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Training
        </Link>
        <Link
          href="/services/memberships"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Memberships
        </Link>
        <Link
          href="/services/other-services"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Other Services
        </Link>
      </DropdownMenu>
      {/* <ServicesLinks /> */}
      <Link className="text-blue-500 hover:text-blue-700" href="/memories">
        Memories
      </Link>
    </div>
  );
};

export default NavBar;
