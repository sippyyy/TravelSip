import React from "react";
import { Link } from "react-router-dom";

const NavBarProfile = () => {
  const nav_items = [
    { nav: "Home", link: "/" },
    { nav: "My Booking", link: "/bookings" },
  ];
  return (
    <div className="flex justify-center">
      <div className="px-12 container py-16">
        <header className="flex justify-end items-center">
          <ul className="flex items-center">
            {nav_items.map((item) => (
              <li className="mr-12 text-red font-bold" key={item.nav}>
                <Link to={item.link}>{item.nav}</Link>
              </li>
            ))}
          </ul>
          <h1 className="text-red font-xBold text-xLarge">Logo</h1>
        </header>
      </div>
    </div>
  );
};

export default NavBarProfile;
