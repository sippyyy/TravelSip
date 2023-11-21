import React from "react";
import { ContentTile, Hotels } from "../../component";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getDestination } from "../../api/apis/getDestinations";
import { Params } from "../Hotel/HotelDetails";

const DestinationDetails: React.FC = () => {
  const params = useParams<Params>();

  const { data } = useQuery({
    queryKey: [`destination ${params.id}`],
    queryFn: () => getDestination(params?.id ?? 0),
    staleTime: 2 * 1000,
    cacheTime: 10 * 1000,
    keepPreviousData: true,
  });
  return (
    <div className="my-20">
      <div className="flex justify-center">
        <div className="container">
          <img
            src={data?.data?.imageUrl}
            className="max-h-[600px] w-full rounded-3xl"
          />
          <div className="md:flex justify-center text-red bg-white rounded-3xl p-8 md:px-12 my-12 items-center">
            <h2 className="md:text-xxLarge text-large text-center font-bold my-8 md:my-12 mr-12">
              {data?.data?.title}
            </h2>
            <p className="md:text-medium md:text-left text-center text-red">
              - {data?.data?.location}
            </p>
          </div>
          <div className="my-20">
            <ContentTile
              content={data?.data?.description ?? ""}
              reviews={data?.data?.reviews ?? []}
            />
          </div>
          <div>
            <h4 className="text-large font-medium my-20">
              Popular hotels near this destination:
            </h4>
            <Hotels />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetails;
