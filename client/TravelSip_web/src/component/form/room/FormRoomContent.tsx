import { Form, useFormikContext } from "formik";
import React from "react";
import {
  FormFacility,
  ImageCovered,
  ReusableButton,
  ReusablePopupMessage,
  ReusableTextField,
} from "../..";
import { useSafeState, useUpdateEffect } from "ahooks";
import { Room } from "../../../interface/room.type";
import { closeModal, showModal } from "../../reusable/ReusableModal";
import { closeDrawer, showDrawer } from "../../reusable/ReusableDrawer";
import { useMutation } from "react-query";
import { useAuth } from "../../../context/AuthProvider";
import { createRoom, editRoom } from "../../../api/apis/room";

interface FormRoomContentProps {
  roomId: string | number | null;
}

const FormRoomContent: React.FC<FormRoomContentProps> = (props) => {
  const { roomId } = props;
  const [img, setImg] = useSafeState<File | undefined>(undefined);
  const { values } = useFormikContext<Room>();
  const { authState } = useAuth();

  const { mutate, status, data } = useMutation({
    mutationFn: (data: FormData) => {
      const token = authState.accessToken;
      if (!roomId) {
        return createRoom(token, data);
      } else {
        return editRoom(token, data, roomId);
      }
    },
  });

  useUpdateEffect(() => {
    if (status === "success") {
      if (!roomId) {
        showModal(
          "Completed",
          <ReusablePopupMessage
            message="Create Room Successfully"
            redButton="Close"
            greenButton="Add Facility"
            greenFunc={() => {
              closeModal();
              showDrawer(<FormFacility room_id={data?.data?.id} />, "right");
            }}
          />
        );
      } else {
        showModal(
          "Completed",
          <ReusablePopupMessage
            message={data?.data?.message ?? ""}
            greenButton="Close"
            greenFunc={() => {
              closeModal();
              closeDrawer();
            }}
          />
        );
      }
    }
  });

  const handleSubmit = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("person", values.person.toString());
    formData.append("bed", values.bed.toString());
    formData.append("price", values.price);
    formData.append("hotel", values.hotel.toString());
    if (img) {
      formData.append("imageUrl", img);
    }
    mutate(formData);
  };

  const handleCancel = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    showModal(
      "Are you sure?",
      <ReusablePopupMessage
        message="Are you sure you want to quit without create new room?"
        redButton="No"
        greenButton="Yes,please!"
        greenFunc={() => {
          closeDrawer();
          closeModal();
        }}
      />
    );
  };

  return (
    <Form className="p-12">
      <p className="mb-12 text-xLarge text-green font-bold text-center">
        {roomId ? "Edit" : "Create"} Room
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
        <ReusableTextField name="name" flex1 label="Room name" />
      </div>
      <div className="my-12 flex">
        <ReusableTextField name="person" flex1 label="Person" />
      </div>
      <div className="my-12 flex">
        <ReusableTextField name="bed" flex1 label="Bed" />
      </div>
      <div className="flex my-12">
        <ReusableTextField name="price" flex1 label="price" />
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

export default FormRoomContent;
