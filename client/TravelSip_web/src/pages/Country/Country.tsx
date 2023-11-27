import React from "react";
import { Places } from "../../component";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Params } from "../Hotel/HotelDetails";
import { getCountry } from "../../api/apis/getCountries";

const Country:React.FC = () => {
  const params = useParams<Params>();

  const { data } = useQuery({
    queryKey: [`country ${params.id}`],
    queryFn: () => getCountry(params?.id ?? 0),
  });

  return (
    <div>
      <div className="md:flex md:justify-center">
        <div className="md:container">
          <section className="relative">
            <img
              src={data?.data?.imageUrl ?? ""}
              alt=""
              className="w-full h-[380px] md:h-[450px] object-cover rounded-b-3xl"
            />
          </section>
        </div>
      </div>
      <div className="flex justify-center w-full">
        <div className="container">
          <section>
            <div className="my-12 md:my-20">
              <h2 className="text-large text-red md:text-xLarge font-xBold text-center">
                {data?.data?.country ?? ""}
              </h2>
              <p className="text-small font-bold mt-8 md:text-medium mb-12 text-center">
                {data?.data?.region ?? ""}
              </p>
            </div>
            <div className="my-12 md:my-20 p-12 md:p-16 bg-white rounded-2xl">
              <h4 className="text-medium md:text-large font-medium">
                Country's details:
              </h4>
              <p className="text-small leading-6 md:leading-8 md:text-medium mt-8 md:mt-12">
                {data?.data?.description ?? ""}
              </p>
            </div>
          </section>
          {data?.data?.popular?.length > 0 ? (
            <section className="p-12 md:p-16 ">
              <h4 className="text-medium md:text-large font-medium my-12 md:my-20">
                Popular Places Of This Country:
              </h4>
              <Places autoPlay data={data?.data?.popular ?? []} />
            </section>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Country;
