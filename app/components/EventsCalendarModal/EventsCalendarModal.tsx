"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const animationTime = 300;
// todo: instead of setTimeout, use transitionend event listener

function EventsCalendarModal() {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => {
      router.push("/");
    }, animationTime);
  };

  return (
    <div
      onClick={closeModal}
      className={`fixed inset-0 bg-gray-600 bg-opacity-50 transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      } ease-out duration-300`}
    >
      <div className="bg-white p-5 rounded-lg w-1/2 h-1/2 top-1/4 left-1/4 absolute">
        <h2>Special Events</h2>

        <button className="text-black" onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
}

export default EventsCalendarModal;
