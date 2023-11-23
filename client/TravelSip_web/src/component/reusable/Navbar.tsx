import React from "react";
import { ReusableButton } from "..";
import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const nav_items = [
    { nav: "Home", link: "/" },
    { nav: "My Booking", link: "/bookings" },
    { nav: "Profile", link: "/profile" },
  ];
  const navigate = useNavigate();
  return (
    <div className="bg-red justify-center hidden md:flex">
      <div className="px-12 container py-16">
        <header className="flex justify-between items-center">
          <h1 className="text-white font-xBold text-xLarge">Logo</h1>
          <div className="flex">
            <ul className="flex items-center">
              {nav_items.map((item) => (
                <li className="ml-12 text-white font-bold" key={item.nav}>
                  <Link to={item.link}>{item.nav}</Link>
                </li>
              ))}
            </ul>
            <div className="ml-12">
              <ReusableButton
                onClick={() => {navigate('/login')}}
                textColor="text-white"
                bg="bg-green"
                width="w-32"
                btnText="Login"
              />
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Navbar;
