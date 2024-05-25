"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
// todo: fix menu not closing when go away from services wo going into dropdown w/ mouse

const MoreInfoLinks = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {}, [isDropdownOpen]);

  const openDropdown = () => {
    if (isDropdownOpen) return;
    setDropdownOpen(true);
  };

  const closeDropdown = () => setDropdownOpen(false);

  return (
    <span
      onMouseEnter={openDropdown}
      // onMouseLeave={closeDropdown}
      className="relative"
    >
      <Link
        href="/more-info"
        className="cursor-pointer text-blue-500 hover:text-blue-700 whitespace-nowrap"
      >
        More Info
      </Link>
      {isDropdownOpen && (
        <div
          onMouseLeave={closeDropdown}
          className="absolute left-0 py-2 w-48 bg-white shadow-xl z-50"
        >
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
        </div>
      )}
    </span>
  );
};

export default MoreInfoLinks;
