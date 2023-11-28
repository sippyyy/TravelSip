import React from "react";
import { Room, Rooms } from "../../../../interface/room.type";
import { MdOutlineEdit, MdDelete } from "react-icons/md";
import { BiBed } from "react-icons/bi";
import { Tooltip } from "@mui/material";
import { CiUser } from "react-icons/ci";
import { BsHouseAdd } from "react-icons/bs";
import { HiDotsVertical } from "react-icons/hi";
import { IoMdAdd } from "react-icons/io";

import {
  FormRoom,
  ReusableInfoDetails,
  ReusablePopOver,
  ReusablePopupMessage,
} from "../../..";
import { showDrawer } from "../../../reusable/ReusableDrawer";
import { closeModal, showModal } from "../../../reusable/ReusableModal";
import { useMutation } from "react-query";
import { deleteRoom } from "../../../../api/apis/room";
import { useAuth } from "../../../../context/AuthProvider";
import { useUpdateEffect } from "ahooks";

interface RoomListProps {
  rooms: Rooms;
  id: string | number;
}

const RoomList: React.FC<RoomListProps> = (props) => {
  const { rooms, id } = props;
  const { authState } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddRoom = async () => {
    setAnchorEl(null);
    showDrawer(<FormRoom hotelId={id} />, "right");
  };

  const { mutate, status } = useMutation({
    mutationFn: (id: number | string) => {
      const token = authState.accessToken;
      return deleteRoom(token, id);
    },
  });

  const handleClickOption = (
    e: React.MouseEvent<HTMLButtonElement>,
    option: "edit" | "delete" | "add",
    room: Room
  ) => {
    e.preventDefault();
    if (option === "edit") {
      showDrawer(
        <FormRoom hotelId={id} roomId={room.id} room={room} />,
        "right"
      );
    } else if (option === "delete") {
      showModal(
        "Do you sure?",
        <ReusablePopupMessage
          message={`You want to delete this room id #${room.id} ?`}
          redButton="Cancel"
          greenButton="Yes,please"
          greenFunc={() => {
            mutate(room.id);
          }}
        />
      );
    }
  };

  useUpdateEffect(() => {
    if (status === "success") {
      showModal(
        "Completed",
        <ReusablePopupMessage
          message="You've deleted room successfully"
          greenButton="Close"
          greenFunc={() => closeModal()}
        />
      );
    }
  },[status]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-large font-medium">Rooms:</h3>
        <Tooltip title="More" arrow>
          <button
            onClick={(e) => handleClick(e)}
            className="py-12 pl-12 text-large md:text-xLarge cursor-pointer hover:text-green"
          >
            <HiDotsVertical />
          </button>
        </Tooltip>
      </div>
      {rooms?.map((room) => (
        <div
          className="flex rounded-xl overflow-hidden my-12 shadow-3xl"
          key={room.id}
        >
          <img
            src={room.imageUrl}
            alt="room_hotel"
            className="mr-8 md:mr-12 w-[80px] h-[80px]"
          />
          <div className="p-8 flex-1">
            <div className="flex justify-between">
              <p className="text-medium font-medium flex-1">{room.name}</p>
              <div className="flex">
                <p className="text-small text-dark">${room.price}</p>
                <p className="text-xSmall text-gray">/per night</p>
              </div>
            </div>
            <ReusableInfoDetails
              icon={<BiBed />}
              label="Bed(s)"
              value={room.bed.toString()}
              size="text-small"
            />
            <ReusableInfoDetails
              icon={<CiUser />}
              label="Person(s)"
              value={room.person.toString()}
              size="text-small"
            />
          </div>
          <div className="p-4 flex flex-col">
            <Tooltip arrow title="Edit">
              <button
                onClick={(e) => handleClickOption(e, "edit", room)}
                className="text-large p-2 text-blue hover:text-lightBlue"
              >
                <MdOutlineEdit />
              </button>
            </Tooltip>
            <Tooltip arrow title="Add Facility">
              <button
                onClick={(e) => handleClickOption(e, "add", room)}
                className="text-large p-2 text-green hover:text-lightGreen"
              >
                <BsHouseAdd />
              </button>
            </Tooltip>
            <Tooltip arrow title="Delete">
              <button
                onClick={(e) => handleClickOption(e, "delete", room)}
                className="text-large p-2 text-red hover:text-lightRed"
              >
                <MdDelete />
              </button>
            </Tooltip>
          </div>
        </div>
      ))}
      <ReusablePopOver
        anchorEl={anchorEl}
        handleClose={handleClose}
        options={[
          {
            label: "Add Room",
            icon: <IoMdAdd />,
            clickFunc: () => {
              handleAddRoom();
            },
          },
        ]}
      />
    </div>
  );
};

export default RoomList;
