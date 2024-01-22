import React from "react";
import { Link } from "react-router-dom";
import { TiThMenuOutline } from "react-icons/ti";
import { showDrawer } from "../reusable/ReusableDrawer";
import { SideBarProfile } from "..";

const NavBarProfile: React.FC = () => {
  const nav_items = [
    { nav: "Home", link: "/" },
    { nav: "My Booking", link: "/bookings" },
  ];

  const handleOpenMenu = () => {
    showDrawer(<SideBarProfile />, "left");
  };

  return (
    <div className="flex justify-center px-12 justify-between py-16 items-center">
      <button
        className="text-xLarge text-red block md:hidden"
        onClick={() => handleOpenMenu()}
      >
        <TiThMenuOutline />
      </button>
      <div className="container ">
        <header className="flex justify-end items-center">
          <ul className="flex items-center">
            {nav_items.map((item) => (
              <li className="mr-12 text-red font-bold" key={item.nav}>
                <Link to={item.link}>{item.nav}</Link>
              </li>
            ))}
          </ul>
          <Link to="/">
            <h1 className="text-red font-xBold text-xLarge">Logo</h1>
          </Link>
        </header>
      </div>
    </div>
  );
};

export default NavBarProfile;
