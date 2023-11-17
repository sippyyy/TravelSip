import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import FormRegisterContent from "./FormRegisterContent";
const FormRegister = () => {
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
        email_address: "",
        first_name: "",
        last_name: "",
      }}
      onSubmit={() => {}}
      validationSchema={Yup.object().shape({
        username: Yup.string().required("This field is required!"),
        password: Yup.string().required("This field is required!"),
        email_address: Yup.string().email().required("This field is required!"),
        first_name: Yup.string().required("This field is required!"),
        last_name: Yup.string().required("This field is required!"),
      })}
    >
      <FormRegisterContent />
    </Formik>
  );
};

export default FormRegister;
