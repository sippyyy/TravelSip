import { Formik } from 'formik';
import React from 'react'
import * as Yup from "yup";
import FormBusinessInfoContent from './FormBusinessInfoContent';

const FormBusinessInfo = () => {
    return (
        <Formik
          initialValues={{
            imageUrl: "",
            backgroundUrl: "",
            bio: "",
            name: "",
            email: "",
            phone: "",
            tax: "",
          }}
          onSubmit={(values) => {
            console.log(values);
          }}
          validationSchema={Yup.object().shape({
            imageUrl: Yup.mixed(),
            backgroundUrl: Yup.mixed(),
            bio: Yup.string(),
            name: Yup.string().required("This field is required"),
            email: Yup.string().email().required("This field is required"),
            phone: Yup.string().required("This field is required"),
            tax: Yup.string().required("This field is required"),
          })}
        >
          <FormBusinessInfoContent />
        </Formik>
      );
}

export default FormBusinessInfo
