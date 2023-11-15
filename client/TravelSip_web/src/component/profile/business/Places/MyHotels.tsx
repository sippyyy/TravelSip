import React from "react";
import { ReusableInfoDetails } from "../../..";
import { FaHotel } from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";
import { GiPodiumWinner } from "react-icons/gi";
import { HiDotsVertical } from "react-icons/hi";
import { Tooltip } from "@mui/material";

const MyHotels = () => {
  return (
    <div className="flex justify-between items-start">
      <Tooltip arrow title="View details">
        <div className="flex cursor-pointer flex-1">
          <img
            src="https://img.freepik.com/premium-photo/colorful-landscape-with-mountains-river-foreground_849761-2647.jpg"
            className="w-[100px] h-[100px] rounded-lg"
            alt="hotels"
          />
          <div className="ml-12">
            <ReusableInfoDetails
              icon={<FaHotel />}
              label="Hotel:"
              value={"Hotel Name"}
              bold
              size="text-medium"
            />
            <ReusableInfoDetails
              icon={<FaLocationPin />}
              label="Address:"
              value={"Adasdas"}
            />
            <ReusableInfoDetails
              icon={<GiPodiumWinner />}
              label="Rating:"
              value={"5/5 (1234 reviews)"}
            />
          </div>
        </div>
      </Tooltip>
      <Tooltip arrow title="Settings">
      <div className="p-12 text-xLarge cursor-pointer hover:text-green">
        <HiDotsVertical />
      </div>
      </Tooltip>
    </div>
  );
};

export default MyHotels;
