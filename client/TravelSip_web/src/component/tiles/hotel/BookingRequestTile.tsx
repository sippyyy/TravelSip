import React from "react";
import { ReusableButton, ReusableInfoDetails } from "../..";
import { BookingTileProps } from "../../../interface/BookingsType";
import { day_format } from "../../../utils/get_day";
import { get_color_status } from "../../../utils/get_text_color";
import { Link } from "react-router-dom";
import { Tooltip } from "@mui/material";
const BookingRequestTile: React.FC<BookingTileProps> = (props) => {
  const {
    index,
    id,
    hotel,
    room,
    check_in,
    check_out,
    booking_duration,
    status,
  } = props;

  return (
    <Link to={`/booking/${id}`}>
      <Tooltip arrow title="View Details">
        <div className="p-12 flex justify-between">
          <div className="flex items-center">
            <p className="mr-12 text-medium">{index ? index + 1 : 0 + 1}</p>
            <img
              className="w-[80px] h-[80px] rounded-lg"
              src={hotel?.imageUrl ?? ""}
            />
            <div className="ml-12 h-full">
              <p className="font-bold text-medium mb-8">{hotel?.title ?? ""}</p>
              <ReusableInfoDetails
                label="Check-in date:"
                value={day_format(check_in)}
              />
              <ReusableInfoDetails
                label="Check-out date:"
                value={day_format(check_out)}
              />
            </div>
          </div>
          <p className={`font-bold ${get_color_status(status, "text")}`}>
            {status.toUpperCase()}
          </p>
          <div className="flex flex-col justify-between items-end">
            <div className="flex">
              <p>{room?.name ?? ""}</p>
              <p className="mx-20 text-large font-bold">
                ${+room?.price ?? 0 * booking_duration}
              </p>
            </div>
            {status === "pending" ? (
              <div className="flex">
                <ReusableButton
                  width="w-[100px]"
                  btnText="Reject"
                  bg="bg-red"
                  textColor="text-white"
                  onClick={() => {}}
                />
                <div className="w-[8px]"></div>
                <ReusableButton
                  width="w-[100px]"
                  btnText="Approve"
                  bg="bg-green"
                  textColor="text-white"
                  onClick={() => {}}
                />
              </div>
            ) : null}
          </div>
        </div>
      </Tooltip>
    </Link>
  );
};

export default BookingRequestTile;
