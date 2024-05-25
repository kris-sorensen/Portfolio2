"use client";
import React, { useState, ReactNode } from "react";
import Link from "next/link";

interface DropdownMenuProps {
  label: string; // Text on the dropdown trigger
  link: string; // URL for the navigation
  children: ReactNode; // Dropdown content
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  label,
  link,
  children,
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const openDropdown = () => {
    if (isDropdownOpen) return;
    setDropdownOpen(true);
  };

  const closeDropdown = () => setDropdownOpen(false);

  return (
    <span
      onMouseEnter={openDropdown}
      onMouseLeave={closeDropdown}
      onClick={closeDropdown}
      className="relative"
    >
      <Link
        href={link}
        className="cursor-pointer text-blue-500 hover:text-blue-700 whitespace-nowrap"
      >
        {label}
      </Link>
      <div
        className={`absolute left-0 py-2 w-48 bg-white shadow-xl z-50 transition-opacity delay-200 duration-700 ease ${
          isDropdownOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {children}
      </div>
    </span>
  );
};

export default DropdownMenu;
