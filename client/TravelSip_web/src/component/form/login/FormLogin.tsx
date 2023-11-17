import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import FormLoginContent from "./FormLoginContent";
const FormLogin = () => {
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={() => {}}
      validationSchema={Yup.object().shape({
        username: Yup.string().required("This field is required!"),
        password: Yup.string().required("This field is required!"),
      })}
    >
      <FormLoginContent />
    </Formik>
  );
};

export default FormLogin;
