import { Formik } from "formik";
import React from "react";
import FormFacilityContent from "./FormFacilityContent";
import { useQuery } from "react-query";
import { getFacility } from "../../../../api/apis/facilities";

interface FormFacilityProps {
  id?: string | number;
  room_id: string | number;
}

const FormFacility: React.FC<FormFacilityProps> = (props) => {
  const { id, room_id } = props;
  const { data } = useQuery({
    queryKey: ["facility"],
    queryFn: () => {
        if(id){
            return getFacility(id)
        }
    },
    staleTime: 2 * 1000,
    cacheTime: 10 * 1000,
    keepPreviousData: true,
  });
  return (
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
      <FormFacilityContent />
    </Formik>
  );
};

export default FormFacility;
