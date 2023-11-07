import React from "react";
import { Footer, Navbar } from "../component";
import { Outlet } from 'react-router-dom';

const NormalLayout: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default NormalLayout;
