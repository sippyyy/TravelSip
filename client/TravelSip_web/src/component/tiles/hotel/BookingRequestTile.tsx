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
        <div className="my-4">
          <div className="flex items-center">
            <p className="mr-12 text-small md:text-medium">
              {index ? index + 1 : 0 + 1}
            </p>
            <img
              className="w-[50px] h-[50px] md:w-[80px] md:h-[80px] rounded-lg"
              src={hotel?.imageUrl ?? ""}
            />
            <div className="flex flex-1 md:flex-0 ml-12 flex-col md:flex-row justify-between">
              <div className="h-full">
                <p className="font-bold text-small md:text-medium mb-8">
                  {hotel?.title ?? ""} - Room : {room?.name ?? ""}
                </p>
                <ReusableInfoDetails
                  size="text-xSmall md:text-small"
                  label="Check-in date:"
                  value={day_format(check_in)}
                />
                <ReusableInfoDetails
                  size="text-xSmall md:text-small"
                  label="Check-out date:"
                  value={day_format(check_out)}
                />
              </div>
              <p
                className={`font-bold text-xSmall my-4 md:text-medium ${get_color_status(
                  status,
                  "text"
                )}`}
              >
                {status.toUpperCase()}
              </p>
              <div className="md:flex md:flex-col justify-between md:items-end">
                <p className="mx-20 text-medium md:text-large text-right font-bold">
                  ${+room?.price ?? 0 * booking_duration}
                </p>
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
          </div>
        </div>
      </Tooltip>
    </Link>
  );
};

export default BookingRequestTile;
