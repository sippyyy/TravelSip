import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import FormBusinessInfoContent from "./FormBusinessInfoContent";
import { useAuth } from "../../../../context/AuthProvider";
import { useQuery } from "react-query";
import { getBusiness } from "../../../../api/apis/business";
import { useUpdateEffect } from "ahooks";
import { closeModal, showModal } from "../../../reusable/ReusableModal";
import { ReusableLoadingModal } from "../../..";

const FormBusinessInfo: React.FC = () => {
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

  useUpdateEffect(() => {
    if (status === "loading") {
      showModal("Loading data...", <ReusableLoadingModal />);
    } else {
      closeModal();
    }
  }, [status]);
  return status !== "loading" ? (
    <Formik
      initialValues={
        status === "error"
          ? {
              imageUrl: "",
              backgroundUrl: "",
              bio: "",
              name: "",
              email: "",
              phone: "",
              tax: "",
            }
          : {
              imageUrl: data?.data?.imageUrl ?? "",
              backgroundUrl: data?.data?.backgroundUrl ?? "",
              bio: data?.data?.bio ?? "",
              name: data?.data?.name ?? "",
              email: data?.data?.email ?? "",
              phone: data?.data?.phone ?? "",
              tax: data?.data?.tax ?? "",
            }
      }
      onSubmit={(values) => {
        console.log(values);
      }}
      validationSchema={Yup.object().shape({
        imageUrl: Yup.mixed(),
        backgroundUrl: Yup.mixed(),
        bio: Yup.string(),
        name: Yup.string().required("This field is required"),
        email: Yup.string().email().required("This field is required"),
        phone: Yup.string().required("This field is required"),
        tax: Yup.string().required("This field is required"),
      })}
    >
      <FormBusinessInfoContent idIn={data?.data?.id ?? 0} />
    </Formik>
  ) : (
    <></>
  );
};

export default FormBusinessInfo;
