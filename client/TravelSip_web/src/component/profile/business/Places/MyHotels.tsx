import React from "react";
import { PlaceTile, ReusableButton, ReusableInfoDetails, ReusablePopOver } from "../../..";
import { FaHotel } from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";
import { GiPodiumWinner } from "react-icons/gi";
import { HiDotsVertical } from "react-icons/hi";
import { Tooltip } from "@mui/material";
import { MdDelete, MdEdit } from "react-icons/md";
import { closeModal, showModal } from "../../../reusable/ReusableModal";
import { showDrawer } from "../../../reusable/ReusableDrawer";


const MyHotels = () => {
  return(
    <div>
      <PlaceTile />
    </div>
  )
};

export default MyHotels;
