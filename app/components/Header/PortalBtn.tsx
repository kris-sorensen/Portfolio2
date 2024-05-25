"use client";
import Link from "next/link";
import React, { useState } from "react";

const PortalBtn = () => {
  const [showLinks, setShowLinks] = useState(false);
  const phoneNumber = "8013645683"; // Convert '801-Dog-Love' to a valid numeric phone number
  const phoneDisplay = "801-Dog-Love"; // Display version of the phone number

  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  return (
    <div>
      <span className="text-gray-800 mr-3 font-citrine">
        {showLinks ? (
          <>
            {/* For calling */}
            <Link href={`tel:${phoneNumber}`} className="mr-4">
              Call Us
            </Link>
            {/* For sending text messages */}
            <Link href={`sms:${phoneNumber}`}>Text Us</Link>
            {/* Button to toggle back */}
            <button
              onClick={toggleLinks}
              className="ml-4 text-blue-700 underline"
            >
              Back
            </button>
          </>
        ) : (
          <button onClick={toggleLinks}>
            Call/Text <span className="text-sky-800">{phoneDisplay}</span>
          </button>
        )}
      </span>
      <button className="bg-blue-300 hover:bg-blue-400 text-white font-bold py-3 px-5 rounded">
        Pet Portal
      </button>
    </div>
  );
};

export default PortalBtn;
