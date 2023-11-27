import React, { useEffect } from "react";
import { PlaceTile } from "../../..";
import { useMutation } from "react-query";
import { useAuth } from "../../../../context/AuthProvider";
import { getMyDestinations } from "../../../../api/apis/getDestinations";
import { useUpdateEffect } from "ahooks";

interface DestinationProps {
  newData: boolean;
  setNewData: React.Dispatch<React.SetStateAction<boolean>>;
}

const MyDestinations: React.FC<DestinationProps> = (props) => {
  const { authState } = useAuth();
  const { newData, setNewData } = props;

  const { mutate, data } = useMutation({
    mutationFn: () => {
      const token = authState.accessToken;
      return getMyDestinations(token);
    },
  });

  useUpdateEffect(() => {
    if (newData) {
      mutate();
      setNewData(false);
    }
  }, [newData]);

  useEffect(() => {
    if (!newData) {
      setNewData(true);
    }
  }, []);

  return data?.data?.map((recommendation) => (
    <PlaceTile
      key={recommendation.id}
      link={`/destination/${recommendation.id}`}
      dataIn={recommendation}
      type="destination"
    />
  ));
};

export default MyDestinations;
