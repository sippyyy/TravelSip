import { rooms } from "../../api/mock_api/rooms";
import { RoomTile } from "..";

interface RoomProps {
  id: number;
  facilities: number;
  name: string;
  person: number;
  imageUrl: string;
  bed: number;
  price: string;
}

const Rooms = () => {
  return (
    <div className="max-h-[600px] overflow-y-auto">
      {rooms.map((room: RoomProps) => (
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
