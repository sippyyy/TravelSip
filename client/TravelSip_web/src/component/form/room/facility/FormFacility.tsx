import { Formik } from "formik";
import React, { useEffect } from "react";
import FormFacilityContent from "./FormFacilityContent";
import { useMutation } from "react-query";
import { getFacility } from "../../../../api/apis/facilities";

interface FormFacilityProps {
  id?: string | number;
  room_id: string | number;
}

const FormFacility: React.FC<FormFacilityProps> = (props) => {
  const { id, room_id } = props;

  const { mutate, data, status } = useMutation({
    mutationFn: () => getFacility(id ? id : 0),
  });

  useEffect(() => {
    if (id) {
      mutate();
    }
  }, []);

  return status !== "idle" && status !== "loading" ? (
    <Formik
      initialValues={
        data
          ? {
              air_conditioner: data?.data?.air_conditioner,
              wifi: data?.data?.wifi,
              balcony: data?.data?.balcony,
              window: data?.data?.window,
              private_bathroom: data?.data?.private_bathroom,
              breakfast: data?.data?.breakfast,
              view: data?.data?.view,
              laundry: data?.data?.laundry,
              cleaning_room: data?.data?.cleaning_room,
              room: data?.data?.room,
            }
          : {
              air_conditioner: false,
              wifi: false,
              balcony: false,
              window: false,
              private_bathroom: false,
              breakfast: false,
              view: false,
              laundry: false,
              cleaning_room: false,
              room: room_id,
            }
      }
      onSubmit={() => {}}
    >
      <FormFacilityContent idFacility={id ? id : null} />
    </Formik>
  ) : null;
};

export default FormFacility;
