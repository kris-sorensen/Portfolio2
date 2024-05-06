import React from "react";
import Logo from "./Logo";
import NavBar from "./NavBar";
import PortalBtn from "./PortalBtn";
// todo:
/*
 * Menu links

 */

const Header = () => {
  return (
    <div className="flex justify-between bg-slate-200 p-5 relative z-10">
      <Logo />
      <NavBar />
      <PortalBtn />
    </div>
  );
};

export default Header;
