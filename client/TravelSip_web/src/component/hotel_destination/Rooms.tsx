import { RoomTile } from "..";
import { Room, Rooms } from "../../interface/room.type";
import React from "react";

interface RoomsProps {
  rooms:Rooms
}

const Rooms: React.FC<RoomsProps> = (props) => {
  const { rooms } = props;
  return (
    <div className="max-h-[600px] overflow-y-auto">
      {rooms?.map((room: Room) => (
        <RoomTile
          key={room.id}
          id={room.id}
          imageUrl={room.imageUrl}
          roomName={room.name}
          person={room.person}
          bed={room.bed}
          facility={room.facilities}
          price={room.price}
        />
      ))}
    </div>
  );
};

export default Rooms;
