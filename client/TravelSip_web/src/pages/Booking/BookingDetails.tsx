import React from "react";
import { booking } from "../../api/mock_api/booking.details";
import { get_color_status } from "../../utils/get_text_color";
import { FormReview, ReusableInfoDetails } from "../../component";
import { day_format } from "../../utils/get_day";
import { getIconForFacility } from "../../utils/get_icon_facility";

// eslint-disable-next-line react-refresh/only-export-components
export const get_message_status: (
  status: "rejected" | "approved" | "completed" | "expired" | "pending"
) => string = (
  status: "rejected" | "approved" | "completed" | "expired" | "pending"
) => {
  let text;
  switch (status) {
    case "rejected":
      text =
        "This booking is rejected by the owner for some reasons! Contact the owner for more details.";
      break;
    case "approved":
      text = "Congratulations! Booking is approved, have a nice trip!";
      break;
    case "completed":
      text =
        "Booking completed!, thank you for your support. Let's give us some review about your trip experience!";
      break;
    case "expired":
      text = "This booking request is expired!";
      break;
    default:
      text =
        "You are sending a booking request, please wait the response of hotel's owner";
      break;
  }
  return text;
};

const BookingDetails = () => {
  return (
    <div className="flex justify-center">
      <div
        className={`container p-20 rounded-2xl my-20 bg-white border-y-[20px] border-solid ${get_color_status(
          booking.status,
          "border"
        )}`}
      >
        <h3 className="text-center font-bold text-xLarge">
          Booking Details ID #{booking.id}
        </h3>
        <div className="my-16 px-12">
          <div className="flex my-16">
            <p className="text-large font-medium mr-12">Booking's status:</p>
            <p
              className={`${get_color_status(
                booking.status
              )} text-large font-bold`}
            >
              {booking?.status?.toUpperCase()}
            </p>
          </div>
          <div className="flex my-16">
            <p className="text-large font-medium mr-12">Booking Duration:</p>
            <p className={`text-large`}>{booking.booking_duration} night(s)</p>
          </div>
          <div className="flex p-12 border border-lightGrey border-solid rounded-2xl">
            <img src={booking.room.imageUrl} className="w-[180px] rounded-xl" />
            <div className="ml-20">
              <p className="text-medium font-medium my-12">
                {booking.room.name} - Room ID #{booking.room.id}
              </p>
              <p className="text-medium font-medium my-12">
                Room's Facility and Benefits:
              </p>
              <div className="mt-12">
                {booking.room.facilities &&
                  Object.entries(booking.room.facilities[0]).map(
                    ([key, value]) => {
                      if (key !== "id" && key !== "room" && value) {
                        const icon = getIconForFacility(key);
                        return (
                          <ReusableInfoDetails
                            icon={icon}
                            label={key}
                            key={key}
                          />
                        );
                      }
                      return null;
                    }
                  )}
              </div>
              <p className="text-medium font-medium my-12">
                Reservation day: {day_format(booking.check_in)} -{" "}
                {day_format(booking.check_out)}
              </p>
              <div className="flex items-start">
                <p className="text-medium font-medium mr-12">
                  Check-in and Check-out policy(must be noticed):
                </p>
                <ul>
                  <li className="text-medium font-medium mb-12">
                    Check-in : After 2:00 PM
                  </li>
                  <li className="text-medium font-medium">
                    Check-out : Before 11:00 AM
                  </li>
                </ul>
              </div>
              <p className="text-medium font-medium my-12">
                {get_message_status(booking.status)}
              </p>
            </div>
          </div>
          <div className="flex my-16">
            <p className="text-large font-medium mr-12">
              Total Price for {booking.booking_duration} night(s):
            </p>
            <p className={`text-large`}>
              ${+booking.room.price * booking.booking_duration}
            </p>
          </div>
          {booking.status === "completed" ? (
            <FormReview id={booking.id} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
