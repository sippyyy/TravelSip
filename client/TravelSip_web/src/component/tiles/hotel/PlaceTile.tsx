import { Tooltip } from "@mui/material";
import React from "react";
import {
  FormPlace,
  ReusableInfoDetails,
  ReusablePopOver,
  ReusablePopupMessage,
} from "../..";
import { FaHotel } from "react-icons/fa";
import { MdOutlineCastle } from "react-icons/md";
import { FaLocationPin } from "react-icons/fa6";
import { GiPodiumWinner } from "react-icons/gi";
import { HiDotsVertical } from "react-icons/hi";
import { MdDelete, MdEdit } from "react-icons/md";
import { showDrawer } from "../../reusable/ReusableDrawer";
import { showModal } from "../../reusable/ReusableModal";
import { Link } from "react-router-dom";
import { Destination } from "../../../interface/destination.type.js";

interface PlaceTileProps {
  type: "hotel" | "destination";
  dataIn: Destination;
  link: string;
}

const PlaceTile: React.FC<PlaceTileProps> = (props) => {
  const { type, dataIn, link } = props;
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
    setAnchorEl(null);
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
    showDrawer(<FormPlace type={type} id={dataIn?.id??""} />, "right");
    setAnchorEl(null);
  };

  return (
    <div className="flex justify-between items-start my-12">
      <Tooltip arrow title="View details flex">
        <Link to={link ? link : ""} className="flex-1">
          <div className="flex cursor-pointer flex-1">
            <img
              src={dataIn?.imageUrl ?? ""}
              className="object-cover w-[100px] h-[100px] rounded-lg"
              alt="places"
            />
            <div className="ml-12">
              <ReusableInfoDetails
                icon={
                  type === "destination" ? <MdOutlineCastle /> : <FaHotel />
                }
                label={type === "destination" ? "Destination:" : "Hotel:"}
                value={dataIn?.title ?? ""}
                bold
                size="text-small md:text-medium"
              />
              <ReusableInfoDetails
                icon={<FaLocationPin />}
                label="Address:"
                value={`${dataIn?.location ?? ""}, ${dataIn?.city?.name ?? ""}`}
                size="text-xSmall md:text-small"
              />
              <ReusableInfoDetails
                icon={<GiPodiumWinner />}
                label="Rating:"
                value={`${dataIn?.rating?.toFixed(1)}/5 (${
                  dataIn?.reviews ?? ""
                } reviews)`}
                size="text-xSmall md:text-small"
              />
            </div>
          </div>
        </Link>
      </Tooltip>
      <Tooltip arrow title="Settings">
        <button
          onClick={(e) => handleClick(e)}
          className="p-12 text-large md:text-xLarge cursor-pointer hover:text-green"
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
