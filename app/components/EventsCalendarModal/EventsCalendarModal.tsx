"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { eventData } from "./data/EventCalendar.data";

const animationTime = 300;
// todo: instead of setTimeout, use transitionend event listener
// todo: animate
// todo: stylize
// todo: add cal images
// todo: if no cal images exist. say no events scheduled
// todo: for mobile and smaller screens only render list
// todo: make cal images dynamic sizing

function EventsCalendarModal() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => {
      router.push("/");
    }, animationTime);
  };

  const changeMonth = (delta: number) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev.getFullYear(), prev.getMonth() + delta, 1);
      return newDate;
    });
  };

  const renderCalendar = () => {
    console.log(`render cal`);
    const month = currentDate.toLocaleString("en-US", { month: "long" });
    const year = currentDate.getFullYear();
    const currentKey = `${month} ${year}`;

    const events = eventData[currentKey] || [];

    return (
      <div className="flex w-full h-full py-8">
        <div className="flex-2 bg-white mr-5">
          <Image
            // src={`/path/to/images/${month}-${year}.png`}
            src={`/images/calendar/1.png`}
            alt={`${month} ${year}`}
            width={800}
            height={500}
          />
        </div>
        <div className="flex-1 overflow-y-auto p-6 text-center">
          {events.length > 0 ? (
            events.map((event, index: number) => (
              <div key={event.date + index}>
                <h1>{event.title}</h1>
                <h2 className="font-bold">{`${event.date} - ${event.time}`}</h2>
              </div>
            ))
          ) : (
            <p>No events scheduled for this month.</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      onClick={closeModal}
      className={`items-center justify-center h-screen flex fixed inset-0 bg-gray-600 bg-opacity-50 transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      } ease-out duration-300 z-20`}
    >
      <div
        className="bg-white rounded-lg absolute w-5/6 h-4/5 p-16 text-black flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4">
          <button className="text-2xl" onClick={() => changeMonth(-1)}>
            ←
          </button>
          <span className="mx-4 text-2xl">
            {currentDate.toLocaleString("en-US", { month: "long" })}{" "}
            {currentDate.getFullYear()}
          </span>
          <button className="text-2xl" onClick={() => changeMonth(1)}>
            →
          </button>
        </div>
        {renderCalendar()}
      </div>
    </div>
  );
}

export default EventsCalendarModal;
