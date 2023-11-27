import { Form, useFormikContext } from "formik";
import React, { useMemo } from "react";
import {
  ImageCovered,
  ReusableButton,
  ReusablePopupMessage,
  ReusableSelectInput,
  ReusableTextField,
} from "../..";
import { SelectChangeEvent } from "@mui/material";
import { closeModal, showModal } from "../../reusable/ReusableModal";
import { closeDrawer } from "../../reusable/ReusableDrawer";
import { FormPlaceProps } from "./FormPlace";
import { useMutation, useQuery } from "react-query";
import { createHotel } from "../../../api/apis/getHotels";
import { useAuth } from "../../../context/AuthProvider";
import { createDestination } from "../../../api/apis/getDestinations";
import { getCities } from "../../../api/apis/getCities";
import { useUpdateEffect } from "ahooks";

type ValuesPlaceType = {
  title: string;
  description: string;
  contact: string;
  imageUrl: string;
  address: string;
  city: string;
};

const FormPlaceContent: React.FC<FormPlaceProps> = (props) => {
  const { tab,setNewData } = props;
  const { values, setFieldValue } = useFormikContext<ValuesPlaceType>();
  const [img, setImg] = React.useState<File | undefined>(undefined);
  const { authState } = useAuth();

  const handleChangeCity = (e: SelectChangeEvent) => {
    setFieldValue("city", e.target.value as string);
  };

  const { data } = useQuery({
    queryKey: ["city"],
    queryFn: () => getCities(),
    staleTime: 2 * 1000,
    cacheTime: 10 * 1000,
    keepPreviousData: true,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const cityOptions = useMemo(() => {
    if (data) {
      const newData = data?.data?.map?.(
        (city: { id: number; name: string }) => ({
          value: city?.id ?? "",
          text: city?.name ?? "",
        })
      );
      return newData;
    } else {
      return [{ value: "", text: "blank" }];
    }
  }, [data]);

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
  const {
    mutate,
    data: dataCreated,
    error,
  } = useMutation({
    mutationFn: (data: FormData) => {
      const token = authState.accessToken;
      if (tab === 0) {
        return createHotel(token, data);
      } else if (tab === 1) {
        return createDestination(token, data);
      } else {
        return createDestination(token, data);
      }
    },
  });

  useUpdateEffect(() => {
    if (error) {
      console.log(error);
    } else if (data) {
      closeDrawer();
      setNewData?.(true)
    }
  }, [dataCreated]);

  const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("contact", values.contact);
    formData.append("address", values.address);
    if (values.city) {
      formData.append("city", values.city);
    }
    if (img) {
      formData.append("imageUrl", img);
    }
    mutate(formData);
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
          setValue={setImg}
          img={img}
          id={"place_img"}
          width="w-[100px]"
          height="h-[100px]"
          radius="rounded-full"
          width2="w-[30px]"
          height2="w-[30px]"
          src={values.imageUrl}
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
      {tab || tab === 0 ? (
        <div className="my-12">
          <ReusableSelectInput
            label="City"
            value={values.city}
            name="city"
            onChange={(e) => {
              handleChangeCity(e);
            }}
            options={cityOptions}
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
