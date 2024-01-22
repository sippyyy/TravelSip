import { Form, useFormikContext } from "formik";
import React, { useMemo } from "react";
import { ReusableButton, ReusableCalendar, ReusableInfoDetails, ReusableLoadingModal } from "../..";
import { useSafeState, useUpdateEffect } from "ahooks";
import { now, tomorrow } from "../../../constant/time";
import { BiSolidUser, BiSolidBed } from "react-icons/bi";
import { AiOutlineClockCircle } from "react-icons/ai";
import dayjs from "dayjs";
import { Divider } from "@mui/material";
import { closeDrawer } from "../../reusable/ReusableDrawer";
import { useMutation } from "react-query";
import { bookRoom } from "../../../api/apis/booking";
import { useAuth } from "../../../context/AuthProvider";
import { BookingRoomForm } from "../../../interface/BookingsType";
import { day_be_format } from "../../../utils/get_day";
import { closeModal, showModal } from "../../reusable/ReusableModal";

interface ValuesProps {
  check_in: string;
  check_out: string;
  room: number;
}

interface FormProps {
  dataIn: {
    bed: number;
    person: number;
    price: string;
  };
}

const FormBookingContent: React.FC<FormProps> = (props) => {
  const { dataIn } = props;
  const { bed, person, price } = dataIn;
  const { authState } = useAuth();
  const { values, setFieldValue } = useFormikContext<ValuesProps>();
  const [checkin, setCheckin] = useSafeState<string>(now);
  const [checkout, setCheckout] = useSafeState<string>(tomorrow);

  useUpdateEffect(() => {
    if (values.check_in !== checkin) {
      setFieldValue("check_in", checkin);
    }
    if (values.check_out !== checkout) {
      setFieldValue("check_out", checkout);
    }
  }, [checkin, checkout]);

  const { mutate,status } = useMutation({
    mutationFn: async (data: BookingRoomForm) => {
      const token = authState.accessToken;
      return await bookRoom(token, data);
    },
  });

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const checkin = day_be_format(values.check_in);
    const checkout = day_be_format(values.check_out);
    const valuesSubmit = {
      check_in: checkin,
      check_out: checkout,
      room: values.room,
    };
    mutate(valuesSubmit);
  };

  useUpdateEffect(() => {
    if(status === "success"){
      closeDrawer()
      showModal("Booking room successfully!",undefined,`You just request to book room id #${values.room} from ${values.check_in} to ${values.check_out}. Please wait for the hotel's owner to accept your booking request. See more about the booking details/process at Booking Tab`)
    } else if (status === "loading") {
        showModal("Loading data...", <ReusableLoadingModal />);
      } else {
        closeModal();
      }
  }, [status]);

  const duration = useMemo(() => {
    const start = dayjs(checkin);
    const end = dayjs(checkout);

    const daysDifference = end.diff(start, "day");

    return daysDifference;
  }, [checkin, checkout]);

  return (
    <Form>
      <div className="flex">
        <div className="flex items-center mr-12">
          <p className="mr-8 text-small">Check in:</p>
          <ReusableCalendar
            flex1
            day={checkin}
            setDay={setCheckin}
            defaultValue={now}
          />
        </div>
        <div className="flex items-center">
          <p className="mr- text-small">Check out:</p>
          <ReusableCalendar
            flex1
            day={checkout}
            setDay={setCheckout}
            defaultValue={tomorrow}
          />
        </div>
      </div>
      <div className="mt-12">
        <div className="my-20">
          <ReusableInfoDetails
            icon={<BiSolidUser />}
            label="Person number allowed:"
            value={`under ${person} persons`}
          />
          <ReusableInfoDetails
            icon={<BiSolidBed />}
            label="Bed(s):"
            value={`${bed}`}
          />
          <ReusableInfoDetails
            icon={<AiOutlineClockCircle />}
            label="Booking duration:"
            value={`${duration} night(s)`}
          />
        </div>
        <Divider />
        <div className="flex justify-between items-center mt-20">
          <p className="text-large">Total Price:</p>
          <div className="flex items-end">
            <p className="text-xLarge text-green font-bold">
              ${+price * duration}
            </p>
            <p className="text-gray text-xSmall">(for {duration} night(s))</p>
          </div>
        </div>
        <div className="absolute bottom-[12px] flex left-[12px] right-[12px]">
          <div className="flex-1 md:hidden mr-12">
            <ReusableButton
              onClick={() => {
                closeDrawer();
              }}
              textColor="text-red"
              btnText="Cancel"
              border
              borderColor="color-red"
              width="w-full"
            />
          </div>
          <ReusableButton
            onClick={(e) => {
              handleSubmit(e);
            }}
            textColor="text-white"
            btnText="Book Room!"
            bg="bg-green"
            flex1={true}
            type="submit"
          />
        </div>
      </div>
    </Form>
  );
};

export default FormBookingContent;
