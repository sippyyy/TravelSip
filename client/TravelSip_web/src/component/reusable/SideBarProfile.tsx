import { Divider } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReusableInfoDetails, ReusablePopupMessage } from "..";
import { FaUser } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { MdOutlinePayment } from "react-icons/md";
import { IoMdBusiness } from "react-icons/io";
import { RiLogoutBoxLine } from "react-icons/ri";
import { closeModal, showModal } from "./ReusableModal";
import { closeDrawer } from "./ReusableDrawer";
import { useProfile } from "../../context/ProfileProvider";

const SideBarProfile:React.FC = () => {
  const navigate = useNavigate();
  const { profile } = useProfile();

  const logOut = () => {
    closeModal();
    navigate("/login");
  };

  const handleLogOut = () => {
    showModal(
      "Are you sure?",
      <ReusablePopupMessage
        message="You are going to sign out this account?"
        redButton="Cancel"
        greenButton="Log out"
        greenFunc={() => logOut()}
      />
    );
  };

  return (
    <div className="h-full bg-red w-[250px] md:w-full">
      <div className="relative md:w-full ">
        <img
          className="w-full h-[200px] object-cover"
          src={profile?.backgroundUrl?.toString()??""}
        />
        <div className="flex items-end absolute bottom-[-25%] left-0 ">
          <img
            className="w-[100px] h-[100px] rounded-full border-4 border-solid border-red z-[1]"
            src={profile?.imageUrl?.toString()??""}
          />
          <div className="bg-red px-16 rounded-r-xl py-8 ml-[-5%]">
            <h2 className="text-medium font-bold text-white ">{profile?.user?.username??""}</h2>
            <p className="text-lightWhite text-small my-4">({profile?.nickname??""})</p>
            <p className="text-lightWhite text-small my-4">
              {profile?.user?.email??""}
            </p>
          </div>
        </div>
      </div>
      <div className="h-[60px]"></div>
      <Divider />
      <div className="mt-12  p-12 w-full">
        <p className="text-white mb-8 font-bold">Bio:</p>
        <p className="text-xSmall md:text-medium bg-lightRed rounded-2xl p-12">
          {profile?.bio??""}
        </p>
      </div>
      <div className="h-[20px]"></div>
      <Divider />
      <div className="p-12">
        <Link
          onClick={() => closeDrawer()}
          to="/profile"
          className="pb-12 block"
        >
          <ReusableInfoDetails
            size="text-small md:text-medium"
            icon={<FaUser />}
            label="Edit Information"
            textColor="text-white"
            bold={true}
          />
        </Link>
        <Link
          onClick={() => closeDrawer()}
          to="/settings"
          className="pb-12 block"
        >
          <ReusableInfoDetails
            size="text-small md:text-medium"
            icon={<IoSettings />}
            label="Settings"
            textColor="text-white"
            bold={true}
          />
        </Link>
        <Link onClick={() => closeDrawer()} to="/terms" className="pb-12 block">
          <ReusableInfoDetails
            size="text-small md:text-medium"
            icon={<MdOutlinePayment />}
            label="Terms of Payment"
            textColor="text-white"
            bold={true}
          />
        </Link>
        <Link
          onClick={() => closeDrawer()}
          to="/my_business"
          className="pb-12 block"
        >
          <ReusableInfoDetails
            size="text-small md:text-medium"
            icon={<IoMdBusiness />}
            label="My Business"
            textColor="text-white"
            bold={true}
          />
        </Link>
        <div
          className="pb-12 cursor-pointer"
          onClick={() => {
            closeDrawer();
            handleLogOut();
          }}
        >
          <ReusableInfoDetails
            size="text-small md:text-medium"
            icon={<RiLogoutBoxLine />}
            label="Log out"
            textColor="text-white"
            bold={true}
          />
        </div>
      </div>
    </div>
  );
};

export default SideBarProfile;
