import React from "react";
import { Footer, NavBarMobile, Navbar, ReusableDrawer } from "../component";
import { Outlet } from "react-router-dom";

const NormalLayout: React.FC = () => {
  return (
    <div className="h-full">
      <Navbar />
      <Outlet />
      <div className="h-[70px] block  md:hidden"></div>
      <Footer />
      <NavBarMobile />
      <ReusableDrawer />
    </div>
  );
};

export default NormalLayout;
