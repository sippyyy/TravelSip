import React from "react";
import { BsCalendar2DateFill } from "react-icons/bs";
import { FaRegMoneyBillAlt, FaHotel } from "react-icons/fa";
import { closeModal } from "../../component/reusable/ReusableModal";
import { ReusableButton, ReusableInfoDetails } from "../../component";

interface BookingModelCancelProps {
  id: number;
  name: string;
  checkin: string;
  checkout: string;
  price: number;
}

const BookingModalCancel = () => {
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    option: "yes" | "no"
  ) => {
    event.preventDefault();
    if (option === "no") {
      closeModal();
    } else {
      console.log("Yes");
    }
  };

  return (
    <div>
      <p className="text-medium mb-20">
        You really want to cancel this booking below ?
      </p>
      <ReusableInfoDetails
        icon={<FaHotel />}
        label={"Hotel Name"}
        bold={true}
      />
      <ReusableInfoDetails
        icon={<BsCalendar2DateFill />}
        label="Booking dates:"
        value={"Sep 28 - Oct 1"}
      />
      <ReusableInfoDetails
        icon={<FaRegMoneyBillAlt />}
        label="Price:"
        value={"$300,00"}
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
