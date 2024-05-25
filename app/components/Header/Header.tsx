import React from "react";
import Logo from "./Logo";
import NavBar from "./NavBar/NavBar";
import PortalBtn from "./PortalBtn";

const Header = () => {
  return (
    <div className="flex bg-custom-offWhite p-5 relative z-10 shadow-lg">
      <div className="flex-1">
        <Logo />
      </div>
      <div className="flex-1 flex justify-center flex-col items-center">
        <NavBar />
        <h1 className="text-6xl font-light text-gray-700">Join the Fun!</h1>
      </div>
      <div className="flex-1 flex justify-end">
        <PortalBtn />
      </div>
    </div>
  );
};

export default Header;
