import { Form, useFormikContext } from "formik";
import React, { useEffect } from "react";
import {
  ImageCovered,
  ReusableButton,
  ReusablePopupMessage,
  ReusableSelectInput,
  ReusableTextField,
} from "../..";
import { SelectChangeEvent } from "@mui/material";
import { cities } from "../../../api/mock_api/cities";
import { closeModal, showModal } from "../../reusable/ReusableModal";
import { closeDrawer } from "../../reusable/ReusableDrawer";
import { FormPlaceProps } from "./FormPlace";

type ValuesPlaceType = {
  title: string;
  description: string;
  contact: string;
  imageUrl: string;
  address: string;
  city: string;
};

const FormPlaceContent: React.FC<FormPlaceProps> = (props) => {
  const { tab } = props;
  const { values, setFieldValue } = useFormikContext<ValuesPlaceType>();

  const handleChangeCity = (e: SelectChangeEvent) => {
    setFieldValue("city", e.target.value as string);
  };

  const cityOptions: () => { value: string; text: string }[] = () => {
    const newData = cities.map((city: { id: number; name: string }) => ({
      value: city?.id ?? "",
      text: city?.name ?? "",
    }));
    return newData;
  };

  const handleCancel = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    showModal(
      "Are you sure?",
      <ReusablePopupMessage
        message="Are you sure you want to quit without create new place?"
        redButton="No"
        greenButton="Yes,please!"
        greenFunc={() => {
          closeDrawer();
          closeModal();
        }}
      />
    );
  };

  const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    console.log({ values });
  };

  return (
    <Form className="min-w-[420px] p-12">
      <p className="mb-12 text-xLarge text-green font-bold text-center">
        {tab === 0 ? "Create Hotel" : null}
        {tab === 1 ? "Create Destination" : null}
        {!tab && tab !== 0 ? "Edit Hotel" : null}
      </p>
      <div className="flex items-center">
        <ImageCovered
          width="w-[100px]"
          height="h-[100px]"
          radius="rounded-full"
          width2="w-[30px]"
          height2="w-[30px]"
          src={
            "https://img.freepik.com/premium-photo/colorful-landscape-with-mountains-river-foreground_849761-2647.jpg"
          }
        />
        <div className="w-[12px]"></div>
        <ReusableTextField name="title" flex1 label="Name" />
      </div>
      <div className="my-12 flex">
        <ReusableTextField name="contact" label="Contact" flex1 />
      </div>
      <div className="my-12 flex">
        <ReusableTextField name="description" label="Description" flex1 />
      </div>
      <div className="my-12 flex">
        <ReusableTextField name="address" label="Address" flex1 />
      </div>
      {tab ? (
        <div className="my-12">
          <ReusableSelectInput
            label="City"
            value={values.city}
            name="city"
            onChange={(e) => {
              handleChangeCity(e);
            }}
            options={cityOptions()}
          />
        </div>
      ) : null}
      <div className="flex absolute bottom-[12px] left-[12px] right-[12px]">
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

export default FormPlaceContent;
