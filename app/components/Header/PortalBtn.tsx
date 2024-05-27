"use client";
import {
  PHONE_DISPLAY,
  PHONE_NUMBER,
} from "@/app/constants/contactInfo.constant";
import { PORTAL_LINK } from "@/app/constants/links.constant";
import Link from "next/link";
import React, { useState } from "react";

const PortalBtn = () => {
  const [showLinks, setShowLinks] = useState(false);

  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  return (
    <div>
      <span className="text-gray-800 mr-3 font-citrine">
        {showLinks ? (
          <>
            {/* For calling */}
            <Link href={`tel:${PHONE_NUMBER}`} className="mr-4">
              Call Us
            </Link>
            {/* For sending text messages */}
            <Link href={`sms:${PHONE_NUMBER}`}>Text Us</Link>
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
            Call/Text <span className="text-sky-800">{PHONE_DISPLAY}</span>
          </button>
        )}
      </span>
      <button className="bg-blue-300 hover:bg-blue-400 text-white font-bold py-3 px-5 rounded">
        <Link href={PORTAL_LINK}>Pet Portal</Link>
      </button>
    </div>
  );
};

export default PortalBtn;
