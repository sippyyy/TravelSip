import React from "react";
import { Outlet } from "react-router-dom";
import loginImg from "../assets/images/bg1.png";
import { ReusableDrawer } from "../component";

const LoginLayout = () => {
  return (
    <div className="flex justify-center h-full">
      <div className="container flex h-full items-center">
        <img src={loginImg} className="h-[700px] object-cover hidden md:block" />
        <div className="flex-1 flex items-center">
          <Outlet />
        </div>
      </div>
      <ReusableDrawer />
    </div>
  );
};

export default LoginLayout;
