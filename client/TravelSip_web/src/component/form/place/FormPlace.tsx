import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { FormPlaceContent } from "../..";

export interface FormPlaceProps {
  tab?: number | 0 | 1 | undefined;
  data?: {
    id: number;
    title: string;
    imageUrl: string;
    location: string;
    rooms: {
      id: number;
      facilities: number;
      name: string;
      person: number;
      bed: number;
      price: string;
      imageUrl: string;
    }[];
    description: string;
    contact:string;
  };
}

const FormPlace: React.FC<FormPlaceProps> = (props) => {
  const { tab, data } = props;
  return (
    <>
      {tab === undefined && data ? (
        <Formik
          initialValues={{
            title: data.title,
            description: data.description,
            contact: data.contact,
            imageUrl: data.imageUrl,
            address: data.location,
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
          })}
        >
          <FormPlaceContent tab={tab} />
        </Formik>
      ) : null}
      {tab !== undefined && !data ? (
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
          <FormPlaceContent tab={tab} />
        </Formik>
      ) : null}
    </>
  );
};

export default FormPlace;
