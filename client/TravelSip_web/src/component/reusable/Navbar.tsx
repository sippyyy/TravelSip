import React from "react";
import { ReusableButton } from "..";

const Navbar: React.FC = () => {
  const nav_items = [
    { nav: "Home", link: "/" },
    { nav: "My Booking", link: "/" },
    { nav: "Profile", link: "/" },
  ];
  return (
    <div className="px-8 bg-red py-16">
      <header className="flex justify-between items-center">
        <h1 className="text-white font-xBold text-xLarge">Logo</h1>
        <div className="flex">
          <ul className="flex items-center">
            {nav_items.map((item) => (
              <li className="ml-12 text-white font-bold" key={item.nav}>
                {item.nav}
              </li>
            ))}
          </ul>
          <div className="ml-12">
            <ReusableButton
              textColor="text-white"
              bg="bg-green"
              width="w-32"
              btnText="Login"
            />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
