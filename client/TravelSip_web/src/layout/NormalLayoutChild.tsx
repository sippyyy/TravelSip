import React from "react";
import { Footer, Navbar, TopNavMobile } from "../component";
import { Outlet } from "react-router-dom";

const NormalLayoutChild: React.FC = () => {
  return (
    <div>
      <TopNavMobile />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default NormalLayoutChild;
