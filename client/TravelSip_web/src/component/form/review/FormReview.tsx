import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import FormReviewContent from "./FormReviewContent";

interface FormReviewProps {
  id: number;
}

const FormReview: React.FC<FormReviewProps> = (props) => {
  const { id } = props;
  return (
    <Formik
      initialValues={{
        hotel: id,
        rating:0,
        review:"",
      }}
      onSubmit={(values) => {
        console.log(values);
      }}
      validationSchema={Yup.object().shape({
        hotel: Yup.number().required("Hotel id is required"),
        rating: Yup.number()
          .max(5, "Must be less than or equal 5")
          .min(1, "Must be larger or equal 1")
          .required("Rating point is required"),
        review: Yup.string().required("Review is required"),
      })}
    >
      <FormReviewContent />
    </Formik>
  );
};

export default FormReview;
