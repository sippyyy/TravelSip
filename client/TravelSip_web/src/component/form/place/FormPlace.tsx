import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { FormPlaceContent } from "../..";
import { useQuery } from "react-query";
import { getHotel } from "../../../api/apis/getHotels";
import { Rooms } from "../../../interface/room.type";

export interface FormPlaceProps {
  tab?: number | 0 | 1 | undefined;
  type?: "hotel" | "destination";
  setNewData?: React.Dispatch<React.SetStateAction<boolean>>;
  id?: number | string;
  rooms?: Rooms;
}

const FormPlace: React.FC<FormPlaceProps> = (props) => {
  const { tab, setNewData, id, type } = props;

  const { data, status } = useQuery({
    queryKey: [`place_details_${type ? type : ""}_${id}`],
    queryFn: () => {
      if (id) {
        return getHotel(id ? id : 0);
      }
    },
  });

  return (
    <>
      {status === "success" && data && tab === undefined ? (
        <Formik
          initialValues={{
            title: data?.data.title,
            description: data?.data.description,
            contact: data?.data.contact,
            imageUrl: data?.data.imageUrl,
            address: data?.data.location,
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
          <FormPlaceContent
            type={type}
            id={data?.data?.id}
            tab={tab}
            rooms={data?.data?.rooms ?? []}
          />
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
