import React from "react";
import { IoMdRemoveCircleOutline } from "react-icons/io";

// import { ReusableInfoDetails } from "../..";
import Tooltip from "@mui/material/Tooltip";
import { showModal } from "../../reusable/ReusableModal";
import { day_format } from "../../../utils/get_day";
import { BookingModalCancel } from "../..";
import { Link } from "react-router-dom";
import { get_color_status } from "../../../utils/get_text_color";
import { BookingTileProps } from "../../../interface/BookingsType";

const BookingTile: React.FC<BookingTileProps> = (props) => {
  const { id, hotel, room, check_in, check_out, booking_duration, status } =
    props;
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    showModal(
      "Are you sure?",
      <BookingModalCancel
        id={id}
        title={hotel.title}
        price={room.price}
        booking_duration={booking_duration}
        check_in={check_in}
        check_out={check_out}
      />
    );
  };

  return (
    <div className="shadow-3xl my-20 hover:shadow-4xl rounded-xl w-full p-12 md:p-20 flex pointer transition ease-in-out delay-100 duration-300 hover:-translate-y-1 hover:scale-[102%]">
      <Link to={`/booking/${id}`} className="block w-full">
        <div className="flex flex-1 items-center cursor-pointer">
          <img
            src={hotel?.imageUrl ?? ""}
            className="w-[60px] h-[60px] md:w-[70px] md:h-[70px] rounded-xl"
          />
          <div className="ml-12">
            <p className="text-small md:text-medium font-medium mb-12">
              {hotel?.title ?? ""}
            </p>
            <p className="text-xSmall md:text-small text-gray mb-12">
              {day_format(check_in)} - {day_format(check_out)}
            </p>
            <p className={`${get_color_status(status)} font-bold text-small md:text-medium`}>
              {status.toUpperCase()}
            </p>
          </div>
        </div>
      </Link>
      <div className="flex justify-end items-start">
        <p className="text-large md:text-xLarge font-bold mr-12">
          ${+room.price * booking_duration}
        </p>
        {status === "pending" ? (
          <Tooltip title="Cancel Booking" arrow>
            <p>
              <IoMdRemoveCircleOutline
                className="text-xLarge text-red"
                onClick={handleClick}
              />
            </p>
          </Tooltip>
        ) : null}
      </div>
    </div>
  );
};

export default BookingTile;
