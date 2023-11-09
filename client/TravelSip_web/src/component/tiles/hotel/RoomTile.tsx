import { Divider } from "@mui/material";
import React from "react";
import { ReusableButton, ReusableInfoDetails, RoomDetails } from "../..";
import { showDrawer } from "../../reusable/ReusableDrawer";

interface Props {
  imageUrl: string;
  roomName: string;
  person: number;
  bed: number;
  facility: number;
  price: string;
  id: number;
}

const RoomTile: React.FC<Props> = (props) => {
  const { imageUrl, roomName, person, bed, facility, price, id } = props;

  const handleBookNow = () => {
    showDrawer(<RoomDetails />, "right");
  };
  return (
    <div className="flex bg-white p-12 rounded-xl mb-12">
      <img
        src={imageUrl}
        alt="rooms"
        className="rounded-xl w-[150px] h-auto object-cover"
      />
      <div className="ml-8 flex-1">
        <p className="font-medium text-medium mb-12">{roomName}</p>
        <Divider />
        <div className="mt-8">
          <p className="text-small">Room details:</p>
          <ReusableInfoDetails
            label="People number allowed:"
            value={`Under ${person} person(s)`}
          />
          <ReusableInfoDetails label="Bed(s):" value={`${bed}`} />{" "}
          <ReusableInfoDetails
            label="Facility:"
            value={`Under ${facility} person(s)`}
          />
          <div className="flex justify-between mt-16">
            <p className="text-dark text-large">Price</p>
            <div className="flex items-end">
              <p className="text-green text-large font-bold ml-8">${price}</p>
              <p className="text-gray text-xSmall">/per night</p>
            </div>
          </div>
        </div>
        <div className="text-right my-12">
          <ReusableButton
            btnText="Book Now!"
            bg="bg-green"
            textColor="text-white"
            onClick={() => {
              handleBookNow();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default RoomTile;
