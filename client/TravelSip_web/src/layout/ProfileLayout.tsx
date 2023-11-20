import React from "react";
import { NavBarProfile, ReusableDrawer, SideBarProfile } from "../component";

import { Outlet } from "react-router-dom";

const ProfileLayout = () => {
  return (
    <div className="grid h-full grid-cols-4 gap-0">
      <div className="h-full hidden md:block">
        <SideBarProfile />
      </div>
      <div className="col-span-4 md:col-span-3 h-full overflow-auto">
        <NavBarProfile />
        <Outlet />
      </div>
      <ReusableDrawer />
    </div>
  );
};

export default ProfileLayout;
