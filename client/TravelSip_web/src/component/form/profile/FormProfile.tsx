import { Formik } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { FormProfileContent } from "../..";
import { useProfile } from "../../../context/ProfileProvider";
import { useSafeState, useUpdateEffect } from "ahooks";
import { ProfileDetails } from "../../../interface/profile.type";

const FormProfile: React.FC = () => {
  const { profile, status } = useProfile();
  const [profileData, setProfileData] = useSafeState<
    ProfileDetails | undefined
  >();

  useEffect(() => {
    setProfileData(profile);
  }, [profile]);

  return status !== "idle" && status !== "loading" && profileData ? (
    <Formik
      initialValues={
        status === "error"
          ? {
              imageUrl: "",
              backgroundUrl: "",
              bio: "",
              nickname: "",
              dob: "",
              mobile: "",
              gender: "",
            }
          : {
              imageUrl: profileData?.imageUrl ?? "234",
              backgroundUrl: profileData?.backgroundUrl ?? "234",
              bio: profileData?.bio ?? "234",
              nickname: profileData?.nickname ?? "234",
              dob: profileData?.dob ?? "234",
              mobile: profileData?.mobile ?? "234",
              gender: profileData?.gender ?? "234",
            }
      }
      onSubmit={(values) => {
        console.log(values);
      }}
      validationSchema={Yup.object().shape({
        imageUrl: Yup.mixed(),
        backgroundUrl: Yup.mixed(),
        bio: Yup.string(),
        nickname: Yup.string(),
        dob: Yup.date().required("This field is required"),
        mobile: Yup.string().required("This field is required"),
        gender: Yup.string(),
      })}
    >
      <FormProfileContent idIn={profile?.id ?? 0} statusIn={status} />
    </Formik>
  ) : (
    <></>
  );
};

export default FormProfile;
