import React, { useEffect } from "react";
import { PlaceTile, ReusableLoadingModal } from "../../..";
import { useMutation } from "react-query";
import { useAuth } from "../../../../context/AuthProvider";
import { getMyHotels } from "../../../../api/apis/getHotels";
import { useUpdateEffect } from "ahooks";
import { closeModal, showModal } from "../../../reusable/ReusableModal";

interface MyHotelsProps {
  newData: boolean;
  setNewData: React.Dispatch<React.SetStateAction<boolean>>;
}

const MyHotels: React.FC<MyHotelsProps> = (props) => {
  const { newData, setNewData } = props;
  const { authState } = useAuth();
  const { mutate, data, status } = useMutation({
    mutationFn: () => {
      const token = authState.accessToken;
      return getMyHotels(token);
    },
  });

  useEffect(() => {
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
  useUpdateEffect(() => {
    if (status === "loading") {
      showModal("Loading data...", <ReusableLoadingModal />);
    } else {
      closeModal();
    }
  }, [status]);

  return data?.data?.map((hotel) => (
    <PlaceTile
      key={hotel.id}
      link={`/hotel/${hotel.id}`}
      type="hotel"
      dataIn={hotel}
    />
  ));
};

export default MyHotels;
