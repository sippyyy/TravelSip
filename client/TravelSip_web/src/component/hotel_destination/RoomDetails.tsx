import React from "react";
import { FormBooking, ReusableInfoDetails, ReusableLoadingModal } from "..";
import { getIconForFacility } from "../../utils/get_icon_facility";
import { useQuery } from "react-query";
import { getRoomDetails } from "../../api/apis/getHotels";
import { useUpdateEffect } from "ahooks";
import { closeModal, showModal } from "../reusable/ReusableModal";

interface RoomDetailsProps {
  id: number;
}

const RoomDetails: React.FC<RoomDetailsProps> = (props) => {
  const { id } = props;

  const { data, status } = useQuery({
    queryKey: [`room ${id}`],
    queryFn: () => getRoomDetails(id),
    staleTime: 2 * 1000,
    cacheTime: 10 * 1000,
    keepPreviousData: true,
  });

  useUpdateEffect(() => {
    if (status === "loading") {
      showModal("Loading data...", <ReusableLoadingModal />);
    } else {
      closeModal();
    }
  }, [status]);

  return data?.data ? (
    <div className="md:w-[450px] w-full">
      <div className="p-12">
        <p className="text-xLarge text-green font-bold text-center mb-12">
          Booking Room : {data?.data?.name}
        </p>
        <img
          className="rounded-xl h-[250px] w-full object-cover"
          src={data?.data?.imageUrl}
        />
        <div className="border border-green border-solid my-12 p-12 rounded-xl">
          <p className="font-bold">Facility and Benefits included:</p>
          <div className="mt-12">
            {data?.data?.facilities &&
              Object.entries(data?.data?.facilities[0] || []).map(
                ([key, value]) => {
                  if (key !== "id" && key !== "room" && value) {
                    const icon = getIconForFacility(key);
                    return (
                      <ReusableInfoDetails icon={icon} label={key} key={key} />
                    );
                  }
                  return null;
                }
              )}
          </div>
        </div>
        <FormBooking
          data={{
            id,
            person: data?.data?.person ?? 0,
            price: data?.data?.price ?? "",
            bed: data?.data?.bed ?? 0,
          }}
        />
      </div>
    </div>
  ) : null;
};

export default RoomDetails;
