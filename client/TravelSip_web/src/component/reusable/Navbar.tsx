import React from "react";
import { ReusableButton } from "..";
import { Link, useNavigate } from "react-router-dom";
import { useProfile } from "../../context/ProfileProvider";

const Navbar: React.FC = () => {
  const nav_items = [
    { nav: "Home", link: "/" },
    { nav: "My Booking", link: "/bookings" },
    { nav: "Profile", link: "/profile" },
  ];
  const navigate = useNavigate();
  const { profile } = useProfile();
  return (
    <div className="bg-red justify-center hidden md:flex">
      <div className="px-12 container py-16">
        <header className="flex justify-between items-center">
          <Link to="/" className="text-white font-xBold text-xLarge">Logo</Link>
          <div className="flex">
            <ul className="flex items-center">
              {nav_items.map((item) => (
                <li className="ml-12 text-white font-bold" key={item.nav}>
                  <Link to={item.link}>{item.nav}</Link>
                </li>
              ))}
            </ul>
            <div className="ml-12">
              {profile?.imageUrl ? (
                <Link to={`profile/`}>
                  <div className="flex items-center rounded-3xl py-4 px-16 bg-lightRed">
                    <img
                      src={profile?.imageUrl?.toString() ?? ""}
                      alt=""
                      className="rounded-full w-[40px] h-[40px] mr-8 border-2 border-red border-solid object-cover "
                    />
                    <h3 className="text-white font-bold text-medium">
                      {profile?.user?.username ?? ""}
                    </h3>
                  </div>
                </Link>
              ) : (
                <ReusableButton
                  onClick={() => {
                    navigate("/login");
                  }}
                  textColor="text-white"
                  bg="bg-green"
                  width="w-32"
                  btnText="Login"
                />
              )}
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Navbar;
