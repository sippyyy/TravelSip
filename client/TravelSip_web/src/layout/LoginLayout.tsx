import React from "react";
import { Outlet } from "react-router-dom";
import loginImg from '../assets/images/bg1.png'

const LoginLayout = () => {
  return (
    <div className="flex justify-center h-full">
      <div className="container h-full flex items-center">
        <div className="w-1/2 relative">
          <img src={loginImg} className="w-full" />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default LoginLayout;
