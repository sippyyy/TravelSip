import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { FormProfileContent } from "../..";
import { useQuery } from "react-query";
import { useAuth } from "../../../context/AuthProvider";
import { getProfile } from "../../../api/apis/profile";

const FormProfile: React.FC = () => {
  const { authState } = useAuth();
  const { data, status } = useQuery({
    queryKey: [`profile user ${authState.id}`],
    queryFn: () => {
      if(!data && status !== "success" && status !=="error"){
        return getProfile(authState.id)
      }
    },
    staleTime: 2 * 1000,
    cacheTime: 10 * 1000,
    keepPreviousData: true,
    retry: false,
  });



  return status !== "loading" ? (
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
              imageUrl: data?.data?.imageUrl ?? "",
              backgroundUrl: data?.data?.backgroundUrl ?? "",
              bio: data?.data?.bio ?? "",
              nickname: data?.data?.nickname ?? "",
              dob: data?.data?.dob ?? "",
              mobile: data?.data?.mobile ?? "",
              gender: data?.data?.gender ?? "",
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
      <FormProfileContent idIn={data?.data?.id??0} statusIn={status} />
    </Formik>
  ) : (
    <></>
  );
};

export default FormProfile;
