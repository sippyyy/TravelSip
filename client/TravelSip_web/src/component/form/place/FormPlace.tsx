import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { FormPlaceContent } from "../..";
import { useQuery } from "react-query";
import { getHotel } from "../../../api/apis/getHotels";
import { Rooms } from "../../../interface/room.type";
import { getDestination } from "../../../api/apis/getDestinations";

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
    queryKey: [`place_details_hotel_${id}`],
    queryFn: () => {
      if (id && type === "hotel") {
        return getHotel(id ? id : 0);
      }
    },
  });

  const { data: dataDestination, status: statusDestination } = useQuery({
    queryKey: [`place_details_destination_${id}`],
    queryFn: () => {
      if (id && type === "destination") {
        return getDestination(id ? id : 0);
      }
    },
  });

  return (
    <>
      {((type === "hotel" && status === "success") ||
        (type === "destination" && statusDestination === "success")) &&
      (data || dataDestination) &&
      tab === undefined ? (
        <Formik
          initialValues={{
            title: data?.data.title ?? dataDestination?.data?.title,
            description:
              data?.data.description ?? dataDestination?.data?.description,
            contact: data?.data.contact ?? dataDestination?.data?.contact,
            imageUrl: data?.data.imageUrl ?? dataDestination?.data?.imageUrl,
            address: data?.data.location ?? dataDestination?.data?.address,
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
            id={data?.data?.id ?? id}
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
