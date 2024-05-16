import React from "react";
import Link from "next/link";

const services = [
  { name: "Dog Boarding", href: "/services/dog-boarding" },
  { name: "Dog Daycare", href: "/services/dog-daycare" },
  { name: "Cat Boarding", href: "/services/cat-boarding" },
  { name: "Grooming", href: "/services/grooming" },
  { name: "Training", href: "/services/training" },
  { name: "Memberships", href: "/services/memberships" },
  { name: "Other Services", href: "/services/other" },
];

const ServicesMenu = () => {
  return (
    <div className="w-1/2  bg-white p-32">
      <h1 className="text-7xl mb-10 font-bold text-black">
        Happy Tails Services
      </h1>
      <ul>
        {services.map((service) => (
          <li key={service.name} className="mb-5">
            <Link
              href={service.href}
              className="text-4xl font-medium text-blue-500 hover:text-blue-700"
            >
              {service.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServicesMenu;
