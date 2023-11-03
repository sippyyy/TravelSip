import React from "react";
import { Navbar } from "../component";
import { Outlet } from 'react-router-dom';

const NormalLayout: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default NormalLayout;
