"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import qrCodeImage from "@/public/images/qrCode/qrcode.webp";
import {
  PHONE_DISPLAY,
  PHONE_NUMBER,
} from "@/app/constants/contactInfo.constant";
import { PORTAL_LINK } from "@/app/constants/links.constant";

//todo: replace QR code with one for app store
//todo: replace Portal link when available
//todo: GA for what gets clicked. Is there a way to tell if QR code is scanned? maybe if nothing else is hit and it stays open or by download numbers?

const animationTime = 300;

const ScheduleOptionsModal = () => {
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
      className={`items-center justify-center h-screen flex fixed inset-0 bg-gray-600 bg-opacity-50 transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      } ease-out duration-300 z-20`}
    >
      <div
        className=" bg-blue-500 rounded-lg absolute w-[600px] h-[600px] p-16 text-white flex flex-col items-center shadow-2xl justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-2 right-5">
          <button
            className="text-4xl text-gray-950 hover:text-gray-600 transform transition"
            onClick={closeModal}
          >
            &times; {/* This represents the 'X' to close modal */}
          </button>
        </div>
        <h3 className="font-bold mb-9 text-xl">RESERVE A SPOT WITH OUR APP!</h3>
        <div className="flex flex-col items-center">
          <Image
            src={qrCodeImage}
            alt="QR Code"
            width={200}
            height={200}
            className="shadow-lg"
          />
        </div>
        <p className="my-4 text-lg">or</p>
        <button className="bg-black text-white px-16 py-3 rounded font-bold shadow-lg hover:scale-105 transform transition">
          <Link href={PORTAL_LINK}>ONLINE RESERVATION</Link>
        </button>
        <div className="flex items-center mt-4">
          <div className="mt-6 text-center">
            <p>Have a question?</p>
            <p className="mt-1">
              <Link href={`sms:${PHONE_NUMBER}`} className="text-black">
                Text/Call -{" "}
                <span className="text-custom-green font-bold">
                  {PHONE_DISPLAY}
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleOptionsModal;
