import React from "react";
import ReactStars from "react-stars";
import { ContentTile } from "../../component";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getHotel } from "../../api/apis/getHotels";

export type Params = { id: string };

const HotelDetails: React.FC = () => {
  const params = useParams<Params>();

  const { data } = useQuery({
    queryKey: [`hotel ${params.id}`],
    queryFn: () => getHotel(params?.id ?? 0),
    staleTime: 2 * 1000,
    cacheTime: 10 * 1000,
    keepPreviousData: true,
  });

  return (
    <div className="flex justify-center">
      <div className="container py-20">
        <div className="relative">
          <img
            src={data?.data?.imageUrl}
            className="w-full max-h-[450px] object-cover object-center rounded-3xl"
          />
          <div className=" md:p-20 p-16 absolute bottom-[-15%] left-[50%] translate-x-[-50%] bg-white rounded-3xl w-[90%] md:w-2/3 h-[150px]">
            <div className="md:flex justify-between md:mb-20 mb-8 items-center">
              <h2 className="text-large md:text-large font-bold mb-8">
                {data?.data?.title}
              </h2>
              <div className="md:flex md:justify-start md:items-end">
                <span className="md:mr-8 text-small block">
                  Rating Score By Clients:
                </span>
                <ReactStars
                  count={5}
                  value={data?.data?.rating}
                  color2={"#ffd700"}
                  size={30}
                />
              </div>
            </div>
            <p className="md:text-medium text-small md:mb-20">
              Address: {data?.data?.location}
            </p>
            <p className="md:text-medium text-small ">
              {data?.data?.review} Reviews
            </p>
          </div>
        </div>
        <div className="md:h-[120px] h-[70px]"></div>
        <ContentTile
          rooms={data?.data?.rooms ?? []}
          content={data?.data?.description ?? ""}
          section2="Rooms:"
          reviews={data?.data?.reviews ?? []}
        />
      </div>
    </div>
  );
};

export default HotelDetails;
