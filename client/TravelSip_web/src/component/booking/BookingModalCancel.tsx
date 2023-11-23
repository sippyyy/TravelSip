import React, { useEffect } from "react";
import { BsCalendar2DateFill } from "react-icons/bs";
import { FaRegMoneyBillAlt, FaHotel } from "react-icons/fa";
import { closeModal, showModal } from "../reusable/ReusableModal";
import { ReusableButton, ReusableInfoDetails, ReusablePopupMessage } from "..";
import { day_format } from "../../utils/get_day";
import { useMutation } from "react-query";
import { useAuth } from "../../context/AuthProvider";
import { deleteBooking } from "../../api/apis/booking";

interface BookingModelCancelProps {
  id: number;
  title: string;
  check_in: string;
  check_out: string;
  price: string;
  booking_duration: number;
}

const BookingModalCancel: React.FC<BookingModelCancelProps> = (props) => {
  const { id, title, check_in, check_out, price, booking_duration } = props;
  const { authState } = useAuth();

  const { mutate, status, data } = useMutation({
    mutationFn: () => {
      const token = authState.accessToken;
      return deleteBooking(token, id);
    },
  });
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    option: "yes" | "no"
  ) => {
    event.preventDefault();
    if (option === "no") {
      closeModal();
    } else {
      mutate();
    }
  };

  useEffect(() => {
    if (status === "success") {
      closeModal();
      if (data?.data?.message) {
        showModal(
          "Completed",
          <ReusablePopupMessage
            success
            message={data?.data?.message}
            greenButton="Close"
            greenFunc={() => closeModal()}
          />
        );
      }
    }
  }, [data, status]);

  return (
    <div>
      <p className="text-medium mb-20">
        You really want to cancel this booking below ?
      </p>
      <ReusableInfoDetails icon={<FaHotel />} label={title} bold={true} />
      <ReusableInfoDetails
        icon={<BsCalendar2DateFill />}
        label="Booking dates:"
        value={`${day_format(check_in)} - ${day_format(check_out)}`}
      />
      <ReusableInfoDetails
        icon={<FaRegMoneyBillAlt />}
        label="Price:"
        value={`$${+price * booking_duration}`}
      />
      <div className="flex mt-16">
        <ReusableButton
          btnText="Cancel"
          bg="bg-red"
          textColor="text-white"
          flex1={true}
          onClick={(e) => {
            handleClick(e, "no");
          }}
        />
        <div className="bg-white w-[12px] h-full"></div>
        <ReusableButton
          btnText="Yes, please!"
          bg="bg-green"
          textColor="text-white"
          onClick={(e) => {
            handleClick(e, "yes");
          }}
          flex1={true}
        />
      </div>
    </div>
  );
};

export default BookingModalCancel;
