import { Tooltip } from "@mui/material";
import React from "react";
import {
  FormPlace,
  ReusableInfoDetails,
  ReusablePopOver,
  ReusablePopupMessage,
} from "../..";
import { FaHotel } from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";
import { GiPodiumWinner } from "react-icons/gi";
import { HiDotsVertical } from "react-icons/hi";
import { MdDelete, MdEdit } from "react-icons/md";
import { showDrawer } from "../../reusable/ReusableDrawer";
import { showModal } from "../../reusable/ReusableModal";

const PlaceTile = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    console.log("delete");
  };

  const handleDeletePopOver = () => {
    showModal(
      "Are you sure?",
      <ReusablePopupMessage
        message="You want to delete this business ?"
        redButton="Cancel"
        greenButton="Delete"
        greenFunc={handleDelete}
      />
    );
  };

  const handleEdit = () => {
    showDrawer(<FormPlace />, "right");
  };

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
        <button
          onClick={(e) => handleClick(e)}
          className="p-12 text-xLarge cursor-pointer hover:text-green"
        >
          <HiDotsVertical />
        </button>
      </Tooltip>
      <ReusablePopOver
        anchorEl={anchorEl}
        handleClose={handleClose}
        options={[
          {
            label: "Delete",
            icon: <MdDelete />,
            clickFunc: () => {
              handleDeletePopOver();
            },
          },
          {
            label: "Edit",
            icon: <MdEdit />,
            clickFunc: () => {
              handleEdit();
            },
          },
        ]}
      />
    </div>
  );
};

export default PlaceTile;
