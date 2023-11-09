import React from "react";
import { FormBooking, ReusableInfoDetails } from "..";
import { BsSnow, BsWifi } from "react-icons/bs";
import {
  MdBalcony,
  MdBathtub,
  MdOutlineLocalLaundryService,
  MdDryCleaning,
} from "react-icons/md";
import { GiWindow, GiMeal } from "react-icons/gi";
import { BiLandscape } from "react-icons/bi";
import { room_details } from "../../api/mock_api/room.details";

type FacilityIcons = {
  [key: string]: JSX.Element | null;
};

function getIconForFacility(facilityKey: string): JSX.Element | null {
  const icons: FacilityIcons = {
    air_conditioner: <BsSnow />,
    wifi: <BsWifi />,
    balcony: <MdBalcony />,
    window: <GiWindow />,
    private_bathroom: <MdBathtub />,
    breakfast: <GiMeal />,
    view: <BiLandscape />,
    laundry: <MdOutlineLocalLaundryService />,
    cleaning_room: <MdDryCleaning />,
  };

  return icons[facilityKey] || null;
}

const RoomDetails: React.FC = () => {
  const { id, facilities, name, person, bed, price, imageUrl } = room_details;
  return (
    <div className="w-[450px]">
      <div className="p-12">
        <p className="text-xLarge text-green font-bold text-center mb-12">
          Booking Room : {name}
        </p>
        <img
          className="rounded-xl h-[250px] w-full object-cover"
          src={imageUrl}
        />
        <div className="border border-green border-solid my-12 p-12 rounded-xl">
          <p className="font-bold">Facility and Benefits included:</p>
          <div className="mt-12">
            {facilities &&
              Object.entries(facilities[0]).map(([key, value]) => {
                if (key !== "id" && key !== "room" && value) {
                  const icon = getIconForFacility(key);
                  return (
                    <ReusableInfoDetails icon={icon} label={key} key={key} />
                  );
                }
                return null;
              })}
          </div>
        </div>
        <FormBooking data={{ id, person, price, bed }} />
      </div>
    </div>
  );
};

export default RoomDetails;
