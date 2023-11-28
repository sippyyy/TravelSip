import { Formik } from "formik";
import React from "react";
import { Room } from "../../../interface/room.type";
import FormRoomContent from "./FormRoomContent";

interface FormRoomProps {
  room?: Room;
  hotelId: string | number;
  roomId?: number | string;
}

const FormRoom: React.FC<FormRoomProps> = (props) => {
  const { room, hotelId, roomId } = props;
  return (
    <Formik
      initialValues={
        room
          ? {
              name: room.name,
              person: room.person,
              bed: room.bed,
              price: room.price,
              imageUrl: room.imageUrl,
              hotel: hotelId,
            }
          : {
              name: "",
              person: "",
              bed: "",
              price: "",
              imageUrl: "",
              hotel: hotelId,
            }
      }
      onSubmit={() => {}}
    >
      <FormRoomContent roomId={roomId ? roomId : null} />
    </Formik>
  );
};

export default FormRoom;
