import { Checkbox, FormControlLabel } from "@mui/material";
import { useSafeState, useUpdateEffect } from "ahooks";
import { Form, useFormikContext } from "formik";
import React from "react";
import { Facility } from "../../../../interface/facility.type";
import { ReusableButton, ReusablePopupMessage } from "../../..";
import { closeModal, showModal } from "../../../reusable/ReusableModal";
import { closeDrawer } from "../../../reusable/ReusableDrawer";
import { useMutation } from "react-query";
import { useAuth } from "../../../../context/AuthProvider";
import { addFacility, editFacility } from "../../../../api/apis/facilities";

interface FormFacilityContentProps {
  idFacility: number | string | null;
}

const FormFacilityContent: React.FC<FormFacilityContentProps> = (props) => {
  const { idFacility } = props;
  const { values } = useFormikContext<Facility>();
  const { authState } = useAuth();
  const [status, setStatus] = useSafeState<Facility>({
    air_conditioner: values.air_conditioner,
    wifi: values.wifi,
    balcony: values.balcony,
    window: values.window,
    private_bathroom: values.private_bathroom,
    breakfast: values.breakfast,
    view: values.view,
    laundry: values.laundry,
    cleaning_room: values.cleaning_room,
    room: values.room,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus({
      ...status,
      [event.target.name]: event.target.checked,
    });
  };

  useUpdateEffect(() => {
    console.log({ values });
  }, [values]);

  const {
    air_conditioner,
    wifi,
    balcony,
    window,
    private_bathroom,
    breakfast,
    view,
    laundry,
    cleaning_room,
  } = status;

  const { mutate, status: statusApi } = useMutation({
    mutationFn: (data: Facility) => {
      const token = authState.accessToken;
      if (idFacility) {
        return editFacility(token, data, idFacility);
      } else {
        return addFacility(token, data);
      }
    },
  });

  const handleCancel = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    showModal(
      "Are you sure?",
      <ReusablePopupMessage
        message={`Are you sure you want to quit without ${
          idFacility ? "edit" : "add"
        } facility?`}
        redButton="No"
        greenButton="Yes,please!"
        greenFunc={() => {
          closeDrawer();
          closeModal();
        }}
      />
    );
  };

  const handleSubmit = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    mutate(status);
  };

  useUpdateEffect(() => {
    if (statusApi === "success") {
      showModal(
        "Completed",
        <ReusablePopupMessage
          message={`You ${idFacility ? "edit" : "add"} facility to room id ${
            values.room
          } successfully`}
          greenButton="Close"
          greenFunc={() => {
            closeModal();
            closeDrawer();
          }}
        />
      );
    }
  });

  return (
    <Form className="p-12">
      <p className="mb-12 text-xLarge text-green font-bold text-center">
        Add Room's Facility
      </p>
      <div className="flex flex-col">
        <FormControlLabel
          control={
            <Checkbox
              checked={air_conditioner}
              onChange={handleChange}
              name="air_conditioner"
            />
          }
          label="Air Conditioner"
        />
        <FormControlLabel
          control={
            <Checkbox checked={wifi} onChange={handleChange} name="wifi" />
          }
          label="Wifi"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={balcony}
              onChange={handleChange}
              name="balcony"
            />
          }
          label="Balcony"
        />
        <FormControlLabel
          control={
            <Checkbox checked={window} onChange={handleChange} name="window" />
          }
          label="Window"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={private_bathroom}
              onChange={handleChange}
              name="private_bathroom"
            />
          }
          label="Private Bathroom"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={laundry}
              onChange={handleChange}
              name="laundry"
            />
          }
          label="Daily Laundry"
        />
        <FormControlLabel
          control={
            <Checkbox checked={view} onChange={handleChange} name="view" />
          }
          label="View"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={cleaning_room}
              onChange={handleChange}
              name="cleaning_room"
            />
          }
          label="Daily Cleaning"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={breakfast}
              onChange={handleChange}
              name="breakfast"
            />
          }
          label="Breakfast"
        />
      </div>
      <div className={"flex absolute bottom-[12px] left-[12px] right-[12px]"}>
        <ReusableButton
          flex1
          btnText="Cancel"
          border
          borderColor="border-red"
          textColor="text-red"
          onClick={(event) => handleCancel(event)}
        />
        <div className="w-[12px]"></div>
        <ReusableButton
          flex1
          btnText="Submit"
          textColor="text-white"
          bg="bg-green"
          type="submit"
          onClick={(e) => {
            handleSubmit(e);
          }}
        />
      </div>
    </Form>
  );
};

export default FormFacilityContent;
