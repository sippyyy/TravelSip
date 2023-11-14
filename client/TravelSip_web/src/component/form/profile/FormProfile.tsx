import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import {FormProfileContent} from "../..";

const FormProfile = () => {
  return (
    <Formik
      initialValues={{
        imageUrl: "",
        backgroundUrl: "",
        bio: "",
        nickname: "",
        dob: "",
        mobile: "",
        gender: "",
      }}
      onSubmit={(values) => {
        console.log(values);
      }}
      validationSchema={Yup.object().shape({
        imageUrl: Yup.mixed(),
        backgroundUrl: Yup.mixed(),
        bio: Yup.string(),
        nickname: Yup.string(),
        dob: Yup.date().required("This field is required"),
        mobile: Yup.string().required("This field is required"),
        gender: Yup.string(),
      })}
    >
      <FormProfileContent />
    </Formik>
  );
};

export default FormProfile;
