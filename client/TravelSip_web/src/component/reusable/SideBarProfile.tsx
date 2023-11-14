import { Divider } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { ReusableInfoDetails } from "..";
import { FaUser } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { MdOutlinePayment } from "react-icons/md";
import { IoMdBusiness } from "react-icons/io";
import { RiLogoutBoxLine } from "react-icons/ri";

const SideBarProfile = () => {
  return (
    <div className="bg-red">
      <div className="relative w-full">
        <img
          className="w-full"
          src={
            "data:image/jpeg;base64,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"
          }
        />
        <div className="flex items-end absolute bottom-[-25%] left-0 ">
          <img
            className="w-[100px] h-[100px] rounded-full border-4 border-solid border-red z-[1]"
            src="https://img.freepik.com/premium-photo/colorful-landscape-with-mountains-river-foreground_849761-2647.jpg"
          />
          <div className="bg-red px-16 rounded-r-xl py-8 ml-[-5%]">
            <h2 className="text-medium font-bold text-white ">{"User Name"}</h2>
            <p className="text-lightWhite text-small my-4">({"nickname"})</p>
            <p className="text-lightWhite text-small my-4">
              {"user@gmail.com"}
            </p>
          </div>
        </div>
      </div>
      <div className="h-[60px]"></div>
      <Divider />
      <div className="mt-12  p-12">
        <p className="text-white mb-8 font-bold">Bio:</p>
        <p className=" bg-lightRed rounded-2xl p-12">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,
          aut! Maiores dolorum sint eveniet doloremque pariatur dolorem cum?
          Modi cumque est ab rerum. Explicabo temporibus quibusdam suscipit
          repellendus quod amet.
        </p>
      </div>
      <div className="h-[20px]"></div>
      <Divider />
      <div className="p-12">
        <Link to="/" className="pb-12 block">
          <ReusableInfoDetails
            size="text-medium"
            icon={<FaUser />}
            label="Edit Information"
            textColor="text-white"
            bold={true}
          />
        </Link>
        <Link to="/" className="pb-12 block">
          <ReusableInfoDetails
            size="text-medium"
            icon={<IoSettings />}
            label="Settings"
            textColor="text-white"
            bold={true}
          />
        </Link>
        <Link to="/" className="pb-12 block">
          <ReusableInfoDetails
            size="text-medium"
            icon={<MdOutlinePayment />}
            label="Terms of Payment"
            textColor="text-white"
            bold={true}
          />
        </Link>
        <Link to="/" className="pb-12 block">
          <ReusableInfoDetails
            size="text-medium"
            icon={<IoMdBusiness />}
            label="My Business"
            textColor="text-white"
            bold={true}
          />
        </Link>
        <Link to="/" className="pb-12 block">
          <ReusableInfoDetails
            size="text-medium"
            icon={<RiLogoutBoxLine />}
            label="Log out"
            textColor="text-white"
            bold={true}
          />
        </Link>
      </div>
    </div>
  );
};

export default SideBarProfile;
