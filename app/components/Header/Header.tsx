import React from "react";
import Logo from "./Logo";
import NavBar from "./NavBar/NavBar";
import PortalBtn from "./PortalBtn";
// todo:
/*
 * Menu links

 */

const Header = () => {
  return (
    <div className="flex justify-between bg-custom-offWhite p-5 relative z-10 shadow-lg">
      <Logo />
      <div className="flex flex-col items-center">
        <NavBar />
        <h1 className="text-6xl font-bold text-gray-700">Join the Fun!</h1>
      </div>
      <PortalBtn />
    </div>
  );
};

export default Header;
