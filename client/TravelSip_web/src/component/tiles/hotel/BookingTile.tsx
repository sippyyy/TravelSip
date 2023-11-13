import React, { useMemo } from "react";
import { IoMdRemoveCircleOutline } from "react-icons/io";

import { ReusableInfoDetails } from "../..";
import Tooltip from "@mui/material/Tooltip";
import { showModal } from "../../reusable/ReusableModal";
import dayjs from "dayjs";
import { BookingModalCancel } from "../../../pages";

const Options = () => {
  return (
    <ul className="w-full">
      <li className="px-20 py-12 hover:bg-blue">
        <ReusableInfoDetails label="Test" />
      </li>
      <li className="px-20 py-12">
        <ReusableInfoDetails label="Test" />
      </li>
    </ul>
  );
};

interface BookingTileProps {
  id: number;
  hotel: {
    title: string;
    imageUrl: string;
    location: string;
  };
  room: {
    price: string;
  };
  check_in: string;
  check_out: string;
  booking_duration: number;
}

const day_format: (day: string) => string = (day: string) => {
  return dayjs(day).format("MMM D, YYYY");
};

const BookingTile: React.FC<BookingTileProps> = (props) => {
  const { id, hotel, room, check_in, check_out, booking_duration } = props;
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    showModal("Are you sure?", <BookingModalCancel />);
  };

  return (
    <div className="shadow-3xl hover:shadow-4xl rounded-xl w-full p-20 flex pointer transition ease-in-out delay-100 duration-300 hover:-translate-y-1 hover:scale-[102%]">
      <div className="flex flex-1 items-center">
        <img
          src="https://bstatic.com/xdata/images/hotel/300x300/372471031.jpg?k=0e7f801808c78ea3840ab86dfa6da4b5b4d2827584eea45acf2ffc4a9649b197&o="
          className="w-[80px] h-[80] rounded-xl"
        />
        <div className="ml-12">
          <p className="text-medium font-medium mb-12">{hotel?.title ?? ""}</p>
          <p className="text-small-text-gray mb-12">
            {day_format(check_in)} - {day_format(check_out)}
          </p>
          <p>status</p>
        </div>
      </div>
      <div className="flex justify-end items-start">
        <p className="text-xLarge font-bold mr-12">
          ${+room?.price ?? 0 * booking_duration}
        </p>
        <Tooltip title="Cancel Booking" arrow>
          <p>
            <IoMdRemoveCircleOutline
              className="text-xLarge text-red"
              onClick={handleClick}
            />
          </p>
        </Tooltip>
      </div>
    </div>
  );
};

export default BookingTile;
