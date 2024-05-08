"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
// todo: fix menu not closing when go away from services wo going into dropdown w/ mouse

const ServicesLinks = () => {
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
        href="/services"
        className="cursor-pointer text-blue-500 hover:text-blue-700"
      >
        Services
      </Link>
      {isDropdownOpen && (
        <div
          onMouseLeave={closeDropdown}
          className="absolute left-0 py-2 w-48 bg-white shadow-xl z-50"
        >
          <Link
            href="/services/dog-boarding"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Boarding
          </Link>
          <Link
            href="/services/dog-daycare"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Daycare
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
            href="/services/other-services"
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
        </div>
      )}
    </span>
  );
};

export default ServicesLinks;
