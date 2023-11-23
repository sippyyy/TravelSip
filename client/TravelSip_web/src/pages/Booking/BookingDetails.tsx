import React from "react";

import { get_color_status } from "../../utils/get_text_color";
import { FormReview, ReusableInfoDetails } from "../../component";
import { day_format } from "../../utils/get_day";
import { getIconForFacility } from "../../utils/get_icon_facility";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getBookingDetails } from "../../api/apis/booking";
import { useAuth } from "../../context/AuthProvider";

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

const BookingDetails: React.FC = () => {
  const params = useParams()
  const {authState} = useAuth()

  const {data} = useQuery({
    queryKey:[`booking ${params.id}`],
    queryFn:()=>{
      const token =authState.accessToken
      return getBookingDetails(token,params?.id??0)
    },
    staleTime: 2 * 1000,
    cacheTime: 10 * 1000,
    keepPreviousData: true,
  })
  return (
    <div className="flex justify-center">
      <div
        className={`container md:p-20 p-12 rounded-2xl my-20 bg-white border-y-[20px] border-solid ${get_color_status(
          data?.data?.status,
          "border"
        )}`}
      >
        <h3 className="text-center font-bold text-large md:text-xLarge">
          Booking Details ID #{data?.data?.id}
        </h3>
        <div className="my-16 md:px-12 md:text-large text-medium">
          <div className="flex my-16">
            <p className=" font-medium mr-12">Booking's status:</p>
            <p className={`${get_color_status(data?.data?.status)}  font-bold`}>
              {data?.data?.status?.toUpperCase()}
            </p>
          </div>
          <div className="flex my-16 md:text-large text-medium">
            <p className=" font-medium mr-12">Booking Duration:</p>
            <p className={``}>{data?.data?.booking_duration} night(s)</p>
          </div>
          <div className="md:flex p-12 border border-lightGrey border-solid rounded-2xl">
            <img
              src={data?.data?.room.imageUrl}
              className="w-full md:w-[180px] h-[180px] rounded-xl object-cover"
            />
            <div className="ml-20 flex-1 text-xSmall md:text-small">
              <p className="text-small md:text-medium font-medium my-12">
                {data?.data?.room.name} - Room ID #{data?.data?.room.id}
              </p>
              <p className="text-small md:text-medium font-medium my-12">
                Room's Facility and Benefits:
              </p>
              <div className="mt-12">
                {data?.data?.room?.facilities?.length > 0 &&
                  Object.entries(data?.data?.room?.facilities?.[0])?.map(
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
              <p className="text-small md:text-medium font-medium my-12">
                Reservation day: {day_format(data?.data?.check_in)} -{" "}
                {day_format(data?.data?.check_out)}
              </p>
              <div className="flex items-start">
                <p className="text-xSmall md:text-medium font-medium mr-12">
                  Check-in and Check-out policy(must be noticed):
                </p>
                <ul >
                  <li className="text-xSmall md:text-medium font-medium mb-12">
                    Check-in : After 2:00 PM
                  </li>
                  <li className="text-xSmall md:text-medium font-medium">
                    Check-out : Before 11:00 AM
                  </li>
                </ul>
              </div>
              <p className="text-xSmall md:text-medium font-medium my-12">
                {get_message_status(data?.data?.status)}
              </p>
            </div>
          </div>
          <div className="flex my-16">
            <p className=" text-medium md:text-large font-medium mr-12">
              Total Price for {data?.data?.booking_duration} night(s):
            </p>
            <p className="text-medium md:text-large text-red font-bold">
              ${+data?.data?.room.price * data?.data?.booking_duration}
            </p>
          </div>
          {data?.data?.status === "completed" ? (
            <FormReview id={data?.data?.id} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
