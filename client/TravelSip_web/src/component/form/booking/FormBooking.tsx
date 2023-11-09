import { Formik } from "formik";
import React from "react";
import { now, tomorrow } from "../../../constant/time";
import FormBookingContent from "./FormBookingContent";

interface ValueProps {
  data: {
    id: number;
    person: number;
    bed: number;
    price: string;
  };
}

const FormBooking: React.FC<ValueProps> = (props) => {
  const { id, person, bed, price } = props;
  return (
    <Formik
      initialValues={{ check_in: now, check_out: tomorrow, room: id }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      <FormBookingContent />
    </Formik>
  );
};

export default FormBooking;
