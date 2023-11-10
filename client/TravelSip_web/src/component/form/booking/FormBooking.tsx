import { Formik } from "formik";
import React from "react";
import { now, tomorrow } from "../../../constant/time";
import FormBookingContent from "./FormBookingContent";
interface ValueProps {
  data: {
    id: number;
    person: number;
    price: string;
    bed: number;
  };
}

const FormBooking: React.FC<ValueProps> = (props) => {
  const { id, person, price, bed } = props.data;
  return props?.data ? (
    <Formik
      initialValues={{ check_in: now, check_out: tomorrow, room: id }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      <FormBookingContent data={{ person, bed, price }} />
    </Formik>
  ) : null;
};

export default FormBooking;
