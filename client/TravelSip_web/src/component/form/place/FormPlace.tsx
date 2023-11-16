import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import {FormPlaceContent} from "../..";

const FormPlace = () => {
  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        contact: "",
        imageUrl: "",
        address: "",
        city: "",
      }}
      onSubmit={(values) => {
        console.log(values);
      }}
      validationSchema={Yup.object().shape({
        title: Yup.string().required("This field is required!"),
        description: Yup.string().required("This field is required!"),
        contact: Yup.string().required("This field is required!"),
        imageUrl: Yup.mixed().required("This field is required!"),
        address: Yup.string().required("This field is required!"),
        city: Yup.string().required("This field is required!"),
      })}
    >
      <FormPlaceContent />
    </Formik>
  );
};

export default FormPlace;
