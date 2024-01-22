import React, { createContext, useContext, useEffect } from "react";
import { ProfileDetails } from "../interface/profile.type";
import { useSafeState, useUpdateEffect } from "ahooks";
import { useMutation } from "react-query";
import { useAuth } from "./AuthProvider";
import { getProfile } from "../api/apis/profile";
import { closeModal, showModal } from "../component/reusable/ReusableModal";
import { ReusableLoadingModal } from "../component";

interface ProfileProviderProps {
  children: React.ReactNode;
}

export interface ValueProfileProvider {
  profile: ProfileDetails;
  refetch: () => void;
  status: "error" | "idle" | "loading" | "success";
}

const ProfileProviderContext = createContext<ValueProfileProvider>({
  refetch: () => {},
  status: "idle",
  profile: {
    id: 0,
    user: {
      id: 0,
      username: "",
      email: "",
      date_joined: "",
    },
    imageUrl: "",
    backgroundUrl: "",
    bio: "",
    nickname: "",
    dob: "",
    mobile: "",
    gender: "",
  },
});

export const useProfile = () => {
  return useContext(ProfileProviderContext);
};

const ProfileProvider: React.FC<ProfileProviderProps> = (props) => {
  const { children } = props;
  const [profileData, setProfileData] = useSafeState<ProfileDetails>({
    id: 0,
    user: {
      id: 0,
      username: "",
      email: "",
      date_joined: "",
    },
    imageUrl: "",
    backgroundUrl: "",
    bio: "",
    nickname: "",
    dob: "",
    mobile: "",
    gender: "",
  });

  const { authState } = useAuth();
  const { mutate, data, status } = useMutation({
    mutationFn: (id: string | number) => getProfile(id),
  });

  useEffect(() => {
    if (authState?.id) {
      mutate(authState.id);
    }
  }, [authState]);

  useUpdateEffect(() => {
    if (data) {
      setProfileData(data?.data);
    }
  }, [data]);

  useUpdateEffect(() => {
    if (status === "loading") {
      showModal("Loading Data...", <ReusableLoadingModal />);
    } else {
      closeModal();
    }
  }, [status]);

  const refetch: () => void = () => {
    mutate(authState.id);
  };

  const valuePassed = {
    refetch: refetch,
    profile: profileData,
    status,
  };

  return (
    <ProfileProviderContext.Provider value={valuePassed}>
      {children}
    </ProfileProviderContext.Provider>
  );
};

export default ProfileProvider;
