import { Form, useFormikContext } from "formik";
import React, { useEffect } from "react";
import { ReusableButton, ReusableCalendar, ReusableInfoDetails } from "../..";
import { useSafeState, useUpdateEffect } from "ahooks";
import { now, tomorrow } from "../../../constant/time";
import { BiSolidUser, BiSolidBed } from "react-icons/bi";
import { AiOutlineClockCircle } from "react-icons/ai";

interface ValuesProps {
  check_in: string;
  check_out: string;
  room: number;
}

const FormBookingContent = () => {
  const { values, setFieldValue, errors } = useFormikContext<ValuesProps>();
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

  return (
    <Form>
      <div className="flex">
        <div className="flex items-center mr-12">
          <p className="mr-8 text-small w-1/2">Check in:</p>
          <ReusableCalendar
            day={checkin}
            setDay={setCheckin}
            defaultValue={now}
          />
        </div>
        <div className="flex items-center">
          <p className="mr- text-small w-1/2">Check out:</p>
          <ReusableCalendar
            day={checkout}
            setDay={setCheckout}
            defaultValue={tomorrow}
          />
        </div>
      </div>
      <div className="mt-12">
        <ReusableInfoDetails
          icon={<BiSolidUser />}
          label="Person number allowed:"
          value="under 2 persons"
        />
        <ReusableInfoDetails icon={<BiSolidBed />} label="Bed(s):" value="1" />
        <ReusableInfoDetails
          icon={<AiOutlineClockCircle />}
          label="Booking duration:"
          value="2 night(s)"
        />
        <div className="absolute bottom-[12px] flex left-[12px] right-[12px]">
          <ReusableButton
            onClick={() => {}}
            textColor="text-white"
            btnText="Book This Room Now!"
            bg="bg-green"
            flex1={true}
          />
        </div>
      </div>
    </Form>
  );
};

export default FormBookingContent;
