import React from "react";
import { Footer, Navbar, ReusableDrawer, TopNavMobile } from "../component";
import { Outlet } from "react-router-dom";

const NormalLayoutChild: React.FC = () => {
  return (
    <div className="h-full">
      <TopNavMobile />
      <Navbar />
      <Outlet />
      <Footer />
      <ReusableDrawer />
    </div>
  );
};

export default NormalLayoutChild;
