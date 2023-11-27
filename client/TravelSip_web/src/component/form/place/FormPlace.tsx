import { Formik } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { FormPlaceContent } from "../..";
import { Destination } from "../../../interface/destination.type";
import { Hotel } from "../../../interface/hotel.type";
import { useQuery } from "react-query";
import { getHotel } from "../../../api/apis/getHotels";

export interface FormPlaceProps {
  tab?: number | 0 | 1 | undefined;
  type?: "hotel" | "destination";
  setNewData?: React.Dispatch<React.SetStateAction<boolean>>;
  id: number | string;
}

const FormPlace: React.FC<FormPlaceProps> = (props) => {
  const { tab, setNewData, id, type } = props;

  const { data, error } = useQuery({
    queryKey: [`place_details_${type ? type : ""}_${id}`],
    queryFn: () => getHotel(id),
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

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
          <FormPlaceContent tab={tab} setNewData={setNewData} />
        </Formik>
      ) : null}
    </>
  );
};

export default FormPlace;
