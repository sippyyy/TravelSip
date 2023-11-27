import React, { useState } from "react";
import { TabBarBusiness } from "../../component";
import { get_content } from "../../utils/get_content_business";
import { useQuery } from "react-query";
import { getBusiness } from "../../api/apis/business";
import { useAuth } from "../../context/AuthProvider";

const MyBusiness: React.FC = () => {
  const [tab, setTab] = useState(2);
  const { authState } = useAuth();
  const { data, status } = useQuery({
    queryKey: ["organization profile"],
    queryFn: () => {
      if (!data && status !== "success" && status !== "error") {
        return getBusiness(authState.id);
      }
    },
    staleTime: 2 * 1000,
    cacheTime: 10 * 1000,
    keepPreviousData: true,
    retry: false,
    refetchOnWindowFocus: false,
  });
  return (
    <div>
      <TabBarBusiness value={tab} setValue={setTab} />
      {status !== "loading" && status !== "idle" ? (
        <div className="p-12 m-12 rounded-2xl bg-white">
          {get_content(
            tab,
            data?.data?.user_hotel ?? [],
            data?.data?.user_destination ?? [],
            data?.data ?? undefined
          )}
        </div>
      ) : null}
    </div>
  );
};

export default MyBusiness;
