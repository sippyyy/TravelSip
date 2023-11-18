import React from "react";
import { Footer, NavBarMobile, Navbar } from "../component";
import { Outlet } from "react-router-dom";

const NormalLayout: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <div className="h-[70px] block  md:hidden"></div>
      <Footer />
      <NavBarMobile />
    </div>
  );
};

export default NormalLayout;
