import React from "react";
import { Footer, NavBarMobile, Navbar } from "../component";
import { Outlet } from "react-router-dom";

const NormalLayout: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
      <NavBarMobile />
    </div>
  );
};

export default NormalLayout;
