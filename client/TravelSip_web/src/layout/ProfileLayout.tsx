import React from "react";
import { NavBarProfile, SideBarProfile } from "../component";

import { Outlet } from "react-router-dom";

const ProfileLayout = () => {
  return (
    <div className="grid h-full grid-cols-4 gap-0">
        <SideBarProfile />
      <div className="col-span-3 h-full overflow-auto">
        <NavBarProfile />
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileLayout;
